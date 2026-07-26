import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, TerminalSquare } from "lucide-react";
import Button from "../components/ui/Button";
import AmbientBackground from "../components/common/AmbientBackground";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative text-center">
      <AmbientBackground />
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass mb-6 text-cyan"
        >
          <TerminalSquare className="w-9 h-9" />
        </motion.div>
        <h1 className="font-display text-7xl font-bold text-gradient mb-3">404</h1>
        <p className="font-mono text-sm text-muted mb-1">
          $ cd {window.location.pathname}
        </p>
        <p className="text-muted mb-8">
          bash: no such route in this universe
        </p>
        <Link to={ROUTES.dashboard}>
          <Button icon={<Home className="w-4 h-4" />}>Return to base</Button>
        </Link>
      </div>
    </div>
  );
}
