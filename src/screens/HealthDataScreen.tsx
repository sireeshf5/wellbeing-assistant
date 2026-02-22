import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';

type Props = MainTabScreenProps<'Health'>;

export default function HealthDataScreen({navigation}: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Health Metrics</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Steps Today</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.metricSubtext}>Sync with Apple Health to see data</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Heart Rate</Text>
          <Text style={styles.cardValue}>-- bpm</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sleep</Text>
          <Text style={styles.cardValue}>-- hours</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Energy</Text>
          <Text style={styles.cardValue}>-- kcal</Text>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
});
