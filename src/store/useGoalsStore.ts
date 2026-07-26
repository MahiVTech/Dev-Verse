import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goal, GoalDraft, GoalStatus } from '@/types';
import { generateId } from '@/utils/id';
import { seedGoals } from '@/data/seed';

interface GoalsState {
  goals: Goal[];
  hasSeeded: boolean;
  seedIfEmpty: () => void;
  addGoal: (draft: GoalDraft) => Goal;
  updateGoal: (id: string, patch: Partial<GoalDraft>) => void;
  setProgress: (id: string, progress: number) => void;
  setStatus: (id: string, status: GoalStatus) => void;
  deleteGoal: (id: string) => void;
  clearAll: () => void;
}

const now = () => new Date().toISOString();

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      hasSeeded: false,

      seedIfEmpty: () => {
        if (!get().hasSeeded && get().goals.length === 0) {
          set({ goals: seedGoals(), hasSeeded: true });
        }
      },

      addGoal: (draft) => {
        const goal: Goal = {
          ...draft,
          id: generateId('goal'),
          status: draft.progress >= 100 ? 'completed' : draft.progress > 0 ? 'in-progress' : 'not-started',
          createdAt: now(),
          updatedAt: now(),
        };
        set((state) => ({ goals: [goal, ...state.goals] }));
        return goal;
      },

      updateGoal: (id, patch) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  ...patch,
                  status:
                    patch.progress !== undefined
                      ? patch.progress >= 100
                        ? 'completed'
                        : patch.progress > 0
                        ? 'in-progress'
                        : 'not-started'
                      : g.status,
                  updatedAt: now(),
                }
              : g
          ),
        })),

      setProgress: (id, progress) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  progress,
                  status: progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started',
                  updatedAt: now(),
                }
              : g
          ),
        })),

      setStatus: (id, status) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? { ...g, status, progress: status === 'completed' ? 100 : g.progress, updatedAt: now() }
              : g
          ),
        })),

      deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),

      clearAll: () => set({ goals: [], hasSeeded: true }),
    }),
    { name: 'devverse-goals' }
  )
);
