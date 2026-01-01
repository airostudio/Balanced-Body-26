// Quiz Question Types
export type QuestionType = 'single-choice' | 'multi-choice' | 'input' | 'info';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  description?: string;
  options?: QuizOption[];
  inputType?: 'text' | 'number' | 'height' | 'weight';
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
  infoContent?: {
    title: string;
    body: string;
    image?: string;
    bullets?: string[];
    stats?: string;
  };
}

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  value?: string | number;
}

// User Profile Types
export interface UserProfile {
  email?: string;
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  heightUnit?: 'cm' | 'ft';
  currentWeight?: number;
  targetWeight?: number;
  weightUnit?: 'kg' | 'lb';
  trainingFrequency?: string;
  goals?: string[];
  mobilityIssues?: string[];
  activityLevel?: string;
  quizAnswers: Record<number, string | number | string[]>;
}

// Subscription Types
export type SubscriptionTier = 'free' | 'beginner' | 'intermediate' | 'expert';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  currency: string;
  interval: 'month';
  introPrice?: number;
  introDuration?: number;
  features: string[];
  highlighted?: boolean;
  stripePriceId?: string;
}

// Exercise Types
export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'expert';
  category: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  benefits?: string[];
  requiredLevel: SubscriptionTier;
}

// Progress Tracking Types
export interface WorkoutSession {
  id: string;
  exerciseId: string;
  date: Date;
  duration: number;
  completed: boolean;
  notes?: string;
}

export interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
  weightHistory: WeightEntry[];
  achievements: Achievement[];
}

export interface WeightEntry {
  date: Date;
  weight: number;
  unit: 'kg' | 'lb';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// Community Types
export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies: number;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  likes: number;
}
