import {
  LayoutDashboard,
  Target,
  GraduationCap,
  StickyNote,
  BarChart3,
  Settings,
  User,
  Github,
  Code2,
  CalendarClock,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  phase?: 2 | 3 | 4;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { label: 'Goals', path: '/app/goals', icon: Target },
  { label: 'Learning', path: '/app/learning', icon: GraduationCap },
  { label: 'Smart Notes', path: '/app/notes', icon: StickyNote },
  { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
  { label: 'Daily Planner', path: '/app/planner', icon: CalendarClock, phase: 2 },
  { label: 'GitHub', path: '/app/github', icon: Github, phase: 3 },
  { label: 'LeetCode', path: '/app/leetcode', icon: Code2, phase: 3 },
  { label: 'AI Assistant', path: '/app/assistant', icon: Sparkles, phase: 4 },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: 'Settings', path: '/app/settings', icon: Settings },
  { label: 'Profile', path: '/app/profile', icon: User },
];
