/**
 * Insight Types
 * Type definitions for AI insights and recommendations
 */

export type InsightType = 'recovery' | 'motivation' | 'balance' | 'sleep' | 'consistency' | 'warning';

export type InsightPriority = 'low' | 'medium' | 'high';

export interface Insight {
  id: string;
  type: InsightType;
  priority: InsightPriority;
  title: string;
  message: string;
  actionable?: boolean;
  action?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface RecoveryScore {
  score: number; // 0-100
  factors: {
    sleep: number;
    workoutLoad: number;
    restDays: number;
    heartRateVariability?: number;
  };
  trend: 'improving' | 'stable' | 'declining';
  lastCalculated: Date;
}

export interface RecoveryData {
  sleepHours: number;
  restingHeartRate: number;
  lastWorkoutIntensity: number;
  daysSinceLastWorkout: number;
}

export interface WorkoutRecommendation {
  type: 'rest' | 'light' | 'moderate' | 'intense';
  message: string;
  suggestedActivities?: string[];
  reasoning: string;
}

export interface ProgressTrend {
  metric: string;
  value: number;
  change: number; // percentage change
  period: 'week' | 'month' | 'year';
  trend: 'up' | 'down' | 'stable';
}

export interface WellbeingSuggestion {
  id: string;
  category: 'sleep' | 'nutrition' | 'stress' | 'activity' | 'recovery';
  title: string;
  description: string;
  priority: InsightPriority;
  implemented?: boolean;
  createdAt: Date;
}
