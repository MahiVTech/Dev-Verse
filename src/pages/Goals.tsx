import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, Pencil, Trash2, Calendar, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useActivityStore } from '@/store/useActivityStore';
import { useAuthStore } from '@/store/useAuthStore';
import { GOAL_CATEGORIES, GOAL_PRIORITIES } from '@/constants/goals';
import { relativeDaysLabel } from '@/utils/date';
import type { Goal, GoalCategory, GoalPriority } from '@/types';

const PRIORITY_TONE: Record<GoalPriority, 'red' | 'amber' | 'cyan'> = {
  high: 'red',
  medium: 'amber',
  low: 'cyan',
};

const EMPTY_DRAFT = {
  title: '',
  description: '',
  priority: 'medium' as GoalPriority,
  category: 'project' as GoalCategory,
  deadline: '',
  progress: 0,
};

export default function Goals() {
  const goals = useGoalsStore((s) => s.goals);
  const addGoal = useGoalsStore((s) => s.addGoal);
  const updateGoal = useGoalsStore((s) => s.updateGoal);
  const deleteGoal = useGoalsStore((s) => s.deleteGoal);
  const incrementGoalsCompleted = useActivityStore((s) => s.incrementGoalsCompleted);
  const gainXp = useAuthStore((s) => s.gainXp);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | GoalCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const filtered = useMemo(() => {
    return goals.filter((g) => {
      if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && g.status !== statusFilter) return false;
      return true;
    });
  }, [goals, categoryFilter, statusFilter]);

  function openCreate() {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setModalOpen(true);
  }

  function openEdit(goal: Goal) {
    setEditing(goal);
    setDraft({
      title: goal.title,
      description: goal.description,
      priority: goal.priority,
      category: goal.category,
      deadline: goal.deadline ? goal.deadline.slice(0, 10) : '',
      progress: goal.progress,
    });
    setModalOpen(true);
  }

  function handleSubmit() {
    if (!draft.title.trim()) {
      toast.error('Give your goal a title first.');
      return;
    }
    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      priority: draft.priority,
      category: draft.category,
      deadline: draft.deadline ? new Date(draft.deadline).toISOString() : null,
      progress: draft.progress,
    };

    if (editing) {
      updateGoal(editing.id, payload);
      toast.success('Goal updated.');
    } else {
      addGoal(payload);
      toast.success('Goal created.');
    }
    setModalOpen(false);
  }

  function handleProgressComplete(goal: Goal) {
    if (goal.status !== 'completed') {
      updateGoal(goal.id, { progress: 100 });
      incrementGoalsCompleted();
      const { leveledUp } = gainXp(50);
      toast.success(leveledUp ? 'Goal completed — Level up! \uD83C\uDF89' : 'Goal completed! +50 XP');
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Goals"
        title="Your goal board"
        description="Prioritized, deadline-aware, and always one click from done."
        action={
          <Button icon={<Plus size={16} />} onClick={openCreate}>
            New goal
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <Filter size={13} /> Filter
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as 'all' | GoalCategory)}
          className="!w-auto"
          options={[{ value: 'all', label: 'All categories' }, ...GOAL_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))]}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="!w-auto"
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'not-started', label: 'Not started' },
            { value: 'in-progress', label: 'In progress' },
            { value: 'completed', label: 'Completed' },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals match those filters"
          description="Adjust filters or create a new goal to get moving."
          action={
            <Button variant="secondary" icon={<Plus size={15} />} onClick={openCreate}>
              New goal
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((g) => {
              const category = GOAL_CATEGORIES.find((c) => c.value === g.category);
              return (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <Card hover padding="md" className="h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge tone={PRIORITY_TONE[g.priority]}>{g.priority}</Badge>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(g)} className="btn-icon !w-8 !h-8" aria-label="Edit goal">
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(g.id)}
                          className="btn-icon !w-8 !h-8 hover:!text-red-400"
                          aria-label="Delete goal"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-white mb-1.5">{g.title}</h3>
                    {g.description && <p className="text-sm text-white/50 mb-4 flex-1">{g.description}</p>}

                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="chip !py-1"
                        style={{ color: category?.color, borderColor: `${category?.color}30`, background: `${category?.color}12` }}
                      >
                        {category?.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Calendar size={11} /> {relativeDaysLabel(g.deadline)}
                      </span>
                    </div>

                    <ProgressBar value={g.progress} showLabel />

                    {g.status !== 'completed' && (
                      <button
                        onClick={() => handleProgressComplete(g)}
                        className="btn-ghost !py-1.5 text-xs mt-4 w-full justify-center"
                      >
                        Mark complete
                      </button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit goal' : 'New goal'}
        description="Goals sync instantly to local storage."
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="Ship the v2 API"
          />
          <Textarea
            label="Description"
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            placeholder="What does done look like?"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">Priority</label>
              <Select
                value={draft.priority}
                onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value as GoalPriority }))}
                options={GOAL_PRIORITIES.map((p) => ({ value: p.value, label: p.label }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">Category</label>
              <Select
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as GoalCategory }))}
                options={GOAL_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
              />
            </div>
          </div>
          <Input
            label="Deadline"
            type="date"
            value={draft.deadline}
            onChange={(e) => setDraft((d) => ({ ...d, deadline: e.target.value }))}
          />
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
              Progress — {draft.progress}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={draft.progress}
              onChange={(e) => setDraft((d) => ({ ...d, progress: Number(e.target.value) }))}
              className="w-full accent-cyan-glow"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              {editing ? 'Save changes' : 'Create goal'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete this goal?"
        message="This can't be undone. The goal and its progress will be permanently removed."
        confirmLabel="Delete goal"
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteGoal(confirmDeleteId);
            toast.success('Goal deleted.');
          }
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}
