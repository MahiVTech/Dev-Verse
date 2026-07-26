import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NoteDraft } from '@/types';
import { generateId } from '@/utils/id';
import { seedNotes } from '@/data/seed';

interface NotesState {
  notes: Note[];
  hasSeeded: boolean;
  seedIfEmpty: () => void;
  addNote: (draft: NoteDraft) => Note;
  updateNote: (id: string, patch: Partial<NoteDraft>) => void;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  clearAll: () => void;
}

const now = () => new Date().toISOString();

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      hasSeeded: false,

      seedIfEmpty: () => {
        if (!get().hasSeeded && get().notes.length === 0) {
          set({ notes: seedNotes(), hasSeeded: true });
        }
      },

      addNote: (draft) => {
        const note: Note = {
          ...draft,
          id: generateId('note'),
          pinned: false,
          createdAt: now(),
          updatedAt: now(),
        };
        set((state) => ({ notes: [note, ...state.notes] }));
        return note;
      },

      updateNote: (id, patch) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: now() } : n)),
        })),

      togglePin: (id) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
        })),

      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      clearAll: () => set({ notes: [], hasSeeded: true }),
    }),
    { name: 'devverse-notes' }
  )
);
