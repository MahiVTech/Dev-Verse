# 🚀 DevVerse — The Developer Operating System

<p align="center">
  <strong>A beautiful, frontend-only productivity dashboard built for developers.</strong><br>
  Track goals, learning, notes, analytics, and daily progress — all with a modern glassmorphic UI and zero backend.
</p>

<p align="center">
  <a href="https://your-live-demo.vercel.app"><img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-00E5FF?style=for-the-badge" /></a>
  <a href="https://github.com/yourusername/devverse"><img src="https://img.shields.io/badge/GitHub-Repository-6C63FF?style=for-the-badge&logo=github" /></a>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square\&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square\&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square\&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Phase_1_Complete-00E5FF?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-success?style=flat-square)

</p>

---

# ✨ Live Website

### 🌍 https://devverse-seven.vercel.app/

> Replace the URL above with your deployed Vercel website.

---

# 📸 Preview

<p align="center">
  <em>A glimpse into the DevVerse experience.</em>
</p>

<table align="center">
<tr>
<td width="50%" align="center">

### 🏠 Landing Page

<img width="1915" height="909" alt="Landing Page" src="https://github.com/user-attachments/assets/ff3121ad-d738-4cff-bf19-32b0d0e15e3a" />

</td>

<td width="50%" align="center">

### 📊 Dashboard

<img width="1915" height="913" alt="Dashboard" src="https://github.com/user-attachments/assets/c6ca1057-855d-4309-a5d6-837aef9d8d4d" />

</td>
</tr>

<tr>
<td width="50%" align="center">

<tr>
<td width="50%" align="center">

### 🎯 Goals

<img width="1917" height="904" alt="Screenshot 2026-07-26 141655" src="https://github.com/user-attachments/assets/2519b9c0-198d-4f72-ac52-63e444913f29"  />

</td>

<td width="50%" align="center">

### 📈 Analytics

<img width="1914" height="906" alt="Analytics" src="https://github.com/user-attachments/assets/d5c710e9-102f-4206-8e7b-6e5278336fd5" />

</td>
</tr>
</table>

---

# 🌌 About DevVerse

**DevVerse** is an elegant all-in-one developer dashboard designed to help developers stay organised, focused, and productive.

Instead of juggling multiple productivity apps, DevVerse combines everything into one beautiful experience.

✨ No backend.

✨ No database.

✨ No accounts.

✨ No tracking.

Everything is stored locally in your browser using **localStorage**, making the application fast, private, and completely frontend-driven.

---

# ⚡ Features

## 🏠 Landing Experience

* Animated Hero Section
* Typewriter Text Animation
* Orbiting Module Illustration
* Smooth Scroll Animations
* Testimonials
* Feature Showcase
* Modern Glassmorphism UI

---

## 🔐 Authentication

Frontend-only authentication flow including:

* Login
* Register
* Protected Routes
* Persistent Sessions
* Mock User Storage

> **Note:** Authentication is simulated using browser localStorage and is intended only for demonstration purposes.

---

## 📊 Dashboard

A personalised productivity overview featuring:

* Live Statistics
* Weekly Activity
* Focus Timer
* Goal Progress
* Learning Summary
* Pinned Notes
* Quick Actions
* Responsive Widgets

---

## 🎯 Goal Management

* Create Goals
* Edit Goals
* Delete Goals
* Categories
* Priorities
* Deadlines
* Progress Slider
* XP Rewards
* Smart Filtering

---

## 📚 Learning Tracker

Track everything you're learning.

Supports:

* Courses
* Books
* Videos
* Articles

Features:

* Hours Logged
* Progress Tracking
* Completion Rings
* Filters
* Learning Analytics

---

## 📝 Smart Notes

Markdown-powered note taking.

Features include:

* Live Markdown Preview
* Folder Organisation
* Search
* Pin Notes
* Responsive Editor

---

## 📈 Analytics

Interactive visualisations powered by **Recharts**.

Displays:

* Weekly Activity
* Goal Completion
* Learning Progress
* XP Growth
* Productivity Insights

---

## 👤 Profile

Gamified productivity.

Includes:

* XP System
* Levels
* Daily Streak
* Achievement Badges

---

## ⚙️ Settings

* Theme Toggle
* Export Data (JSON)
* Reset All Data
* Keyboard Shortcuts

---

## ⌨️ Productivity Features

* Command Palette (Ctrl/Cmd + K)
* Dark Mode
* Light Mode
* Toast Notifications
* Mobile Navigation
* Responsive Sidebar
* Beautiful Empty States
* Custom 404 Page

---

# 🚧 Coming Soon

The following modules are fully routed with polished placeholder screens and will be completed in future phases:

* 📅 Daily Planner
* 🐙 GitHub Dashboard
* 💻 LeetCode Tracker
* 🤖 AI Assistant

---

# 🛠 Tech Stack

| Category         | Technology      |
| ---------------- | --------------- |
| Framework        | React 19        |
| Language         | TypeScript      |
| Bundler          | Vite            |
| Styling          | Tailwind CSS    |
| Animations       | Framer Motion   |
| Charts           | Recharts        |
| Routing          | React Router    |
| State Management | Zustand         |
| Markdown         | React Markdown  |
| Icons            | Lucide React    |
| Notifications    | React Hot Toast |

---

# 📂 Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── constants/
├── data/
├── hooks/
├── layouts/
├── pages/
├── store/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/yourusername/devverse.git
```

Move into the project

```bash
cd devverse
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Production build

```bash
npm run build
```

Preview production

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# 🌍 Deployment

## Vercel

Deploy instantly.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Framework Preset → **Vite**
4. Build Command

```bash
npm run build
```

Output Directory

```text
dist
```

No environment variables are required.

---

## GitHub Pages

Install:

```bash
npm i -D gh-pages
```

Configure Vite

```ts
base: "/devverse/"
```

Add deploy script

```json
"deploy": "npm run build && gh-pages -d dist"
```

Deploy

```bash
npm run deploy
```

---

# 📦 Performance

Current production bundle is approximately **290 KB (gzipped)**.

Potential future improvements:

* Route-based Code Splitting
* React.lazy()
* Vendor Chunk Optimisation
* Lazy-loaded Analytics
* Dynamic Imports

---

# 🔒 Authentication Disclaimer

This project does **not** include a backend.

User accounts and credentials are stored in browser localStorage solely to demonstrate authentication flows.

**Do not use this implementation in production.**

---

# 🤝 Contributing

Contributions, ideas, feature requests, and pull requests are always welcome.

If you enjoy this project, consider giving it a ⭐ to support future development.

---

# 📜 License

Licensed under the **MIT License**.

Feel free to use DevVerse as inspiration, a portfolio project, or a foundation for your own developer productivity platform.

---

<p align="center">

### ⭐ If you like this project, don't forget to star the repository!

Made with ❤️ using **React**, **TypeScript**, and **Tailwind CSS**

</p>
