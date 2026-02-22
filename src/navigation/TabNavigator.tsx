import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import type {MainTabParamList} from '@types/navigation.types';

// Screens (we'll create these next)
import HomeScreen from '@screens/HomeScreen';
import WorkoutLogScreen from '@screens/WorkoutLogScreen';
import InsightsScreen from '@screens/InsightsScreen';
import HealthDataScreen from '@screens/HealthDataScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5EA',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '700',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          // Icon will be added later
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutLogScreen}
        options={{
          title: 'Workouts',
          tabBarLabel: 'Workouts',
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          title: 'Insights',
          tabBarLabel: 'Insights',
        }}
      />
      <Tab.Screen
        name="Health"
        component={HealthDataScreen}
        options={{
          title: 'Health Data',
          tabBarLabel: 'Health',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
