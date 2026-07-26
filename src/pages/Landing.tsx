import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  GraduationCap,
  StickyNote,
  BarChart3,
  Github,
  Code2,
  Sparkles,
  Play,
  Zap,
  Shield,
  Cpu,
} from 'lucide-react';
import AmbientBackground from '@/components/common/AmbientBackground';
import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ROUTES } from '@/constants/routes';

const FEATURES = [
  { icon: Target, title: 'Goal Engine', desc: 'Prioritized goals with deadlines, categories, and live progress tracking.' },
  { icon: GraduationCap, title: 'Learning Tracker', desc: 'Courses, books, and videos — hours logged, completion charted automatically.' },
  { icon: StickyNote, title: 'Smart Notes', desc: 'Markdown notes with folders, pins, and instant full-text search.' },
  { icon: BarChart3, title: 'Analytics Core', desc: 'Real charts built from your actual activity — no filler numbers.' },
  { icon: Github, title: 'GitHub Dashboard', desc: 'Contribution heatmap and repo stats, styled like mission control.' },
  { icon: Code2, title: 'LeetCode Tracker', desc: 'Problem counts, difficulty breakdown, and contest rating at a glance.' },
];

const STACK = ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Recharts', 'Vite'];

const TESTIMONIALS = [
  { quote: 'Finally a dev dashboard that doesn\u2019t look like a Bootstrap template from 2016.', name: 'Priya N.', role: 'Senior Frontend Engineer' },
  { quote: 'I replaced four separate tracking spreadsheets with this in one afternoon.', name: 'Marcus T.', role: 'Full-stack Developer' },
  { quote: 'The command palette alone makes this worth switching to.', name: 'Elena R.', role: 'Engineering Manager' },
];

export default function Landing() {
  const typed = useTypewriter({
    words: ['goals.', 'learning.', 'notes.', 'coding hours.', 'momentum.'],
  });

  return (
    <div className="relative min-h-screen overflow-hidden grain">
      <AmbientBackground />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto">
        <Logo />
        <div className="flex items-center gap-3">
          <Link to={ROUTES.login} className="btn-ghost !px-4 !py-2 text-sm hidden sm:inline-flex">
            Sign in
          </Link>
          <Link to={ROUTES.register}>
            <Button size="sm">Enter DevVerse</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 sm:px-10 max-w-7xl mx-auto pt-16 sm:pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 chip mb-8 text-cyan-glow"
        >
          <Sparkles size={12} />
          <span>Frontend-only · No backend · Your data stays local</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          The operating system
          <br />
          for your{' '}
          <span className="text-gradient">
            {typed}
            <span className="inline-block w-[3px] h-[0.9em] bg-cyan-glow ml-1 animate-blink align-middle" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-10"
        >
          DevVerse is a single command center for the developer life: goals, learning,
          notes, and analytics — wrapped in a cockpit worth opening every morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link to={ROUTES.register}>
            <Button size="lg" icon={<ArrowRight size={16} />}>
              Enter DevVerse
            </Button>
          </Link>
          <Link to={ROUTES.login}>
            <Button size="lg" variant="secondary" icon={<Play size={14} />}>
              Watch demo
            </Button>
          </Link>
        </motion.div>

        {/* Floating orbit graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mx-auto w-full max-w-3xl aspect-[16/9] glass-panel p-2 shadow-glow"
        >
          <div className="w-full h-full rounded-2xl bg-ink-800/60 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 grid-bg opacity-30" />
            {[Target, GraduationCap, StickyNote, BarChart3, Github, Code2].map((Icon, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 130;
              return (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 rounded-xl glass-card flex items-center justify-center text-cyan-glow"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px - 24px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px - 24px)`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon size={18} />
                </motion.div>
              );
            })}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center shadow-glow animate-pulse-glow">
              <Cpu size={30} className="text-ink-900" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 sm:px-10 max-w-7xl mx-auto py-20">
        <div className="text-center mb-14">
          <p className="section-label mb-2">Modules</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Everything a developer tracks, unified.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-6 hover:shadow-glow-sm transition-shadow duration-300"
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-cyan-glow mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 sm:px-10 max-w-7xl mx-auto py-20">
        <div className="text-center mb-14">
          <p className="section-label mb-2">Feedback</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Developers actually keep this one open.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6"
            >
              <p className="text-sm text-white/70 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow flex items-center justify-center text-xs font-bold text-ink-900">
                  {t.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative z-10 px-6 sm:px-10 max-w-7xl mx-auto py-16 text-center">
        <p className="section-label mb-6">Built with</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STACK.map((s) => (
            <span key={s} className="chip text-white/70">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 px-6 sm:px-10 max-w-4xl mx-auto py-10">
        <div className="glass-panel p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-cyan-glow shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">No servers. No tracking.</h3>
              <p className="text-sm text-white/50">Every byte lives in your browser&apos;s local storage.</p>
            </div>
          </div>
          <Link to={ROUTES.register}>
            <Button icon={<Zap size={15} />}>Start free, forever</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] mt-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-white/30">Built for developers who like their tools to look alive.</p>
        </div>
      </footer>
    </div>
  );
}
