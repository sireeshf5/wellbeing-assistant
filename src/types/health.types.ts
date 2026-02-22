/**
 * Health Types
 * Type definitions for HealthKit integration and health metrics
 */

export interface HealthMetrics {
  steps: number;
  activeEnergy: number; // in kcal
  heartRate?: number; // bpm
  restingHeartRate?: number; // bpm
  sleepHours?: number;
  date: Date;
}

export interface SleepData {
  id: string;
  startDate: Date;
  endDate: Date;
  duration: number; // in hours
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface HealthKitWorkout {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date;
  duration: number; // in minutes
  energyBurned?: number;
  distance?: number;
  source: string;
}

export type HealthPermissionStatus = 'not-determined' | 'authorized' | 'denied';

export interface HealthPermissions {
  read: HealthPermissionStatus;
  write: HealthPermissionStatus;
}

export interface DailyHealthSummary {
  date: Date;
  steps: number;
  calories: number;
  workouts: number;
  sleepHours: number;
  heartRate?: number;
}

export interface WeeklyHealthSummary {
  weekStart: Date;
  weekEnd: Date;
  totalSteps: number;
  totalCalories: number;
  totalWorkouts: number;
  avgSleepHours: number;
  avgHeartRate?: number;
}
