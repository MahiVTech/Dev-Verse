import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/nav';

export default function MobileNav() {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-white/[0.08] px-2 py-2 flex justify-around">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/app'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-colors ${
              isActive ? 'text-cyan-glow' : 'text-white/40'
            }`
          }
        >
          <item.icon size={18} />
          {item.label.split(' ')[0]}
        </NavLink>
      ))}
    </nav>
  );
}
