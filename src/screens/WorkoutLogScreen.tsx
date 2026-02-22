import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';

type Props = MainTabScreenProps<'Workouts'>;

export default function WorkoutLogScreen({navigation}: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Workout History</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Your workouts will appear here</Text>
          <Text style={styles.cardSubtext}>Log your first workout to get started!</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
