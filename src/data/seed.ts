import type { ActivityDay, Goal, LearningItem, Note } from '@/types';
import { daysAgoIso, isoToday } from '@/utils/date';
import { generateId } from '@/utils/id';

const today = isoToday();

export function seedGoals(): Goal[] {
  const now = new Date().toISOString();
  return [
    {
      id: generateId('goal'),
      title: 'Ship DevVerse v1.0',
      description: 'Finish Phase 1 modules and deploy to production.',
      priority: 'high',
      category: 'project',
      deadline: new Date(Date.now() + 6 * 86400000).toISOString(),
      progress: 65,
      status: 'in-progress',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId('goal'),
      title: 'Master TypeScript generics',
      description: 'Work through advanced generics and utility types.',
      priority: 'medium',
      category: 'learning',
      deadline: new Date(Date.now() + 12 * 86400000).toISOString(),
      progress: 40,
      status: 'in-progress',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId('goal'),
      title: 'Morning run streak — 30 days',
      description: 'Build a consistent cardio habit before work.',
      priority: 'low',
      category: 'health',
      deadline: new Date(Date.now() + 20 * 86400000).toISOString(),
      progress: 23,
      status: 'in-progress',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId('goal'),
      title: 'Update portfolio site',
      description: 'Add DevVerse case study and refresh project cards.',
      priority: 'medium',
      category: 'career',
      deadline: null,
      progress: 100,
      status: 'completed',
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function seedLearning(): LearningItem[] {
  const now = new Date().toISOString();
  return [
    {
      id: generateId('lrn'),
      title: 'Advanced React Patterns',
      type: 'course',
      provider: 'Frontend Masters',
      status: 'in-progress',
      totalHours: 12,
      hoursSpent: 7,
      completion: 58,
      startedAt: now,
      completedAt: null,
      tags: ['react', 'patterns'],
      notes: 'Great section on compound components.',
    },
    {
      id: generateId('lrn'),
      title: 'Designing Data-Intensive Applications',
      type: 'book',
      provider: 'O\u2019Reilly',
      status: 'in-progress',
      totalHours: 20,
      hoursSpent: 9,
      completion: 45,
      startedAt: now,
      completedAt: null,
      tags: ['systems', 'databases'],
      notes: '',
    },
    {
      id: generateId('lrn'),
      title: 'Zustand Deep Dive',
      type: 'video',
      provider: 'YouTube',
      status: 'completed',
      totalHours: 2,
      hoursSpent: 2,
      completion: 100,
      startedAt: now,
      completedAt: now,
      tags: ['state-management'],
      notes: 'Applied directly to DevVerse store architecture.',
    },
  ];
}

export function seedNotes(): Note[] {
  const now = new Date().toISOString();
  return [
    {
      id: generateId('note'),
      title: 'DevVerse architecture notes',
      content: `# Architecture

- **State**: Zustand slices, persisted to localStorage
- **Styling**: Tailwind + custom glass utility classes
- **Motion**: Framer Motion for orchestrated transitions

\`\`\`ts
const useStore = create(persist(...))
\`\`\`

> Keep components dumb, keep stores smart.`,
      folder: 'Engineering',
      pinned: true,
      tags: ['architecture', 'react'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId('note'),
      title: 'Interview prep — system design',
      content: `## Topics to review

1. Load balancing strategies
2. Caching layers (CDN, Redis)
3. Database sharding

Practice whiteboarding twice this week.`,
      folder: 'Career',
      pinned: false,
      tags: ['interview'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId('note'),
      title: 'Book highlights — Deep Work',
      content: `Deep work is the ability to focus without distraction on a cognitively demanding task.

- Batch shallow work into fixed windows
- Protect 2-hour focus blocks daily`,
      folder: 'Reading',
      pinned: false,
      tags: ['focus', 'books'],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function seedActivity(): ActivityDay[] {
  const days: ActivityDay[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = daysAgoIso(i);
    const weekday = new Date(date).getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const base = isWeekend ? 60 : 140;
    days.push({
      date,
      codingMinutes: Math.max(0, Math.round(base + (Math.sin(i / 2) * 40) + (Math.random() * 30 - 15))),
      studyMinutes: Math.max(0, Math.round((isWeekend ? 80 : 45) + (Math.random() * 25))),
      goalsCompleted: Math.random() > 0.75 ? 1 : 0,
    });
  }
  // ensure today has data
  if (days[days.length - 1].date !== today) {
    days.push({ date: today, codingMinutes: 90, studyMinutes: 30, goalsCompleted: 0 });
  }
  return days;
}
