import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ChevronsLeft, Lock, Sparkles } from 'lucide-react';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/constants/nav';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);

  const linkClasses = (isActive: boolean) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-white bg-gradient-to-r from-cyan-glow/15 to-violet-glow/10 shadow-[inset_0_0_0_1px_rgba(0,229,255,0.25)]'
        : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
    }`;

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 260 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="hidden lg:flex flex-col h-screen sticky top-0 glass border-r border-white/[0.06] z-30 py-5"
    >
      <div className={`flex items-center gap-3 px-4 mb-8 ${collapsed ? 'justify-center' : ''}`}>
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 blur-md bg-cyan-glow/50 rounded-lg" />
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center">
            <Sparkles size={16} className="text-ink-900" />
          </div>
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-white text-lg tracking-tight whitespace-nowrap">
            Dev<span className="text-gradient">Verse</span>
          </span>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/app'} className={({ isActive }) => linkClasses(isActive)}>
            <item.icon size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span className="whitespace-nowrap flex-1 flex items-center justify-between">
                {item.label}
                {item.phase && (
                  <span className="chip !py-0.5 !px-1.5 text-[10px] text-white/40 gap-1">
                    <Lock size={9} /> P{item.phase}
                  </span>
                )}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 mt-4 flex flex-col gap-1 border-t border-white/[0.06] pt-4">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => linkClasses(isActive)}>
            <item.icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}

        {!collapsed && user && (
          <div className="glass-card mt-3 p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center text-xs font-bold text-ink-900 flex-shrink-0">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-white/40">Level {user.level}</p>
            </div>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="btn-icon mt-2 self-end"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronsLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </motion.aside>
  );
}
