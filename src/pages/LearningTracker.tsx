import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GraduationCap, Pencil, Trash2, Clock3, BookOpen, Video, Book } from 'lucide-react';
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
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useLearningStore } from '@/store/useLearningStore';
import type { LearningItem, LearningType } from '@/types';

const TYPE_ICON: Record<LearningType, typeof BookOpen> = {
  course: BookOpen,
  video: Video,
  book: Book,
};

const EMPTY_DRAFT = {
  title: '',
  type: 'course' as LearningType,
  provider: '',
  status: 'planned' as LearningItem['status'],
  totalHours: 10,
  hoursSpent: 0,
  tags: '',
  notes: '',
  startedAt: new Date().toISOString(),
};

export default function LearningTracker() {
  const resources = useLearningStore((s) => s.resources);
  const addItem = useLearningStore((s) => s.addItem);
  const updateItem = useLearningStore((s) => s.updateItem);
  const logHours = useLearningStore((s) => s.logHours);
  const deleteItem = useLearningStore((s) => s.deleteItem);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LearningItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | LearningType>('all');
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [logHoursTarget, setLogHoursTarget] = useState<LearningItem | null>(null);
  const [logAmount, setLogAmount] = useState(1);

  const filtered = useMemo(
    () => resources.filter((r) => typeFilter === 'all' || r.type === typeFilter),
    [resources, typeFilter]
  );

  const totalHoursSpent = resources.reduce((sum, r) => sum + r.hoursSpent, 0);
  const completedCount = resources.filter((r) => r.status === 'completed').length;

  function openCreate() {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setModalOpen(true);
  }

  function openEdit(item: LearningItem) {
    setEditing(item);
    setDraft({
      title: item.title,
      type: item.type,
      provider: item.provider,
      status: item.status,
      totalHours: item.totalHours,
      hoursSpent: item.hoursSpent,
      tags: item.tags.join(', '),
      notes: item.notes,
      startedAt: item.startedAt,
    });
    setModalOpen(true);
  }

  function handleSubmit() {
    if (!draft.title.trim()) {
      toast.error('Give this resource a title.');
      return;
    }
    const payload = {
      title: draft.title.trim(),
      type: draft.type,
      provider: draft.provider.trim(),
      status: draft.status,
      totalHours: Number(draft.totalHours) || 1,
      hoursSpent: Number(draft.hoursSpent) || 0,
      tags: draft.tags.split(',').map((t) => t.trim()).filter(Boolean),
      notes: draft.notes.trim(),
      startedAt: draft.startedAt,
    };

    if (editing) {
      updateItem(editing.id, payload);
      toast.success('Resource updated.');
    } else {
      addItem(payload);
      toast.success('Resource added.');
    }
    setModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Learning Tracker"
        title="Courses, books & videos"
        description={`${totalHoursSpent}h logged across ${resources.length} resources · ${completedCount} completed`}
        action={
          <Button icon={<Plus size={16} />} onClick={openCreate}>
            Add resource
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'course', 'video', 'book'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`chip capitalize transition-colors ${
              typeFilter === t ? 'text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10' : 'text-white/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No resources yet"
          description="Add a course, book, or video to start tracking progress."
          action={
            <Button variant="secondary" icon={<Plus size={15} />} onClick={openCreate}>
              Add resource
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const Icon = TYPE_ICON[item.type];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <Card hover padding="md" className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-violet-glow">
                          <Icon size={16} />
                        </div>
                        <Badge tone={item.status === 'completed' ? 'green' : 'slate'}>{item.status}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(item)} className="btn-icon !w-8 !h-8" aria-label="Edit">
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="btn-icon !w-8 !h-8 hover:!text-red-400"
                          aria-label="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <ProgressRing progress={item.completion} size={56} strokeWidth={5} />
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-white truncate">{item.title}</h3>
                        <p className="text-xs text-white/40 truncate">{item.provider || 'Self-paced'}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock3 size={11} /> {item.hoursSpent}h / {item.totalHours}h
                      </span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="chip !py-0.5 !px-2 text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {item.status !== 'completed' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => {
                          setLogHoursTarget(item);
                          setLogAmount(1);
                        }}
                      >
                        Log hours
                      </Button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create / edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit resource' : 'Add resource'}
        description="Track a course, book, or video and log hours as you go."
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="System Design Interview"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">Type</label>
              <Select
                value={draft.type}
                onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as LearningType }))}
                options={[
                  { value: 'course', label: 'Course' },
                  { value: 'video', label: 'Video' },
                  { value: 'book', label: 'Book' },
                ]}
              />
            </div>
            <Input
              label="Provider"
              value={draft.provider}
              onChange={(e) => setDraft((d) => ({ ...d, provider: e.target.value }))}
              placeholder="Udemy, O'Reilly..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Total hours"
              type="number"
              min={1}
              value={draft.totalHours}
              onChange={(e) => setDraft((d) => ({ ...d, totalHours: Number(e.target.value) }))}
            />
            <Input
              label="Hours spent"
              type="number"
              min={0}
              value={draft.hoursSpent}
              onChange={(e) => setDraft((d) => ({ ...d, hoursSpent: Number(e.target.value) }))}
            />
          </div>
          <Input
            label="Tags (comma separated)"
            value={draft.tags}
            onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
            placeholder="react, backend"
          />
          <Textarea
            label="Notes"
            rows={3}
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            placeholder="Key takeaways so far..."
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              {editing ? 'Save changes' : 'Add resource'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Log hours modal */}
      <Modal
        open={!!logHoursTarget}
        onClose={() => setLogHoursTarget(null)}
        title="Log study hours"
        description={logHoursTarget?.title}
        maxWidth="max-w-sm"
      >
        <Input
          label="Hours to add"
          type="number"
          min={0.5}
          step={0.5}
          value={logAmount}
          onChange={(e) => setLogAmount(Number(e.target.value))}
        />
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setLogHoursTarget(null)}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              if (logHoursTarget) {
                logHours(logHoursTarget.id, logAmount);
                toast.success(`Logged ${logAmount}h on ${logHoursTarget.title}.`);
              }
              setLogHoursTarget(null);
            }}
          >
            Log hours
          </Button>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete this resource?"
        message="This will permanently remove it and its logged hours."
        confirmLabel="Delete"
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteItem(confirmDeleteId);
            toast.success('Resource deleted.');
          }
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}
