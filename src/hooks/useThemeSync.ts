import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

/** Keeps the <html> class in sync with the persisted theme so Tailwind's `dark:`/`light` scoping works globally. */
export function useThemeSync() {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);
}
