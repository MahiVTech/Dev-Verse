import { useState } from 'react';
import { Sun, Moon, Trash2, Download, Command, Keyboard, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useUIStore } from '@/store/useUIStore';
import { useGoalsStore } from '@/store/useGoalsStore';
import { useLearningStore } from '@/store/useLearningStore';
import { useNotesStore } from '@/store/useNotesStore';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], desc: 'Open command palette' },
  { keys: ['Esc'], desc: 'Close dialogs & command palette' },
  { keys: ['\u2191', '\u2193'], desc: 'Navigate command palette results' },
  { keys: ['Enter'], desc: 'Select highlighted result' },
];

export default function Settings() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const clearGoals = useGoalsStore((s) => s.clearAll);
  const clearLearning = useLearningStore((s) => s.clearAll);
  const clearNotes = useNotesStore((s) => s.clearAll);
  const goals = useGoalsStore((s) => s.goals);
  const resources = useLearningStore((s) => s.resources);
  const notes = useNotesStore((s) => s.notes);

  const [confirmReset, setConfirmReset] = useState(false);

  function handleExport() {
    const payload = { goals, resources, notes, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devverse-export.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported.');
  }

  return (
    <div>
      <PageHeader eyebrow="Settings" title="Configure DevVerse" description="Theme, data, and shortcuts — all local to this browser." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card padding="md">
          <p className="section-label mb-4">Appearance</p>
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-cyan-glow">
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              </div>
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-white/40 capitalize">{theme} mode</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'light' : 'dark'}
            </Button>
          </div>
        </Card>

        <Card padding="md">
          <p className="section-label mb-4">Your data</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between glass rounded-xl p-4">
              <div>
                <p className="text-sm font-medium">Export as JSON</p>
                <p className="text-xs text-white/40">Download goals, learning & notes.</p>
              </div>
              <Button variant="secondary" size="sm" icon={<Download size={14} />} onClick={handleExport}>
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between glass rounded-xl p-4">
              <div>
                <p className="text-sm font-medium text-red-400">Reset all data</p>
                <p className="text-xs text-white/40">Clears goals, learning items, and notes.</p>
              </div>
              <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => setConfirmReset(true)}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <p className="section-label mb-4 flex items-center gap-2">
            <Keyboard size={13} /> Keyboard shortcuts
          </p>
          <div className="space-y-2.5">
            {SHORTCUTS.map((s) => (
              <div key={s.desc} className="flex items-center justify-between text-sm">
                <span className="text-white/60">{s.desc}</span>
                <div className="flex gap-1">
                  {s.keys.map((k) => (
                    <kbd key={k} className="chip !py-0.5 !px-2 text-[11px]">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <p className="section-label mb-4 flex items-center gap-2">
            <Info size={13} /> About
          </p>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-violet-glow shrink-0">
              <Command size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">DevVerse v1.0.0</p>
              <p className="text-xs text-white/40 leading-relaxed mt-1">
                A frontend-only developer command center. Everything runs and persists in your browser —
                no backend, no accounts on a server, nothing leaves your device.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all data?"
        message="This permanently deletes every goal, learning resource, and note stored in this browser. This cannot be undone."
        confirmLabel="Reset everything"
        onConfirm={() => {
          clearGoals();
          clearLearning();
          clearNotes();
          toast.success('All data reset.');
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
