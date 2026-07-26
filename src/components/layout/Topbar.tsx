import { Bell, Menu, Moon, Search, Sun, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Topbar() {
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const theme = useUIStore((s) => s.theme);
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 glass border-b border-white/[0.06] px-4 sm:px-6 py-3 flex items-center gap-3">
      <button onClick={toggleSidebar} className="btn-icon lg:hidden" aria-label="Toggle menu">
        <Menu size={18} />
      </button>

      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex-1 max-w-md flex items-center gap-2.5 rounded-xl glass px-3.5 py-2 text-white/40 hover:border-cyan-glow/30 transition-colors"
      >
        <Search size={15} />
        <span className="text-sm">Search anything…</span>
        <span className="ml-auto hidden sm:flex items-center gap-0.5 text-[10px]">
          <kbd className="chip !py-0.5 !px-1.5">Ctrl</kbd>
          <kbd className="chip !py-0.5 !px-1.5">K</kbd>
        </span>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 chip !py-1.5 text-amber-300 border-amber-300/20 bg-amber-300/10">
          <Zap size={12} />
          {user?.streak ?? 0} day streak
        </div>

        <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              if (!notifOpen) toast('You\u2019re all caught up ✨', { icon: '🔔' });
            }}
            className="btn-icon relative"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/app/profile')}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center text-xs font-bold text-ink-900"
          aria-label="Profile"
        >
          {user?.name.slice(0, 2).toUpperCase() ?? 'DV'}
        </motion.button>
      </div>
    </header>
  );
}
