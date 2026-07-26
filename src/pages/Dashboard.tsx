import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Flame,
  GraduationCap,
  Clock,
  StickyNote,
  Pin,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  Sparkles,
  Plus,
  BarChart3,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { EmptyState } from '@/components/ui/EmptyState';
import Card from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import ProgressBar from '@/components/ui/ProgressBar';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useLearningStore } from '@/store/useLearningStore';
import { useNotesStore } from '@/store/useNotesStore';
import { useActivityStore } from '@/store/useActivityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { weekdayShort } from '@/utils/date';
import { ROUTES } from '@/constants/routes';

const QUOTES = [
  'Code is like humor. When you have to explain it, it\u2019s bad.',
  'Simplicity is prerequisite for reliability.',
  'First, solve the problem. Then, write the code.',
  'The best error message is the one that never shows up.',
  'Make it work, make it right, make it fast.',
];

function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const total = 25 * 60;
  const logMinutes = useActivityStore((s) => s.logMinutes);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            logMinutes('coding', 25);
            toast.success('Focus session complete — +25 coding minutes logged!', { icon: '\u23F1\uFE0F' });
            return total;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  const progress = ((total - seconds) / total) * 100;

  return (
    <Card padding="md" className="flex flex-col items-center text-center">
      <p className="section-label mb-4">Focus Timer</p>
      <ProgressRing progress={progress} size={120} strokeWidth={7} />
      <p className="font-display text-2xl font-bold mt-4 tabular-nums">
        {mins}:{secs}
      </p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setRunning((r) => !r)} className="btn-icon">
          {running ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(total);
          }}
          className="btn-icon"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const goals = useGoalsStore((s) => s.goals);
  const resources = useLearningStore((s) => s.resources);
  const notes = useNotesStore((s) => s.notes);
  const days = useActivityStore((s) => s.days);

  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  const activeGoals = goals.filter((g) => g.status !== 'completed').slice(0, 4);
  const completedThisWeek = goals.filter((g) => g.status === 'completed').length;
  const pinnedNotes = notes.filter((n) => n.pinned).slice(0, 3);
  const inProgressLearning = resources.filter((r) => r.status !== 'completed').slice(0, 3);

  const last7 = days.slice(-7).map((d) => ({
    day: weekdayShort(d.date),
    coding: Math.round(d.codingMinutes / 60 * 10) / 10,
    study: Math.round(d.studyMinutes / 60 * 10) / 10,
  }));

  const weeklyCodingHours = Math.round(days.slice(-7).reduce((s, d) => s + d.codingMinutes, 0) / 60);
  const weeklyStudyHours = Math.round(days.slice(-7).reduce((s, d) => s + d.studyMinutes, 0) / 60);

  return (
    <div>
      <PageHeader
        eyebrow={`Welcome back${user ? `, ${user.name.split(' ')[0]}` : ''}`}
        title="Mission control"
        description="Here's how your build is going today."
        action={
          <div className="chip !py-2 gap-2">
            <Sparkles size={13} className="text-cyan-glow" />
            <span className="italic text-white/60 text-xs max-w-[240px] truncate">{quote}</span>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Target} label="Active goals" value={activeGoals.length} tone="cyan" delay={0} />
        <StatCard icon={Flame} label="Day streak" value={user?.streak ?? 0} tone="violet" delay={0.05} />
        <StatCard icon={Clock} label="Coding this week" value={weeklyCodingHours} suffix="h" tone="cyan" delay={0.1} />
        <StatCard icon={GraduationCap} label="Study this week" value={weeklyStudyHours} suffix="h" tone="violet" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly chart */}
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Weekly activity</p>
            <Link to={ROUTES.analytics} className="text-xs text-cyan-glow flex items-center gap-1 hover:underline">
              Full analytics <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7}>
                <defs>
                  <linearGradient id="codingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#151A28',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="coding" name="Coding (h)" stroke="#00E5FF" fill="url(#codingGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="study" name="Study (h)" stroke="#6C63FF" fill="url(#studyGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <FocusTimer />

        {/* Today's goals */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Active goals</p>
            <Link to={ROUTES.goals} className="text-xs text-cyan-glow flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          {activeGoals.length === 0 ? (
            <EmptyState icon={Target} title="No active goals" description="Create your first goal to see it here." />
          ) : (
            <div className="space-y-4">
              {activeGoals.map((g) => (
                <div key={g.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium truncate pr-2">{g.title}</p>
                    <span className="text-xs text-white/40 shrink-0">{g.progress}%</span>
                  </div>
                  <ProgressBar value={g.progress} size="sm" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Learning */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Learning in progress</p>
            <Link to={ROUTES.learning} className="text-xs text-cyan-glow flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          {inProgressLearning.length === 0 ? (
            <EmptyState icon={GraduationCap} title="Nothing in progress" description="Add a course or book to track." />
          ) : (
            <div className="space-y-4">
              {inProgressLearning.map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <ProgressRing progress={r.completion} size={44} strokeWidth={4} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-xs text-white/40">{r.hoursSpent}h / {r.totalHours}h</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Notes */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Pinned notes</p>
            <Link to={ROUTES.notes} className="text-xs text-cyan-glow flex items-center gap-1 hover:underline">
              Open notes <ArrowUpRight size={12} />
            </Link>
          </div>
          {pinnedNotes.length === 0 ? (
            <EmptyState icon={StickyNote} title="No pinned notes" description="Pin a note to keep it visible here." />
          ) : (
            <div className="space-y-3">
              {pinnedNotes.map((n) => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <Pin size={13} className="text-cyan-glow mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{n.title || 'Untitled'}</p>
                    <p className="text-xs text-white/40 truncate">{n.folder}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick actions */}
      <div className="mt-6">
        <p className="section-label mb-3">Quick actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'New goal', icon: Plus, to: ROUTES.goals },
            { label: 'Log learning', icon: GraduationCap, to: ROUTES.learning },
            { label: 'New note', icon: StickyNote, to: ROUTES.notes },
            { label: 'View analytics', icon: BarChart3, to: ROUTES.analytics },
          ].map((a) => (
            <Link key={a.label} to={a.to}>
              <motion.div whileHover={{ y: -3 }} className="glass-card p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-cyan-glow">
                  <a.icon size={16} />
                </div>
                <span className="text-xs font-medium text-white/70">{a.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-10 mb-2">
        <p className="text-[11px] text-white/25">
          {completedThisWeek} goals completed all-time · Data stored locally on this device
        </p>
      </div>
    </div>
  );
}
