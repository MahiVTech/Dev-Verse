# DevVerse — Developer Operating System

A frontend-only, glassmorphic command center for developers: goals, learning tracking, markdown notes, and real analytics — all persisted locally in your browser. No backend, no accounts on a server, no tracking.

![Status](https://img.shields.io/badge/status-Phase%201%20complete-00E5FF?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-6C63FF?style=flat-square)

<!-- Add real screenshots here once you have the app running locally -->
<!-- ![DevVerse dashboard](./docs/screenshot-dashboard.png) -->

## What's included (Phase 1 — fully functional)

- **Landing page** — animated hero with typewriter effect, orbiting module graphic, features, testimonials, tech stack
- **Authentication UI** — frontend-only login/register with mocked credential storage (no server, no real security — see note below)
- **Dashboard** — live stats, weekly activity chart, active goals, in-progress learning, pinned notes, a real working focus timer, quick actions
- **Goals** — full CRUD, priority/category/deadline, progress slider, filters, completion → XP
- **Learning Tracker** — courses/videos/books, hours logging, completion rings, filters
- **Smart Notes** — Markdown editor + live preview, folders, search, pin/unpin
- **Analytics** — real Recharts visualizations built from your actual stored activity, goals, and learning data
- **Settings** — theme toggle, JSON export, full data reset, keyboard shortcut reference
- **Profile** — XP/level system, streak, achievement badges
- **Command palette (Ctrl/Cmd + K)**, responsive sidebar + mobile bottom nav, dark/light themes, toasts, empty states, 404 page

## Scaffolded (Phase 2–4 — routed, not yet data-wired)

Daily Planner, GitHub Dashboard, LeetCode Tracker, and AI Assistant have real nav entries, routes, and a styled "in progress" screen so the app never 404s — but their data layers aren't built yet.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS (+ typography plugin) · Framer Motion · Zustand (persisted to localStorage) · Recharts · React Markdown · React Hot Toast · React Router · Lucide Icons

## Folder structure

```
src/
├── components/
│   ├── common/       # AmbientBackground, Logo, ThemeToggle, ComingSoon
│   ├── layout/        # Sidebar, Topbar, MobileNav, CommandPalette, PageTransition
│   └── ui/            # Button, Card, Input, Modal, Badge, ProgressBar/Ring, etc.
├── constants/          # nav.ts, routes.ts, goals.ts
├── data/               # seed.ts — demo data used on first run
├── hooks/              # useKeyboardShortcut, useTypewriter, useCountUp, useThemeSync
├── layouts/            # AppLayout, AuthLayout
├── pages/              # One file per route
├── store/              # Zustand slices (auth, goals, learning, notes, activity, ui)
├── types/              # Shared TypeScript types
├── utils/              # date, id, xp helpers
├── App.tsx
├── main.tsx
└── index.css
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint       # ESLint
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: DevVerse Phase 1"
git branch -M main
git remote add origin https://github.com/<your-username>/devverse.git
git push -u origin main
```

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — no environment variables needed.

### GitHub Pages

1. Install the Pages helper: `npm i -D gh-pages`
2. In `vite.config.ts`, set `base: '/devverse/'` (or your repo name).
3. Add to `package.json` scripts: `"deploy": "npm run build && gh-pages -d dist"`
4. Run `npm run deploy`, then enable Pages in your repo settings pointing at the `gh-pages` branch.

## A note on "authentication"

This is a portfolio/demo project with **no backend**. Login/register store credentials in plain form inside browser localStorage purely to simulate an auth flow — it is not secure and should never be used for real user data or real passwords.

## Performance notes

- The production bundle is currently a single ~290 KB gzipped chunk. For further optimization: route-based code-splitting with `React.lazy()` per page, and `build.rollupOptions.output.manualChunks` to split vendor libraries (Recharts, Framer Motion) from app code.
- Recharts and Framer Motion are the largest dependencies — lazy-load the Analytics route if bundle size becomes a concern.
- Images/icons are all SVG (Lucide) — no raster asset weight.

## License

MIT — do whatever you'd like with this as a portfolio piece or starting point.
