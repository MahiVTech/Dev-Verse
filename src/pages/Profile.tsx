import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Pencil, Check, Award, Target, GraduationCap, StickyNote } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/store/useAuthStore';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useLearningStore } from '@/store/useLearningStore';
import { useNotesStore } from '@/store/useNotesStore';
import { formatDate } from '@/utils/date';

const BADGES = [
  { id: 'first-goal', label: 'First Goal', icon: Target, unlockedIf: (n: number) => n >= 1 },
  { id: 'goal-crusher', label: 'Goal Crusher', icon: Trophy, unlockedIf: (n: number) => n >= 5 },
  { id: 'lifelong-learner', label: 'Lifelong Learner', icon: GraduationCap, unlockedIf: (n: number) => n >= 3 },
  { id: 'note-taker', label: 'Note Taker', icon: StickyNote, unlockedIf: (n: number) => n >= 3 },
];

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const goals = useGoalsStore((s) => s.goals);
  const resources = useLearningStore((s) => s.resources);
  const notes = useNotesStore((s) => s.notes);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [role, setRole] = useState(user?.role ?? '');

  if (!user) return null;

  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const completedLearning = resources.filter((r) => r.status === 'completed').length;
  const xpPercent = Math.min(100, Math.round((user.xp / user.xpToNextLevel) * 100));

  function handleSave() {
    updateProfile({ name: name.trim() || user!.name, role: role.trim() || user!.role, avatarSeed: name.toLowerCase() });
    setEditing(false);
    toast.success('Profile updated.');
  }

  return (
    <div>
      <PageHeader eyebrow="Profile" title="Your developer identity" description="Level up by shipping goals and logging learning hours." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card padding="lg" className="lg:col-span-1 text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center text-3xl font-display font-bold text-ink-900 mx-auto mb-4 shadow-glow">
            {user.name.slice(0, 2).toUpperCase()}
          </div>

          {editing ? (
            <div className="space-y-3 text-left mb-4">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-white/50 mb-1">{user.role}</p>
            </>
          )}

          <p className="text-xs text-white/30 mb-5">Joined {formatDate(user.joinedAt)}</p>

          <Button
            variant="secondary"
            size="sm"
            icon={editing ? <Check size={13} /> : <Pencil size={13} />}
            onClick={() => (editing ? handleSave() : setEditing(true))}
            className="w-full justify-center"
          >
            {editing ? 'Save profile' : 'Edit profile'}
          </Button>

          <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Flame size={15} />
              <span className="text-sm font-semibold">{user.streak}</span>
              <span className="text-xs text-white/40">day streak</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-5">
          <Card padding="md">
            <div className="flex items-center justify-between mb-3">
              <p className="section-label">Level progress</p>
              <Badge tone="cyan">Level {user.level}</Badge>
            </div>
            <ProgressBar value={xpPercent} tone="gradient" />
            <p className="text-xs text-white/40 mt-2">
              {user.xp} / {user.xpToNextLevel} XP to level {user.level + 1}
            </p>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <p className="font-display text-2xl font-bold text-cyan-glow">{completedGoals}</p>
              <p className="text-xs text-white/40 mt-1">Goals shipped</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="font-display text-2xl font-bold text-violet-glow">{completedLearning}</p>
              <p className="text-xs text-white/40 mt-1">Courses finished</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="font-display text-2xl font-bold text-white">{notes.length}</p>
              <p className="text-xs text-white/40 mt-1">Notes written</p>
            </Card>
          </div>

          <Card padding="md">
            <p className="section-label mb-4 flex items-center gap-2">
              <Award size={13} /> Achievements
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map((b) => {
                const count = b.id === 'note-taker' ? notes.length : b.id === 'lifelong-learner' ? completedLearning : completedGoals;
                const unlocked = b.unlockedIf(count);
                return (
                  <motion.div
                    key={b.id}
                    whileHover={{ y: -3 }}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 text-center ${
                      unlocked ? 'glass-card' : 'glass opacity-40 rounded-2xl'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${unlocked ? 'text-cyan-glow glass' : 'text-white/30'}`}>
                      <b.icon size={18} />
                    </div>
                    <span className="text-[11px] font-medium">{b.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
