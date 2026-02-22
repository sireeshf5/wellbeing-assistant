/**
 * Workout Types
 * Type definitions for workout logging and tracking
 */

export type WorkoutType = 'strength' | 'cardio' | 'flexibility' | 'sports' | 'other';

export type WeightUnit = 'kg' | 'lbs';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  unit: WeightUnit;
  notes?: string;
}

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video';
  uri: string; // Encrypted file path
  thumbnail?: string;
  createdAt: Date;
}

export interface Workout {
  id: string;
  date: Date;
  type: WorkoutType;
  exercises: Exercise[];
  duration: number; // in minutes
  caloriesBurned?: number;
  notes?: string;
  media?: MediaAttachment[];
  voiceNote?: string; // path to encrypted audio file
  createdAt: Date;
  updatedAt: Date;
  syncedToHealthKit: boolean;
}

export interface WorkoutFormData {
  type: WorkoutType;
  exercises: Omit<Exercise, 'id'>[];
  duration: number;
  notes?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  weeklyWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  mostFrequentType: WorkoutType;
}
