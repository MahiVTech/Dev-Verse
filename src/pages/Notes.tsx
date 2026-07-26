import { useMemo, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Plus, Search, Pin, Trash2, StickyNote, Eye, Pencil, Folder } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useNotesStore } from '@/store/useNotesStore';
import { timeAgo } from '@/utils/date';

export default function Notes() {
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const updateNote = useNotesStore((s) => s.updateNote);
  const togglePin = useNotesStore((s) => s.togglePin);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const [search, setSearch] = useState('');
  const [activeFolder, setActiveFolder] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [contentDraft, setContentDraft] = useState('');

  const folders = useMemo(() => ['All', ...Array.from(new Set(notes.map((n) => n.folder)))], [notes]);

  const filtered = useMemo(() => {
    return notes
      .filter((n) => activeFolder === 'All' || n.folder === activeFolder)
      .filter((n) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.includes(q));
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }, [notes, activeFolder, search]);

  const selected = notes.find((n) => n.id === selectedId) ?? filtered[0] ?? null;

  useEffect(() => {
    if (selected) {
      setTitleDraft(selected.title);
      setContentDraft(selected.content);
      setMode('edit');
    }
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCreate() {
    const note = addNote({ title: 'Untitled note', content: '', folder: activeFolder === 'All' ? 'General' : activeFolder, tags: [] });
    setSelectedId(note.id);
    toast.success('Note created.');
  }

  function handleSave() {
    if (!selected) return;
    updateNote(selected.id, { title: titleDraft || 'Untitled note', content: contentDraft, folder: selected.folder, tags: selected.tags });
    toast.success('Note saved.');
  }

  return (
    <div>
      <PageHeader
        eyebrow="Smart Notes"
        title="Markdown notes"
        description="Write in Markdown, organize by folder, pin what matters."
        action={
          <Button icon={<Plus size={16} />} onClick={handleCreate}>
            New note
          </Button>
        }
      />

      {notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes yet"
          description="Create your first note to start writing."
          action={
            <Button variant="secondary" icon={<Plus size={15} />} onClick={handleCreate}>
              New note
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          {/* Sidebar list */}
          <div className="glass-card p-4 flex flex-col h-[70vh]">
            <Input
              icon={<Search size={14} />}
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3"
            />
            <div className="flex flex-wrap gap-1.5 mb-4">
              {folders.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFolder(f)}
                  className={`chip !py-1 text-[11px] flex items-center gap-1 ${
                    activeFolder === f ? 'text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10' : 'text-white/50'
                  }`}
                >
                  <Folder size={10} /> {f}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 -mx-1 px-1">
              {filtered.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    selected?.id === n.id ? 'bg-white/[0.07] border border-cyan-glow/20' : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium truncate flex items-center gap-1.5">
                      {n.pinned && <Pin size={11} className="text-cyan-glow shrink-0" />}
                      <span className="truncate">{n.title || 'Untitled note'}</span>
                    </p>
                  </div>
                  <p className="text-xs text-white/40 truncate">{n.content.slice(0, 60) || 'No content yet'}</p>
                  <p className="text-[10px] text-white/25 mt-1">{timeAgo(n.updatedAt)}</p>
                </button>
              ))}
              {filtered.length === 0 && <p className="text-xs text-white/30 text-center py-8">No notes match your search.</p>}
            </div>
          </div>

          {/* Editor */}
          {selected ? (
            <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 flex flex-col h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <input
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onBlur={handleSave}
                  className="flex-1 bg-transparent text-lg font-display font-semibold outline-none"
                  placeholder="Untitled note"
                />
                <button
                  onClick={() => togglePin(selected.id)}
                  className={`btn-icon ${selected.pinned ? '!text-cyan-glow' : ''}`}
                  aria-label="Toggle pin"
                >
                  <Pin size={15} />
                </button>
                <button onClick={() => setMode((m) => (m === 'edit' ? 'preview' : 'edit'))} className="btn-icon" aria-label="Toggle preview">
                  {mode === 'edit' ? <Eye size={15} /> : <Pencil size={15} />}
                </button>
                <button onClick={() => setConfirmDeleteId(selected.id)} className="btn-icon hover:!text-red-400" aria-label="Delete note">
                  <Trash2 size={15} />
                </button>
              </div>

              <p className="text-[11px] text-white/30 mb-3">{selected.folder} · Last edited {timeAgo(selected.updatedAt)}</p>

              <div className="flex-1 overflow-y-auto">
                {mode === 'edit' ? (
                  <textarea
                    value={contentDraft}
                    onChange={(e) => setContentDraft(e.target.value)}
                    onBlur={handleSave}
                    placeholder="Write in Markdown... **bold**, `code`, - lists"
                    className="w-full h-full bg-transparent outline-none resize-none font-mono text-sm text-white/80 leading-relaxed"
                  />
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-code:text-cyan-glow prose-a:text-cyan-glow">
                    <ReactMarkdown>{contentDraft || '*Nothing to preview yet.*'}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-5 flex items-center justify-center h-[70vh] text-white/30 text-sm">
              Select a note to view it here.
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete this note?"
        message="This note will be permanently removed from local storage."
        confirmLabel="Delete note"
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteNote(confirmDeleteId);
            setSelectedId(null);
            toast.success('Note deleted.');
          }
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}
