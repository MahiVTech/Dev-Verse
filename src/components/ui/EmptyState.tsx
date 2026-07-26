import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 blur-2xl bg-cyan-glow/20 rounded-full" />
        <div className="relative w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-cyan-glow">
          <Icon size={28} />
        </div>
      </div>
      <h3 className="font-display font-semibold text-white text-lg mb-1.5">{title}</h3>
      <p className="text-sm text-white/50 max-w-sm mb-5">{description}</p>
      {action}
    </motion.div>
  );
}
