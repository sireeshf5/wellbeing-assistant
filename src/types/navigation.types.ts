/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  WorkoutDetail: {workoutId: string};
  AddWorkout: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Insights: undefined;
  Health: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
