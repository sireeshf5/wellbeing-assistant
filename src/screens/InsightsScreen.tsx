import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';

type Props = MainTabScreenProps<'Insights'>;

export default function InsightsScreen({navigation}: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Insights</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Recovery Score</Text>
          <Text style={styles.scoreValue}>--</Text>
          <Text style={styles.scoreSubtext}>Complete your first workout to see insights</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <Text style={styles.cardText}>Personalized suggestions will appear here</Text>
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
  scoreCard: {
    backgroundColor: '#007AFF',
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
  scoreLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scoreSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
