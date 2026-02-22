/**
 * Insights Store
 * State management for AI insights and recommendations
 */

import {create} from 'zustand';
import type {
  Insight,
  RecoveryScore,
  WorkoutRecommendation,
} from '@types/insight.types';
import {nanoid} from 'nanoid/non-secure';
import {useWorkoutStore} from './workoutStore';
import {useHealthStore} from './healthStore';

interface InsightsState {
  insights: Insight[];
  recoveryScore: RecoveryScore | null;
  recommendation: WorkoutRecommendation | null;
  isLoading: boolean;

  // Actions
  generateInsights: () => void;
  calculateRecoveryScore: () => void;
  getRecommendation: () => void;
  dismissInsight: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useInsightsStore = create<InsightsState>((set, get) => ({
  insights: [],
  recoveryScore: null,
  recommendation: null,
  isLoading: false,

  generateInsights: () => {
    const workouts = useWorkoutStore.getState().workouts;
    const healthMetrics = useHealthStore.getState().todayMetrics;
    const newInsights: Insight[] = [];

    // Check workout frequency
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);

    if (weeklyWorkouts.length === 0) {
      newInsights.push({
        id: nanoid(),
        type: 'motivation',
        priority: 'high',
        title: 'Get Moving!',
        message: "You haven't logged a workout this week. Let's get started!",
        actionable: true,
        action: 'Log your first workout',
        createdAt: new Date(),
      });
    } else if (weeklyWorkouts.length >= 5) {
      newInsights.push({
        id: nanoid(),
        type: 'warning',
        priority: 'medium',
        title: 'Consider a Rest Day',
        message: `You've worked out ${weeklyWorkouts.length} times this week. Recovery is important!`,
        actionable: true,
        action: 'Take a rest day',
        createdAt: new Date(),
      });
    }

    // Check sleep
    if (healthMetrics && healthMetrics.sleepHours && healthMetrics.sleepHours < 7) {
      newInsights.push({
        id: nanoid(),
        type: 'sleep',
        priority: 'high',
        title: 'Improve Sleep',
        message: `You got ${healthMetrics.sleepHours.toFixed(1)} hours of sleep. Aim for 7-9 hours for optimal recovery.`,
        actionable: true,
        action: 'Set earlier bedtime',
        createdAt: new Date(),
      });
    }

    // Check workout balance
    const typeCounts: {[key: string]: number} = {};
    workouts.forEach(w => {
      typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
    });

    const dominantType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
    if (dominantType && dominantType[1] > workouts.length * 0.7) {
      newInsights.push({
        id: nanoid(),
        type: 'balance',
        priority: 'low',
        title: 'Diversify Your Workouts',
        message: `Most of your workouts are ${dominantType[0]}. Try mixing in other types for better balance.`,
        actionable: false,
        createdAt: new Date(),
      });
    }

    // Check consistency
    if (workouts.length >= 3) {
      const dates = workouts.map(w => new Date(w.date).toDateString());
      const uniqueDates = new Set(dates);
      if (uniqueDates.size >= 3) {
        newInsights.push({
          id: nanoid(),
          type: 'consistency',
          priority: 'low',
          title: 'Great Consistency!',
          message: "You're building a solid workout habit. Keep it up!",
          actionable: false,
          createdAt: new Date(),
        });
      }
    }

    set({insights: newInsights});
  },

  calculateRecoveryScore: () => {
    const workouts = useWorkoutStore.getState().workouts;
    const healthMetrics = useHealthStore.getState().todayMetrics;

    if (!healthMetrics) {
      set({recoveryScore: null});
      return;
    }

    // Simple recovery score calculation (0-100)
    let score = 70; // Base score

    // Sleep factor (±20 points)
    const sleepHours = healthMetrics.sleepHours || 7;
    if (sleepHours >= 8) {
      score += 15;
    } else if (sleepHours < 6) {
      score -= 20;
    }

    // Workout load factor (±15 points)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);
    if (weeklyWorkouts.length === 0) {
      score += 15; // Well rested
    } else if (weeklyWorkouts.length >= 6) {
      score -= 15; // High load
    }

    // Rest days factor (±10 points)
    const lastWorkout = workouts[0];
    if (lastWorkout) {
      const daysSinceLastWorkout =
        (Date.now() - new Date(lastWorkout.date).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSinceLastWorkout >= 2) {
        score += 10;
      } else if (daysSinceLastWorkout < 1) {
        score -= 5;
      }
    }

    // Cap score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Determine trend (simplified)
    const trend = score >= 70 ? 'stable' : score >= 50 ? 'declining' : 'improving';

    set({
      recoveryScore: {
        score,
        factors: {
          sleep: sleepHours,
          workoutLoad: weeklyWorkouts.length,
          restDays: lastWorkout
            ? (Date.now() - new Date(lastWorkout.date).getTime()) /
              (1000 * 60 * 60 * 24)
            : 7,
        },
        trend,
        lastCalculated: new Date(),
      },
    });
  },

  getRecommendation: () => {
    const {recoveryScore} = get();

    if (!recoveryScore) {
      set({recommendation: null});
      return;
    }

    let recommendation: WorkoutRecommendation;

    if (recoveryScore.score < 40) {
      recommendation = {
        type: 'rest',
        message: 'Your body needs recovery',
        suggestedActivities: ['Light stretching', 'Walking', 'Meditation'],
        reasoning:
          'Low recovery score indicates you need rest to prevent overtraining.',
      };
    } else if (recoveryScore.score < 60) {
      recommendation = {
        type: 'light',
        message: 'Go for a light workout',
        suggestedActivities: ['Yoga', 'Swimming', 'Light cardio'],
        reasoning: 'Moderate recovery score suggests light activity is best today.',
      };
    } else if (recoveryScore.score < 80) {
      recommendation = {
        type: 'moderate',
        message: 'Good for moderate intensity',
        suggestedActivities: ['Strength training', 'Moderate cardio', 'Sports'],
        reasoning:
          'Good recovery score allows for moderate intensity workouts.',
      };
    } else {
      recommendation = {
        type: 'intense',
        message: 'Great day for pushing limits!',
        suggestedActivities: ['Heavy lifting', 'HIIT', 'Max effort training'],
        reasoning:
          'Excellent recovery score - your body is ready for intense work.',
      };
    }

    set({recommendation});
  },

  dismissInsight: (id: string) => {
    set(state => ({
      insights: state.insights.filter(insight => insight.id !== id),
    }));
  },

  setLoading: (loading: boolean) => set({isLoading: loading}),
}));
