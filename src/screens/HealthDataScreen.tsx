import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';
import {useHealthStore} from '@store/healthStore';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import {formatDate} from '@utils/dateHelpers';

type Props = MainTabScreenProps<'Health'>;

export default function HealthDataScreen({navigation}: Props) {
  const {todayMetrics, isLoading, lastSync, initializeHealthKit, refreshData} =
    useHealthStore();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    initializeHealthKit();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  if (isLoading && !todayMetrics) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#34C759" />
        <Text style={styles.loadingText}>Loading health data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <View style={styles.content}>
        <Text style={styles.title}>Health Metrics</Text>
        {lastSync && (
          <Text style={styles.syncText}>
            Last synced: {formatDate(lastSync)} at {new Date(lastSync).toLocaleTimeString()}
          </Text>
        )}

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Steps Today</Text>
          <Text style={styles.metricValue}>
            {todayMetrics?.steps.toLocaleString() || '--'}
          </Text>
          <Text style={styles.metricSubtext}>
            {todayMetrics ? 'Great progress!' : 'Sync with Apple Health to see data'}
          </Text>
        </View>

        <Card>
          <View style={styles.cardRow}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>❤️ Heart Rate</Text>
              <Text style={styles.cardSubtitle}>Latest reading</Text>
            </View>
            <Text style={styles.cardValue}>
              {todayMetrics?.heartRate ? `${todayMetrics.heartRate.toFixed(0)} bpm` : '--'}
            </Text>
          </View>
        </Card>

        <Card>
          <View style={styles.cardRow}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>💓 Resting Heart Rate</Text>
              <Text style={styles.cardSubtitle}>Average</Text>
            </View>
            <Text style={styles.cardValue}>
              {todayMetrics?.restingHeartRate
                ? `${todayMetrics.restingHeartRate.toFixed(0)} bpm`
                : '--'}
            </Text>
          </View>
        </Card>

        <Card>
          <View style={styles.cardRow}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>😴 Sleep</Text>
              <Text style={styles.cardSubtitle}>Last night</Text>
            </View>
            <Text style={styles.cardValue}>
              {todayMetrics?.sleepHours ? `${todayMetrics.sleepHours.toFixed(1)} hrs` : '--'}
            </Text>
          </View>
        </Card>

        <Card>
          <View style={styles.cardRow}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>🔥 Active Energy</Text>
              <Text style={styles.cardSubtitle}>Burned today</Text>
            </View>
            <Text style={styles.cardValue}>
              {todayMetrics?.activeEnergy ? `${todayMetrics.activeEnergy.toFixed(0)} kcal` : '--'}
            </Text>
          </View>
        </Card>

        <Button
          title="Sync with Apple Health"
          onPress={refreshData}
          variant="secondary"
          loading={isLoading}
          style={styles.syncButton}
        />
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
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  syncText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: '#34C759',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  metricLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  syncButton: {
    marginTop: 8,
  },
});
