import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "../../store/useUIStore";

export default function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-16 h-8 rounded-full glass flex items-center px-1 transition-colors"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-[#081018]"
        style={{ marginLeft: isDark ? 0 : "auto" }}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </motion.div>
    </button>
  );
}
