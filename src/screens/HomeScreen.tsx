import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';

type Props = MainTabScreenProps<'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Wellbeing Assistant</Text>
        <Text style={styles.subtitle}>Your personal fitness companion</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          <Text style={styles.cardText}>Steps, workouts, and health metrics will appear here</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Text style={styles.cardText}>Log workout, view insights, check health data</Text>
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
