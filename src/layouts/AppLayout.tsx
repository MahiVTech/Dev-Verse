import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileNav from '@/components/layout/MobileNav';
import CommandPalette from '@/components/layout/CommandPalette';
import PageTransition from '@/components/layout/PageTransition';
import AmbientBackground from '@/components/common/AmbientBackground';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { ROUTES } from '@/constants/routes';

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);

  useKeyboardShortcut({
    key: 'k',
    metaOrCtrl: true,
    onTrigger: () => setCommandPaletteOpen(true),
  });

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return (
    <div className="min-h-screen flex text-white">
      <AmbientBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <MobileNav />
      <CommandPalette />
    </div>
  );
}
