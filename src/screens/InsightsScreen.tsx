import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import type {MainTabScreenProps} from '@types/navigation.types';
import {useInsightsStore} from '@store/insightsStore';
import Card from '@components/common/Card';
import Button from '@components/common/Button';

type Props = MainTabScreenProps<'Insights'>;

export default function InsightsScreen({navigation}: Props) {
  const {
    insights,
    recoveryScore,
    recommendation,
    generateInsights,
    calculateRecoveryScore,
    getRecommendation,
    dismissInsight,
  } = useInsightsStore();

  useEffect(() => {
    calculateRecoveryScore();
    generateInsights();
    getRecommendation();
  }, []);

  const handleRefresh = () => {
    calculateRecoveryScore();
    generateInsights();
    getRecommendation();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Insights</Text>

        {/* Recovery Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Recovery Score</Text>
          <Text style={styles.scoreValue}>
            {recoveryScore ? recoveryScore.score.toFixed(0) : '--'}
          </Text>
          <Text style={styles.scoreSubtext}>
            {recoveryScore
              ? `Trend: ${recoveryScore.trend === 'stable' ? '→' : recoveryScore.trend === 'improving' ? '↑' : '↓'} ${recoveryScore.trend}`
              : 'Complete your first workout to see insights'}
          </Text>
          {recoveryScore && (
            <View style={styles.factorsContainer}>
              <View style={styles.factor}>
                <Text style={styles.factorLabel}>😴 Sleep</Text>
                <Text style={styles.factorValue}>
                  {recoveryScore.factors.sleep.toFixed(1)}h
                </Text>
              </View>
              <View style={styles.factor}>
                <Text style={styles.factorLabel}>💪 Load</Text>
                <Text style={styles.factorValue}>
                  {recoveryScore.factors.workoutLoad} workouts
                </Text>
              </View>
              <View style={styles.factor}>
                <Text style={styles.factorLabel}>🔄 Rest</Text>
                <Text style={styles.factorValue}>
                  {recoveryScore.factors.restDays.toFixed(1)} days
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Recommendation */}
        {recommendation && (
          <Card style={styles.recommendationCard}>
            <Text style={styles.cardTitle}>Today's Recommendation</Text>
            <Text style={styles.recommendationType}>
              {recommendation.type === 'rest' ? '😴' : recommendation.type === 'light' ? '🚶' : recommendation.type === 'moderate' ? '🏃' : '💪'}{' '}
              {recommendation.message}
            </Text>
            <Text style={styles.reasoning}>{recommendation.reasoning}</Text>
            {recommendation.suggestedActivities && (
              <View style={styles.activities}>
                <Text style={styles.activitiesLabel}>Suggested Activities:</Text>
                {recommendation.suggestedActivities.map((activity, index) => (
                  <Text key={index} style={styles.activity}>
                    • {activity}
                  </Text>
                ))}
              </View>
            )}
          </Card>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Personalized Insights</Text>
            {insights.map(insight => (
              <Card key={insight.id} style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <View style={styles.insightLeft}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text
                      style={[
                        styles.insightPriority,
                        {
                          color:
                            insight.priority === 'high'
                              ? '#FF3B30'
                              : insight.priority === 'medium'
                              ? '#FF9500'
                              : '#34C759',
                        },
                      ]}>
                      {insight.priority.toUpperCase()}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => dismissInsight(insight.id)}>
                    <Text style={styles.dismissText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.insightMessage}>{insight.message}</Text>
                {insight.actionable && insight.action && (
                  <Button
                    title={insight.action}
                    onPress={() => navigation.navigate('Workouts')}
                    variant="outline"
                    style={styles.actionButton}
                  />
                )}
              </Card>
            ))}
          </View>
        )}

        {insights.length === 0 && (
          <Card>
            <Text style={styles.emptyText}>
              No insights yet. Keep logging workouts to get personalized recommendations!
            </Text>
          </Card>
        )}

        <Button
          title="Refresh Insights"
          onPress={handleRefresh}
          variant="secondary"
          style={styles.refreshButton}
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
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 16,
  },
  factorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  factor: {
    alignItems: 'center',
  },
  factorLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  factorValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recommendationCard: {
    backgroundColor: '#34C759',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  recommendationType: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  reasoning: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
    marginBottom: 12,
  },
  activities: {
    marginTop: 8,
  },
  activitiesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  activity: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 8,
    marginBottom: 12,
  },
  insightCard: {
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  insightLeft: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  insightPriority: {
    fontSize: 12,
    fontWeight: '700',
  },
  dismissText: {
    fontSize: 20,
    color: '#8E8E93',
    padding: 4,
  },
  insightMessage: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 12,
  },
  actionButton: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    padding: 16,
  },
  refreshButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});
