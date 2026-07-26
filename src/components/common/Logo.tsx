import { motion } from "framer-motion";
import clsx from "clsx";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const SIZE_MAP = { sm: 28, md: 34, lg: 44 };

export default function Logo({
  size = "md",
  showWordmark = true,
  className,
}: LogoProps) {
  const px = SIZE_MAP[size];
  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      <motion.svg
        width={px}
        height={px}
        viewBox="0 0 40 40"
        initial={{ rotate: -8 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#6c63ff" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="11"
          fill="url(#logoGrad)"
          opacity="0.15"
        />
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="11"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M14 14 L9 20 L14 26"
          stroke="url(#logoGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M26 14 L31 20 L26 26"
          stroke="url(#logoGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 12 L18 28"
          stroke="url(#logoGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </motion.svg>
      {showWordmark && (
        <span className="font-display font-bold tracking-tight text-white text-lg">
          Dev<span className="text-gradient">Verse</span>
        </span>
      )}
    </div>
  );
}
