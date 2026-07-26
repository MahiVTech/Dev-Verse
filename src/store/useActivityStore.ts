import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ActivityDay } from '@/types';
import { seedActivity } from '@/data/seed';
import { isoToday } from '@/utils/date';

interface ActivityState {
  days: ActivityDay[];
  hasSeeded: boolean;
  seedIfEmpty: () => void;
  logMinutes: (kind: 'coding' | 'study', minutes: number) => void;
  incrementGoalsCompleted: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      days: [],
      hasSeeded: false,

      seedIfEmpty: () => {
        if (!get().hasSeeded && get().days.length === 0) {
          set({ days: seedActivity(), hasSeeded: true });
        }
      },

      logMinutes: (kind, minutes) =>
        set((state) => {
          const today = isoToday();
          const exists = state.days.find((d) => d.date === today);
          if (exists) {
            return {
              days: state.days.map((d) =>
                d.date === today
                  ? {
                      ...d,
                      codingMinutes: kind === 'coding' ? d.codingMinutes + minutes : d.codingMinutes,
                      studyMinutes: kind === 'study' ? d.studyMinutes + minutes : d.studyMinutes,
                    }
                  : d
              ),
            };
          }
          return {
            days: [
              ...state.days,
              {
                date: today,
                codingMinutes: kind === 'coding' ? minutes : 0,
                studyMinutes: kind === 'study' ? minutes : 0,
                goalsCompleted: 0,
              },
            ],
          };
        }),

      incrementGoalsCompleted: () =>
        set((state) => {
          const today = isoToday();
          const exists = state.days.find((d) => d.date === today);
          if (exists) {
            return {
              days: state.days.map((d) =>
                d.date === today ? { ...d, goalsCompleted: d.goalsCompleted + 1 } : d
              ),
            };
          }
          return {
            days: [...state.days, { date: today, codingMinutes: 0, studyMinutes: 0, goalsCompleted: 1 }],
          };
        }),
    }),
    { name: 'devverse-activity' }
  )
);
