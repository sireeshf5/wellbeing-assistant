/**
 * Date Helper Functions
 */

import {format, formatDistanceToNow, isToday, isYesterday, parseISO} from 'date-fns';

/**
 * Format date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(d)) {
    return 'Today';
  }

  if (isYesterday(d)) {
    return 'Yesterday';
  }

  return format(d, 'MMM d, yyyy');
};

/**
 * Format time for display
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'h:mm a');
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, {addSuffix: true});
};

/**
 * Get start of today
 */
export const getStartOfToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Get start of week
 */
export const getStartOfWeek = (): Date => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day;
  const startOfWeek = new Date(today.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

/**
 * Check if date is within last N days
 */
export const isWithinDays = (date: Date | string, days: number): boolean => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d >= cutoff;
};
