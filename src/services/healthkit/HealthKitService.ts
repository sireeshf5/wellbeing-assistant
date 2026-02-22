/**
 * HealthKit Service
 * Handles all interactions with Apple HealthKit
 */

import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
  HealthInputOptions,
} from 'react-native-health';
import type {
  HealthMetrics,
  SleepData,
  HealthKitWorkout,
  HealthPermissionStatus,
} from '@types/health.types';
import type {Workout} from '@types/workout.types';
import {Platform} from 'react-native';

class HealthKitService {
  private initialized: boolean = false;

  /**
   * Initialize HealthKit and request permissions
   */
  async initialize(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      console.log('HealthKit is only available on iOS');
      return false;
    }

    const permissions: HealthKitPermissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.RestingHeartRate,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.Workout,
        ],
        write: [AppleHealthKit.Constants.Permissions.Workout],
      },
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          console.error('HealthKit initialization error:', error);
          reject(error);
          return;
        }
        this.initialized = true;
        console.log('HealthKit initialized successfully');
        resolve(true);
      });
    });
  }

  /**
   * Check if HealthKit is available
   */
  async isAvailable(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      return false;
    }

    return new Promise(resolve => {
      AppleHealthKit.isAvailable((err: Object, available: boolean) => {
        resolve(available);
      });
    });
  }

  /**
   * Get today's step count
   */
  async getTodaySteps(): Promise<number> {
    if (!this.initialized) {
      await this.initialize();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const options: HealthInputOptions = {
      startDate: today.toISOString(),
      endDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getStepCount(
        options,
        (err: Object, results: HealthValue) => {
          if (err) {
            console.error('Error getting steps:', err);
            reject(err);
            return;
          }
          resolve(results.value || 0);
        },
      );
    });
  }

  /**
   * Get today's active energy burned
   */
  async getTodayActiveEnergy(): Promise<number> {
    if (!this.initialized) {
      await this.initialize();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const options: HealthInputOptions = {
      startDate: today.toISOString(),
      endDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getActiveEnergyBurned(
        options,
        (err: Object, results: HealthValue) => {
          if (err) {
            console.error('Error getting active energy:', err);
            reject(err);
            return;
          }
          resolve(results.value || 0);
        },
      );
    });
  }

  /**
   * Get latest heart rate
   */
  async getLatestHeartRate(): Promise<number | undefined> {
    if (!this.initialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      AppleHealthKit.getLatestHeartRateSample(
        null,
        (err: Object, results: any) => {
          if (err) {
            console.error('Error getting heart rate:', err);
            resolve(undefined);
            return;
          }
          resolve(results?.value);
        },
      );
    });
  }

  /**
   * Get latest resting heart rate
   */
  async getRestingHeartRate(): Promise<number | undefined> {
    if (!this.initialized) {
      await this.initialize();
    }

    const options: HealthInputOptions = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      endDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getRestingHeartRateSamples(
        options,
        (err: Object, results: any[]) => {
          if (err || !results || results.length === 0) {
            resolve(undefined);
            return;
          }
          // Get the most recent resting heart rate
          const latest = results[results.length - 1];
          resolve(latest?.value);
        },
      );
    });
  }

  /**
   * Get sleep data for the last night
   */
  async getLastNightSleep(): Promise<number> {
    if (!this.initialized) {
      await this.initialize();
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(18, 0, 0, 0); // Start from 6 PM yesterday

    const options: HealthInputOptions = {
      startDate: yesterday.toISOString(),
      endDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getSleepSamples(
        options,
        (err: Object, results: any[]) => {
          if (err || !results) {
            console.error('Error getting sleep data:', err);
            resolve(0);
            return;
          }

          // Calculate total sleep hours
          const totalMinutes = results.reduce((total, sample) => {
            if (sample.value === 'ASLEEP' || sample.value === 'INBED') {
              const start = new Date(sample.startDate).getTime();
              const end = new Date(sample.endDate).getTime();
              return total + (end - start) / (1000 * 60); // Convert to minutes
            }
            return total;
          }, 0);

          resolve(totalMinutes / 60); // Convert to hours
        },
      );
    });
  }

  /**
   * Get today's health metrics
   */
  async getTodayMetrics(): Promise<HealthMetrics> {
    const [steps, activeEnergy, heartRate, restingHeartRate, sleepHours] =
      await Promise.all([
        this.getTodaySteps(),
        this.getTodayActiveEnergy(),
        this.getLatestHeartRate(),
        this.getRestingHeartRate(),
        this.getLastNightSleep(),
      ]);

    return {
      steps,
      activeEnergy,
      heartRate,
      restingHeartRate,
      sleepHours,
      date: new Date(),
    };
  }

  /**
   * Save a workout to HealthKit
   */
  async saveWorkout(workout: Workout): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    const workoutType = this.mapWorkoutType(workout.type);
    const startDate = new Date(workout.date);
    const endDate = new Date(
      startDate.getTime() + workout.duration * 60 * 1000,
    );

    const options = {
      type: workoutType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      energyBurned: workout.caloriesBurned || 0,
      energyBurnedUnit: 'kilocalorie',
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.saveWorkout(options, (err: Object, result: string) => {
        if (err) {
          console.error('Error saving workout:', err);
          reject(err);
          return;
        }
        console.log('Workout saved to HealthKit:', result);
        resolve();
      });
    });
  }

  /**
   * Map our workout types to HealthKit workout types
   */
  private mapWorkoutType(type: string): string {
    const mapping: {[key: string]: string} = {
      strength: AppleHealthKit.Constants.Workouts.TraditionalStrengthTraining,
      cardio: AppleHealthKit.Constants.Workouts.Running,
      flexibility: AppleHealthKit.Constants.Workouts.Yoga,
      sports: AppleHealthKit.Constants.Workouts.AmericanFootball,
      other: AppleHealthKit.Constants.Workouts.Other,
    };

    return mapping[type] || AppleHealthKit.Constants.Workouts.Other;
  }

  /**
   * Get permission status
   */
  getPermissionStatus(): HealthPermissionStatus {
    return this.initialized ? 'authorized' : 'not-determined';
  }
}

// Export singleton instance
export default new HealthKitService();
