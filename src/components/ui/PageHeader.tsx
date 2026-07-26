import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
    >
      <div>
        <p className="section-label mb-1.5">{eyebrow}</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        {description && <p className="text-white/50 text-sm mt-1.5 max-w-xl">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
