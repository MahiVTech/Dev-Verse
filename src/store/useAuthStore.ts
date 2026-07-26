import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DevUser } from '@/types';
import { generateId } from '@/utils/id';
import { applyXp } from '@/utils/xp';

interface StoredCredential {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AuthResult {
  ok: boolean;
  message: string;
}

interface AuthState {
  user: DevUser | null;
  isAuthenticated: boolean;
  credentials: StoredCredential[];

  login: (input: { email: string; password: string }) => AuthResult;
  register: (input: { name: string; email: string; password: string; role?: string }) => AuthResult;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<DevUser, 'name' | 'email' | 'role' | 'avatarSeed'>>) => void;
  gainXp: (amount: number) => { leveledUp: boolean };
  bumpStreak: () => void;
}

function toUser(cred: StoredCredential, overrides?: Partial<DevUser>): DevUser {
  return {
    id: cred.id,
    name: cred.name,
    email: cred.email,
    avatarSeed: cred.name.toLowerCase(),
    role: cred.role,
    joinedAt: new Date().toISOString(),
    level: 1,
    xp: 0,
    xpToNextLevel: 500,
    streak: 1,
    ...overrides,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      credentials: [],

      login: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const match = get().credentials.find((c) => c.email.toLowerCase() === normalizedEmail);

        if (!match) {
          return { ok: false, message: 'No account found for that email. Try creating one instead.' };
        }
        if (match.password !== password) {
          return { ok: false, message: 'Incorrect password. Please try again.' };
        }

        const existing = get().user;
        set({
          user:
            existing?.id === match.id
              ? existing
              : toUser(match, { level: 4, xp: 180, xpToNextLevel: 2000, streak: 6 }),
          isAuthenticated: true,
        });
        return { ok: true, message: `Welcome back, ${match.name.split(' ')[0]}!` };
      },

      register: ({ name, email, password, role }) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (get().credentials.some((c) => c.email.toLowerCase() === normalizedEmail)) {
          return { ok: false, message: 'An account with that email already exists. Try signing in.' };
        }

        const cred: StoredCredential = {
          id: generateId('user'),
          name: name.trim() || 'New Developer',
          email: email.trim(),
          password,
          role: role?.trim() || 'Software Developer',
        };

        set((state) => ({
          credentials: [...state.credentials, cred],
          user: toUser(cred),
          isAuthenticated: true,
        }));
        return { ok: true, message: 'Account created.' };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (patch) =>
        set((state) => (state.user ? { user: { ...state.user, ...patch } } : state)),

      gainXp: (amount) => {
        const user = get().user;
        if (!user) return { leveledUp: false };
        const { xp, level, leveledUp, xpToNextLevel } = applyXp(user.xp, user.level, amount);
        set({ user: { ...user, xp, level, xpToNextLevel } });
        return { leveledUp };
      },

      bumpStreak: () => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, streak: user.streak + 1 } });
      },
    }),
    { name: 'devverse-auth' }
  )
);
