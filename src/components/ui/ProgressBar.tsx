import { motion } from "framer-motion";
import clsx from "clsx";

interface ProgressBarProps {
  value: number; // 0-100
  size?: "sm" | "md";
  showLabel?: boolean;
  tone?: "gradient" | "success" | "warning" | "danger";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
  gradient: "bg-gradient-to-r from-cyan to-violet",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export default function ProgressBar({
  value,
  size = "md",
  showLabel = false,
  tone = "gradient",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={clsx("w-full", className)}>
      <div
        className={clsx(
          "w-full bg-white/5 rounded-full overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={clsx("h-full rounded-full", TONE_CLASSES[tone])}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1.5 text-[11px] text-muted">
          <span>{clamped}% complete</span>
        </div>
      )}
    </div>
  );
}
