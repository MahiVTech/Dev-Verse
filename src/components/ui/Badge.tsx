import type { ReactNode } from 'react';

const TONES: Record<string, string> = {
  cyan: 'bg-cyan-glow/10 text-cyan-glow border-cyan-glow/20',
  violet: 'bg-violet-glow/10 text-violet-glow border-violet-glow/20',
  green: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  amber: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  red: 'bg-red-400/10 text-red-400 border-red-400/20',
  pink: 'bg-pink-400/10 text-pink-400 border-pink-400/20',
  slate: 'bg-white/[0.06] text-white/60 border-white/10',
};

export function Badge({ tone = 'slate', children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}
