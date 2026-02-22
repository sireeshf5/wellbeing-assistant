/**
 * Workout Store
 * State management for workouts using Zustand
 */

import {create} from 'zustand';
import type {Workout, WorkoutFormData, WorkoutStats} from '@types/workout.types';
import {nanoid} from 'nanoid/non-secure';

interface WorkoutState {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addWorkout: (formData: WorkoutFormData) => Workout;
  updateWorkout: (id: string, updates: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  getWorkoutById: (id: string) => Workout | undefined;
  getWorkoutStats: () => WorkoutStats;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: [],
  isLoading: false,
  error: null,

  addWorkout: (formData: WorkoutFormData) => {
    const newWorkout: Workout = {
      id: nanoid(),
      date: new Date(),
      type: formData.type,
      exercises: formData.exercises.map(ex => ({
        ...ex,
        id: nanoid(),
      })),
      duration: formData.duration,
      notes: formData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      syncedToHealthKit: false,
    };

    set(state => ({
      workouts: [newWorkout, ...state.workouts].sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      ),
    }));

    return newWorkout;
  },

  updateWorkout: (id: string, updates: Partial<Workout>) => {
    set(state => ({
      workouts: state.workouts.map(workout =>
        workout.id === id
          ? {...workout, ...updates, updatedAt: new Date()}
          : workout,
      ),
    }));
  },

  deleteWorkout: (id: string) => {
    set(state => ({
      workouts: state.workouts.filter(workout => workout.id !== id),
    }));
  },

  getWorkoutById: (id: string) => {
    return get().workouts.find(workout => workout.id === id);
  },

  getWorkoutStats: () => {
    const {workouts} = get();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);

    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0,
    );

    // Find most frequent workout type
    const typeCounts: {[key: string]: number} = {};
    workouts.forEach(w => {
      typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
    });

    const mostFrequentType =
      (Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as any) ||
      'strength';

    return {
      totalWorkouts: workouts.length,
      weeklyWorkouts: weeklyWorkouts.length,
      totalDuration,
      totalCalories,
      mostFrequentType,
    };
  },

  setLoading: (loading: boolean) => set({isLoading: loading}),
  setError: (error: string | null) => set({error}),
}));
