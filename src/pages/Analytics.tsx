import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Clock, Target, GraduationCap, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import { useActivityStore } from '@/store/useActivityStore';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useLearningStore } from '@/store/useLearningStore';
import { weekdayShort } from '@/utils/date';
import { GOAL_CATEGORIES } from '@/constants/goals';

const TOOLTIP_STYLE = {
  background: '#151A28',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  fontSize: 12,
};

export default function Analytics() {
  const days = useActivityStore((s) => s.days);
  const goals = useGoalsStore((s) => s.goals);
  const resources = useLearningStore((s) => s.resources);

  const last30 = useMemo(
    () =>
      days.slice(-30).map((d) => ({
        day: weekdayShort(d.date),
        coding: Math.round((d.codingMinutes / 60) * 10) / 10,
        study: Math.round((d.studyMinutes / 60) * 10) / 10,
      })),
    [days]
  );

  const totalCodingHours = Math.round(days.reduce((s, d) => s + d.codingMinutes, 0) / 60);
  const totalStudyHours = Math.round(days.reduce((s, d) => s + d.studyMinutes, 0) / 60);
  const goalsCompleted = goals.filter((g) => g.status === 'completed').length;
  const avgDailyMinutes = days.length ? Math.round(days.reduce((s, d) => s + d.codingMinutes + d.studyMinutes, 0) / days.length) : 0;

  const categoryBreakdown = useMemo(() => {
    return GOAL_CATEGORIES.map((c) => ({
      name: c.label,
      value: goals.filter((g) => g.category === c.value).length,
      color: c.color,
    })).filter((c) => c.value > 0);
  }, [goals]);

  const learningByType = useMemo(() => {
    const types: Record<string, number> = {};
    resources.forEach((r) => {
      types[r.type] = (types[r.type] ?? 0) + r.hoursSpent;
    });
    return Object.entries(types).map(([type, hours]) => ({ type, hours: Math.round(hours) }));
  }, [resources]);

  const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div>
      <PageHeader eyebrow="Analytics" title="Your engineering signal" description={`Monthly report — ${monthLabel}`} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Clock} label="Total coding" value={totalCodingHours} suffix="h" tone="cyan" />
        <StatCard icon={GraduationCap} label="Total study" value={totalStudyHours} suffix="h" tone="violet" delay={0.05} />
        <StatCard icon={Target} label="Goals completed" value={goalsCompleted} tone="cyan" delay={0.1} />
        <StatCard icon={TrendingUp} label="Avg daily activity" value={avgDailyMinutes} suffix="m" tone="violet" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <Card padding="md" className="lg:col-span-2">
          <p className="section-label mb-4">Coding vs study — last 30 days</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last30}>
                <defs>
                  <linearGradient id="a-coding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="a-study" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} width={28} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="coding" name="Coding (h)" stroke="#00E5FF" fill="url(#a-coding)" strokeWidth={2} />
                <Area type="monotone" dataKey="study" name="Study (h)" stroke="#6C63FF" fill="url(#a-study)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <p className="section-label mb-4">Goals by category</p>
          <div className="h-72 flex items-center justify-center">
            {categoryBreakdown.length === 0 ? (
              <p className="text-sm text-white/30">No goals yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {categoryBreakdown.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <Card padding="md">
        <p className="section-label mb-4">Hours by resource type</p>
        <div className="h-64">
          {learningByType.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-white/30">No learning hours logged yet</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningByType}>
                <XAxis dataKey="type" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} className="capitalize" />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} width={28} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="hours" name="Hours" fill="#6C63FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
