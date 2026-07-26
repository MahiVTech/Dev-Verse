import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningDraft, LearningItem, LearningStatus } from '@/types';
import { generateId } from '@/utils/id';
import { seedLearning } from '@/data/seed';

interface LearningState {
  resources: LearningItem[];
  hasSeeded: boolean;
  seedIfEmpty: () => void;
  addItem: (draft: LearningDraft) => LearningItem;
  updateItem: (id: string, patch: Partial<LearningDraft>) => void;
  logHours: (id: string, hours: number) => void;
  setStatus: (id: string, status: LearningStatus) => void;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

const now = () => new Date().toISOString();
const clampCompletion = (spent: number, total: number) =>
  total <= 0 ? 0 : Math.min(100, Math.round((spent / total) * 100));

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      resources: [],
      hasSeeded: false,

      seedIfEmpty: () => {
        if (!get().hasSeeded && get().resources.length === 0) {
          set({ resources: seedLearning(), hasSeeded: true });
        }
      },

      addItem: (draft) => {
        const completion = clampCompletion(draft.hoursSpent, draft.totalHours);
        const item: LearningItem = {
          ...draft,
          id: generateId('lrn'),
          completion,
          completedAt: completion >= 100 ? now() : null,
        };
        set((state) => ({ resources: [item, ...state.resources] }));
        return item;
      },

      updateItem: (id, patch) =>
        set((state) => ({
          resources: state.resources.map((it) => {
            if (it.id !== id) return it;
            const merged = { ...it, ...patch };
            const completion = clampCompletion(merged.hoursSpent, merged.totalHours);
            return {
              ...merged,
              completion,
              completedAt: completion >= 100 ? it.completedAt ?? now() : null,
              status: completion >= 100 ? 'completed' : merged.status,
            };
          }),
        })),

      logHours: (id, hours) =>
        set((state) => ({
          resources: state.resources.map((it) => {
            if (it.id !== id) return it;
            const hoursSpent = Math.min(it.totalHours, it.hoursSpent + hours);
            const completion = clampCompletion(hoursSpent, it.totalHours);
            return {
              ...it,
              hoursSpent,
              completion,
              status: completion >= 100 ? 'completed' : 'in-progress',
              completedAt: completion >= 100 ? now() : it.completedAt,
            };
          }),
        })),

      setStatus: (id, status) =>
        set((state) => ({
          resources: state.resources.map((it) => (it.id === id ? { ...it, status } : it)),
        })),

      deleteItem: (id) =>
        set((state) => ({ resources: state.resources.filter((it) => it.id !== id) })),

      clearAll: () => set({ resources: [], hasSeeded: true }),
    }),
    { name: 'devverse-learning' }
  )
);
