import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';
import {useHealthStore} from '@store/healthStore';
import {useWorkoutStore} from '@store/workoutStore';
import {useInsightsStore} from '@store/insightsStore';
import Card from '@components/common/Card';
import Button from '@components/common/Button';

type Props = MainTabScreenProps<'Home'>;

export default function HomeScreen({navigation}: Props) {
  const {todayMetrics, isLoading, initializeHealthKit, refreshData} = useHealthStore();
  const {workouts, getWorkoutStats} = useWorkoutStore();
  const {recoveryScore, calculateRecoveryScore} = useInsightsStore();

  useEffect(() => {
    // Initialize HealthKit and fetch data on mount
    initializeHealthKit();
    calculateRecoveryScore();
  }, []);

  useEffect(() => {
    // Recalculate recovery when workouts or health data changes
    calculateRecoveryScore();
  }, [workouts, todayMetrics]);

  const stats = getWorkoutStats();

  const handleRefresh = async () => {
    await refreshData();
  };

  if (isLoading && !todayMetrics) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading health data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Here's your fitness overview</Text>

        {/* Recovery Score Card */}
        <Card style={styles.recoveryCard}>
          <Text style={styles.recoveryLabel}>Recovery Score</Text>
          <Text style={styles.recoveryScore}>
            {recoveryScore ? recoveryScore.score.toFixed(0) : '--'}
          </Text>
          <Text style={styles.recoverySubtext}>
            {recoveryScore
              ? recoveryScore.score >= 70
                ? 'Great! Ready for training'
                : recoveryScore.score >= 50
                ? 'Moderate - Take it easy'
                : 'Low - Rest recommended'
              : 'Complete workout to see score'}
          </Text>
        </Card>

        {/* Today's Metrics */}
        <Card>
          <Text style={styles.cardTitle}>Today's Activity</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>
                {todayMetrics?.steps.toLocaleString() || '--'}
              </Text>
              <Text style={styles.metricLabel}>Steps</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>
                {todayMetrics?.activeEnergy.toFixed(0) || '--'}
              </Text>
              <Text style={styles.metricLabel}>Calories</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>
                {todayMetrics?.sleepHours?.toFixed(1) || '--'}
              </Text>
              <Text style={styles.metricLabel}>Sleep (hrs)</Text>
            </View>
          </View>
          <Button
            title="Refresh Data"
            onPress={handleRefresh}
            variant="outline"
            style={styles.refreshButton}
            loading={isLoading}
          />
        </Card>

        {/* Workout Stats */}
        <Card>
          <Text style={styles.cardTitle}>Workout Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Total Workouts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{stats.weeklyWorkouts}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Workouts')}>
            <Text style={styles.actionText}>💪 Log Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Insights')}>
            <Text style={styles.actionText}>🧠 View Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Health')}>
            <Text style={styles.actionText}>❤️ Health Data</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
  },
  recoveryCard: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    padding: 24,
  },
  recoveryLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  recoveryScore: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recoverySubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  refreshButton: {
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#34C759',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
});
