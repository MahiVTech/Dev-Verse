import type { GoalCategory, GoalPriority } from '@/types';

export const GOAL_CATEGORIES: { value: GoalCategory; label: string; color: string }[] = [
  { value: 'career', label: 'Career', color: '#00E5FF' },
  { value: 'learning', label: 'Learning', color: '#6C63FF' },
  { value: 'health', label: 'Health', color: '#34D399' },
  { value: 'project', label: 'Project', color: '#F59E0B' },
  { value: 'personal', label: 'Personal', color: '#F472B6' },
];

export const GOAL_PRIORITIES: { value: GoalPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#60A5FA' },
  { value: 'medium', label: 'Medium', color: '#F59E0B' },
  { value: 'high', label: 'High', color: '#F87171' },
];
