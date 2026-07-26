import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Lock } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';

interface ComingSoonProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  phase: 2 | 3 | 4;
  planned: string[];
}

const PHASE_LABEL: Record<number, string> = {
  2: 'Phase 2 — Planning & Focus',
  3: 'Phase 3 — Developer Metrics',
  4: 'Phase 4 — AI Assistant',
};

export default function ComingSoon({ icon: Icon, eyebrow, title, description, phase, planned }: ComingSoonProps) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <Card padding="lg" className="text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-16 h-16 mx-auto mb-5"
        >
          <div className="absolute inset-0 blur-2xl bg-cyan-glow/20 rounded-full" />
          <div className="relative w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-cyan-glow">
            <Icon size={26} />
          </div>
        </motion.div>

        <span className="chip !py-1 text-white/50 gap-1.5 mb-4 inline-flex">
          <Lock size={11} /> {PHASE_LABEL[phase]}
        </span>

        <h3 className="font-display text-xl font-semibold mb-2">Building this next.</h3>
        <p className="text-sm text-white/50 mb-6 max-w-sm mx-auto">
          This module is scoped and wired into navigation, routing, and the design system —
          ready for the data layer to land in {PHASE_LABEL[phase]}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {planned.map((p) => (
            <div key={p} className="flex items-center gap-2 glass rounded-lg px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow shrink-0" />
              <span className="text-xs text-white/60">{p}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
