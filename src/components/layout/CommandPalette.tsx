import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Target,
  BookOpen,
  StickyNote,
  LayoutDashboard,
  BarChart3,
  Settings,
  User,
  CornerDownLeft,
} from "lucide-react";
import { useUIStore } from "../../store/useUIStore";
import { useGoalsStore } from "../../store/useGoalsStore";
import { useLearningStore } from "../../store/useLearningStore";
import { useNotesStore } from "../../store/useNotesStore";
import { ROUTES } from "../../constants/routes";

interface CommandItem {
  id: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
}

export default function CommandPalette() {
  const open = useUIStore((s) => s.commandPaletteOpen);
  const setOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const navigate = useNavigate();
  const goals = useGoalsStore((s) => s.goals);
  const resources = useLearningStore((s) => s.resources);
  const notes = useNotesStore((s) => s.notes);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      { id: "nav-dash", label: "Go to Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, action: () => navigate(ROUTES.dashboard), group: "Navigate" },
      { id: "nav-goals", label: "Go to Goals", icon: <Target className="w-4 h-4" />, action: () => navigate(ROUTES.goals), group: "Navigate" },
      { id: "nav-learn", label: "Go to Learning Tracker", icon: <BookOpen className="w-4 h-4" />, action: () => navigate(ROUTES.learning), group: "Navigate" },
      { id: "nav-notes", label: "Go to Smart Notes", icon: <StickyNote className="w-4 h-4" />, action: () => navigate(ROUTES.notes), group: "Navigate" },
      { id: "nav-analytics", label: "Go to Analytics", icon: <BarChart3 className="w-4 h-4" />, action: () => navigate(ROUTES.analytics), group: "Navigate" },
      { id: "nav-settings", label: "Go to Settings", icon: <Settings className="w-4 h-4" />, action: () => navigate(ROUTES.settings), group: "Navigate" },
      { id: "nav-profile", label: "Go to Profile", icon: <User className="w-4 h-4" />, action: () => navigate(ROUTES.profile), group: "Navigate" },
    ];

    const goalItems: CommandItem[] = goals.map((g) => ({
      id: g.id,
      label: g.title,
      sub: `Goal · ${g.progress}% complete`,
      icon: <Target className="w-4 h-4" />,
      action: () => navigate(ROUTES.goals),
      group: "Goals",
    }));

    const resourceItems: CommandItem[] = resources.map((r) => ({
      id: r.id,
      label: r.title,
      sub: `${r.type} · ${r.status}`,
      icon: <BookOpen className="w-4 h-4" />,
      action: () => navigate(ROUTES.learning),
      group: "Learning",
    }));

    const noteItems: CommandItem[] = notes.map((n) => ({
      id: n.id,
      label: n.title || "Untitled note",
      sub: "Note",
      icon: <StickyNote className="w-4 h-4" />,
      action: () => navigate(ROUTES.notes),
      group: "Notes",
    }));

    return [...nav, ...goalItems, ...resourceItems, ...noteItems];
  }, [goals, resources, notes, navigate]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8);
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.sub?.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => setActiveIndex(0), [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) {
        item.action();
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    });
    return map;
  }, [filtered]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-xl glass-strong rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search className="w-4 h-4 text-muted-2" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or jump to..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-2"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-2">
                ESC
              </kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted py-10">
                  No results for "{query}"
                </p>
              )}
              {Array.from(grouped.entries()).map(([group, groupItems]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-2 font-semibold">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    runningIndex += 1;
                    const isActive = runningIndex === activeIndex;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        onClick={() => {
                          item.action();
                          setOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-cyan/15 to-violet/10 text-white"
                            : "text-muted hover:text-white"
                        }`}
                      >
                        <span className="text-cyan">{item.icon}</span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.sub && (
                          <span className="text-xs text-muted-2 shrink-0">
                            {item.sub}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-cyan shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
