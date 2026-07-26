// ---------- User & Auth ----------
export interface DevUser {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
  role: string;
  joinedAt: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
}

// ---------- Goals ----------
export type GoalPriority = 'low' | 'medium' | 'high';
export type GoalCategory = 'career' | 'learning' | 'health' | 'project' | 'personal';
export type GoalStatus = 'not-started' | 'in-progress' | 'completed';

export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: GoalPriority;
  category: GoalCategory;
  deadline: string | null;
  progress: number;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export type GoalDraft = Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
  status?: GoalStatus;
};

// ---------- Learning Tracker ----------
export type LearningType = 'course' | 'video' | 'book';
export type LearningStatus = 'planned' | 'in-progress' | 'completed';

export interface LearningItem {
  id: string;
  title: string;
  type: LearningType;
  provider: string;
  status: LearningStatus;
  totalHours: number;
  hoursSpent: number;
  completion: number;
  startedAt: string;
  completedAt: string | null;
  tags: string[];
  notes: string;
}

export type LearningDraft = Omit<LearningItem, 'id' | 'completion' | 'completedAt'>;

// ---------- Notes ----------
export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  pinned: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type NoteDraft = Pick<Note, 'title' | 'content' | 'folder' | 'tags'>;

// ---------- Analytics / activity ----------
export interface ActivityDay {
  date: string;
  codingMinutes: number;
  studyMinutes: number;
  goalsCompleted: number;
}

// ---------- UI ----------
export type ThemeMode = 'dark' | 'light';
