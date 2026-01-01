import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, SubscriptionTier, ProgressData } from '../types';

interface AppState {
  // Quiz state
  currentQuestionIndex: number;
  quizAnswers: Record<number, string | number | string[]>;
  userProfile: UserProfile;

  // Subscription state
  subscriptionTier: SubscriptionTier;

  // Progress state
  progress: ProgressData;

  // UI state
  isAuthenticated: boolean;

  // Actions
  setCurrentQuestionIndex: (index: number) => void;
  setQuizAnswer: (questionId: number, answer: string | number | string[]) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  resetQuiz: () => void;
  setAuthenticated: (isAuth: boolean) => void;
  updateProgress: (progress: Partial<ProgressData>) => void;
}

const initialProgress: ProgressData = {
  currentStreak: 0,
  longestStreak: 0,
  totalSessions: 0,
  totalMinutes: 0,
  weightHistory: [],
  achievements: [],
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      currentQuestionIndex: 0,
      quizAnswers: {},
      userProfile: {
        quizAnswers: {},
      },
      subscriptionTier: 'free',
      progress: initialProgress,
      isAuthenticated: false,

      // Actions
      setCurrentQuestionIndex: (index) =>
        set({ currentQuestionIndex: index }),

      setQuizAnswer: (questionId, answer) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [questionId]: answer },
          userProfile: {
            ...state.userProfile,
            quizAnswers: { ...state.userProfile.quizAnswers, [questionId]: answer },
          },
        })),

      updateUserProfile: (profile) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        })),

      setSubscriptionTier: (tier) =>
        set({ subscriptionTier: tier }),

      resetQuiz: () =>
        set({
          currentQuestionIndex: 0,
          quizAnswers: {},
          userProfile: { quizAnswers: {} },
        }),

      setAuthenticated: (isAuth) =>
        set({ isAuthenticated: isAuth }),

      updateProgress: (newProgress) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgress },
        })),
    }),
    {
      name: 'balanced-body-storage',
      partialize: (state) => ({
        quizAnswers: state.quizAnswers,
        userProfile: state.userProfile,
        subscriptionTier: state.subscriptionTier,
        progress: state.progress,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
