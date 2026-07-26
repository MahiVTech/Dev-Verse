import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { useThemeSync } from '@/hooks/useThemeSync';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useLearningStore } from '@/store/useLearningStore';
import { useNotesStore } from '@/store/useNotesStore';
import { useActivityStore } from '@/store/useActivityStore';
import { useAuthStore } from '@/store/useAuthStore';

import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Goals from '@/pages/Goals';
import LearningTracker from '@/pages/LearningTracker';
import Notes from '@/pages/Notes';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Planner from '@/pages/Planner';
import GitHubDashboard from '@/pages/GitHubDashboard';
import LeetCodeDashboard from '@/pages/LeetCodeDashboard';
import AIAssistant from '@/pages/AIAssistant';
import NotFound from '@/pages/NotFound';

export default function App() {
  useThemeSync();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const seedGoals = useGoalsStore((s) => s.seedIfEmpty);
  const seedLearning = useLearningStore((s) => s.seedIfEmpty);
  const seedNotes = useNotesStore((s) => s.seedIfEmpty);
  const seedActivity = useActivityStore((s) => s.seedIfEmpty);

  useEffect(() => {
    if (!isAuthenticated) return;
    seedGoals();
    seedLearning();
    seedNotes();
    seedActivity();
  }, [isAuthenticated, seedGoals, seedLearning, seedNotes, seedActivity]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(21, 26, 40, 0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            fontSize: '13px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<Goals />} />
          <Route path="learning" element={<LearningTracker />} />
          <Route path="notes" element={<Notes />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="planner" element={<Planner />} />
          <Route path="github" element={<GitHubDashboard />} />
          <Route path="leetcode" element={<LeetCodeDashboard />} />
          <Route path="assistant" element={<AIAssistant />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
