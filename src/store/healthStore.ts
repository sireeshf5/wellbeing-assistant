/**
 * Health Store
 * State management for health metrics using Zustand
 */

import {create} from 'zustand';
import type {HealthMetrics, DailyHealthSummary} from '@types/health.types';
import HealthKitService from '@services/healthkit/HealthKitService';

interface HealthState {
  todayMetrics: HealthMetrics | null;
  weeklyData: DailyHealthSummary[];
  isLoading: boolean;
  error: string | null;
  lastSync: Date | null;

  // Actions
  fetchTodayMetrics: () => Promise<void>;
  refreshData: () => Promise<void>;
  initializeHealthKit: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useHealthStore = create<HealthState>((set, get) => ({
  todayMetrics: null,
  weeklyData: [],
  isLoading: false,
  error: null,
  lastSync: null,

  initializeHealthKit: async () => {
    try {
      set({isLoading: true, error: null});
      const initialized = await HealthKitService.initialize();
      if (initialized) {
        await get().fetchTodayMetrics();
      }
      set({isLoading: false});
      return initialized;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize HealthKit',
        isLoading: false,
      });
      return false;
    }
  },

  fetchTodayMetrics: async () => {
    try {
      set({isLoading: true, error: null});
      const metrics = await HealthKitService.getTodayMetrics();
      set({
        todayMetrics: metrics,
        lastSync: new Date(),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch health metrics',
        isLoading: false,
      });
    }
  },

  refreshData: async () => {
    await get().fetchTodayMetrics();
  },

  setLoading: (loading: boolean) => set({isLoading: loading}),
  setError: (error: string | null) => set({error}),
}));
