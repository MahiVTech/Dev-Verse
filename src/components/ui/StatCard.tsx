import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  tone?: 'cyan' | 'violet';
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, suffix = '', tone = 'cyan', delay = 0 }: StatCardProps) {
  const animated = useCountUp(value);
  const toneClasses = tone === 'cyan' ? 'text-cyan-glow' : 'text-violet-glow';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3 }}
      className="glass-card p-5 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="section-label">{label}</span>
        <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center ${toneClasses} group-hover:shadow-glow-sm transition-shadow`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-white">
        {animated}
        <span className="text-lg text-white/40 ml-0.5">{suffix}</span>
      </p>
    </motion.div>
  );
}
