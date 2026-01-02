import type { Exercise } from '../types';

// FREE TIER EXERCISES
export const freeExercises: Exercise[] = [
  {
    id: 'free-intro',
    title: 'Welcome to Tai Chi Walking',
    description: 'Discover the gentle power of Tai Chi and how it can transform your wellness journey. Learn the fundamentals and philosophy behind this ancient practice.',
    duration: 8,
    difficulty: 'beginner',
    category: 'Introduction',
    thumbnailUrl: '/thumbnails/free-intro.jpg',
    videoUrl: '/videos/intro.mp4',
    benefits: [
      'Understand Tai Chi principles',
      'Learn proper breathing techniques',
      'Set realistic wellness goals',
      'Build confidence for your journey',
    ],
    requiredLevel: 'free',
  },
  {
    id: 'free-mindful-steps',
    title: 'Mindful Steps',
    description: 'Your first gentle Tai Chi walking session. Focus on breath, posture, and mindful movement at your own pace.',
    duration: 10,
    difficulty: 'beginner',
    category: 'Walking',
    thumbnailUrl: '/thumbnails/free-mindful-steps.jpg',
    videoUrl: '/videos/mindful-steps.mp4',
    benefits: [
      'Improve balance and stability',
      'Reduce joint stiffness',
      'Calm your mind',
      'Gentle cardiovascular activity',
    ],
    requiredLevel: 'free',
  },
  {
    id: 'free-balance-basics',
    title: 'Balance Basics',
    description: 'Simple standing exercises to improve your balance and core strength. Perfect for beginners.',
    duration: 8,
    difficulty: 'beginner',
    category: 'Balance',
    thumbnailUrl: '/thumbnails/free-balance.jpg',
    videoUrl: '/videos/balance-basics.mp4',
    benefits: [
      'Reduce fall risk',
      'Strengthen core muscles',
      'Improve posture',
      'Build body awareness',
    ],
    requiredLevel: 'free',
  },
];

// BEGINNER TIER - 8 Week Program
export const beginnerExercises: Exercise[] = [
  // Week 1-2: Foundation
  {
    id: 'week1-day1',
    title: 'Week 1, Day 1: Rooting & Grounding',
    description: 'Learn the foundation of Tai Chi - connecting with the earth through proper stance and breathing.',
    duration: 15,
    difficulty: 'beginner',
    category: 'Week 1',
    thumbnailUrl: '/thumbnails/week1-day1.jpg',
    videoUrl: '/videos/week1-day1.mp4',
    benefits: [
      'Establish proper posture',
      'Learn "rooted" stance',
      'Master basic breathing',
      'Build foundation strength',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week1-day2',
    title: 'Week 1, Day 2: Weight Shifting',
    description: 'Discover the gentle art of shifting your weight from side to side with control and grace.',
    duration: 15,
    difficulty: 'beginner',
    category: 'Week 1',
    thumbnailUrl: '/thumbnails/week1-day2.jpg',
    videoUrl: '/videos/week1-day2.mp4',
    benefits: [
      'Improve balance',
      'Strengthen leg muscles',
      'Enhance coordination',
      'Build confidence',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week1-day3',
    title: 'Week 1, Day 3: Arm Movements - Clouds',
    description: 'Gentle, flowing arm movements that improve flexibility and calm the mind.',
    duration: 15,
    difficulty: 'beginner',
    category: 'Week 1',
    thumbnailUrl: '/thumbnails/week1-day3.jpg',
    videoUrl: '/videos/week1-day3.mp4',
    benefits: [
      'Increase shoulder mobility',
      'Improve upper body strength',
      'Reduce tension',
      'Enhance mind-body connection',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week1-day4',
    title: 'Week 1, Day 4: First Walking Steps',
    description: "Combine everything you've learned into your first slow, mindful walking sequence.",
    duration: 18,
    difficulty: 'beginner',
    category: 'Week 1',
    thumbnailUrl: '/thumbnails/week1-day4.jpg',
    videoUrl: '/videos/week1-day4.mp4',
    benefits: [
      'Practice integrated movement',
      'Build cardiovascular endurance',
      'Improve coordination',
      'Boost confidence',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week1-day5',
    title: 'Week 1, Day 5: Rest & Reflection',
    description: "Gentle stretching and meditation to integrate what you've learned this week.",
    duration: 12,
    difficulty: 'beginner',
    category: 'Week 1',
    thumbnailUrl: '/thumbnails/week1-day5.jpg',
    videoUrl: '/videos/week1-day5.mp4',
    benefits: [
      'Promote recovery',
      'Reduce stress',
      'Reflect on progress',
      'Prepare for next week',
    ],
    requiredLevel: 'beginner',
  },
  // Week 2: Building on Foundation
  {
    id: 'week2-day1',
    title: 'Week 2, Day 1: Deep Breathing Walk',
    description: 'Enhance your walking practice with deeper, more intentional breathing patterns.',
    duration: 18,
    difficulty: 'beginner',
    category: 'Week 2',
    thumbnailUrl: '/thumbnails/week2-day1.jpg',
    videoUrl: '/videos/week2-day1.mp4',
    benefits: [
      'Increase oxygen flow',
      'Calm nervous system',
      'Improve endurance',
      'Enhance energy',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week2-day2',
    title: 'Week 2, Day 2: Hip Opening Movements',
    description: 'Gentle exercises to improve hip mobility and reduce lower back tension.',
    duration: 17,
    difficulty: 'beginner',
    category: 'Week 2',
    thumbnailUrl: '/thumbnails/week2-day2.jpg',
    videoUrl: '/videos/week2-day2.mp4',
    benefits: [
      'Increase hip flexibility',
      'Reduce back pain',
      'Improve walking gait',
      'Strengthen core',
    ],
    requiredLevel: 'beginner',
  },
  {
    id: 'week2-day3',
    title: 'Week 2, Day 3: Balance & Stability Drills',
    description: 'Progress your balance skills with slightly more challenging standing exercises.',
    duration: 16,
    difficulty: 'beginner',
    category: 'Week 2',
    thumbnailUrl: '/thumbnails/week2-day3.jpg',
    videoUrl: '/videos/week2-day3.mp4',
    benefits: [
      'Further reduce fall risk',
      'Build leg strength',
      'Improve proprioception',
      'Boost confidence',
    ],
    requiredLevel: 'beginner',
  },
  // Continue with more weeks...
  {
    id: 'week3-comprehensive',
    title: 'Week 3: Integration Flow',
    description: 'A complete 20-minute session integrating all skills from weeks 1-2.',
    duration: 20,
    difficulty: 'beginner',
    category: 'Week 3',
    thumbnailUrl: '/thumbnails/week3-integration.jpg',
    videoUrl: '/videos/week3.mp4',
    benefits: [
      'Practice full integration',
      'Build stamina',
      'Reinforce learning',
      'Prepare for advancement',
    ],
    requiredLevel: 'beginner',
  },
];

// INTERMEDIATE TIER
export const intermediateExercises: Exercise[] = [
  {
    id: 'int-advanced-walk',
    title: 'Advanced Walking Form',
    description: 'Take your Tai Chi walking to the next level with longer, more complex sequences.',
    duration: 28,
    difficulty: 'intermediate',
    category: 'Advanced Walking',
    thumbnailUrl: '/thumbnails/advanced-walk.jpg',
    videoUrl: '/videos/advanced-walk.mp4',
    benefits: [
      'Master complex transitions',
      'Build significant endurance',
      'Deepen mind-body connection',
      'Accelerate weight loss',
    ],
    requiredLevel: 'intermediate',
  },
  {
    id: 'int-hip-mobility',
    title: 'Deep Hip Mobility Work',
    description: 'Targeted movements to dramatically improve hip flexibility and range of motion.',
    duration: 25,
    difficulty: 'intermediate',
    category: 'Mobility',
    thumbnailUrl: '/thumbnails/hip-mobility.jpg',
    videoUrl: '/videos/deep-hip.mp4',
    benefits: [
      'Significant flexibility gains',
      'Reduce chronic hip pain',
      'Improve walking mechanics',
      'Enhance daily mobility',
    ],
    requiredLevel: 'intermediate',
  },
  {
    id: 'int-knee-strength',
    title: 'Knee Strengthening Sequence',
    description: 'Gentle but effective exercises to build strength around the knee joint.',
    duration: 22,
    difficulty: 'intermediate',
    category: 'Strengthening',
    thumbnailUrl: '/thumbnails/knee-strength.jpg',
    videoUrl: '/videos/knee-strength.mp4',
    benefits: [
      'Protect knee joints',
      'Reduce knee pain',
      'Build surrounding muscles',
      'Prevent future injury',
    ],
    requiredLevel: 'intermediate',
  },
  {
    id: 'int-balance-challenge',
    title: 'Advanced Balance Challenges',
    description: 'Progressive balance drills that safely push your limits.',
    duration: 30,
    difficulty: 'intermediate',
    category: 'Balance',
    thumbnailUrl: '/thumbnails/balance-challenge.jpg',
    videoUrl: '/videos/balance-challenge.mp4',
    benefits: [
      'Maximize fall prevention',
      'Build exceptional stability',
      'Enhance proprioception',
      'Increase confidence',
    ],
    requiredLevel: 'intermediate',
  },
  {
    id: 'int-stress-relief',
    title: 'Tai Chi for Stress Reduction',
    description: 'Slow, meditative movements specifically designed to calm the nervous system.',
    duration: 26,
    difficulty: 'intermediate',
    category: 'Mindfulness',
    thumbnailUrl: '/thumbnails/stress-reduction.jpg',
    videoUrl: '/videos/stress-relief.mp4',
    benefits: [
      'Lower cortisol levels',
      'Reduce anxiety',
      'Improve sleep quality',
      'Enhance mental clarity',
    ],
    requiredLevel: 'intermediate',
  },
];

// EXPERT TIER
export const expertExercises: Exercise[] = [
  {
    id: 'exp-mastery-flow',
    title: 'Mastery Flow - 60 Minutes',
    description: 'The ultimate Tai Chi walking experience. A complete 60-minute flowing sequence.',
    duration: 60,
    difficulty: 'expert',
    category: 'Mastery',
    thumbnailUrl: '/thumbnails/mastery-flow.jpg',
    videoUrl: '/videos/mastery-flow.mp4',
    benefits: [
      'Achieve flow state',
      'Maximum calorie burn',
      'Deep meditation',
      'Total body conditioning',
    ],
    requiredLevel: 'expert',
  },
  {
    id: 'exp-creative-expression',
    title: 'Creative Expression & Freeform',
    description: 'Learn to create your own Tai Chi sequences and express yourself through movement.',
    duration: 45,
    difficulty: 'expert',
    category: 'Creative',
    thumbnailUrl: '/thumbnails/creative-expression.jpg',
    videoUrl: '/videos/creative.mp4',
    benefits: [
      'Develop personal style',
      'Express creativity',
      'Deepen understanding',
      'Build teaching skills',
    ],
    requiredLevel: 'expert',
  },
  {
    id: 'exp-meditation-deep',
    title: 'Deep Meditation Journey',
    description: 'Advanced meditation practices integrated with subtle Tai Chi movements.',
    duration: 50,
    difficulty: 'expert',
    category: 'Meditation',
    thumbnailUrl: '/thumbnails/deep-meditation.jpg',
    videoUrl: '/videos/deep-meditation.mp4',
    benefits: [
      'Achieve profound calm',
      'Access deep states',
      'Enhance self-awareness',
      'Spiritual growth',
    ],
    requiredLevel: 'expert',
  },
  {
    id: 'exp-power-walk',
    title: 'Power Tai Chi Walk',
    description: 'High-intensity (but still low-impact) Tai Chi walking for maximum fitness benefits.',
    duration: 42,
    difficulty: 'expert',
    category: 'Fitness',
    thumbnailUrl: '/thumbnails/power-walk.jpg',
    videoUrl: '/videos/power-walk.mp4',
    benefits: [
      'Maximum weight loss',
      'Build significant strength',
      'Boost cardiovascular health',
      'Increase energy levels',
    ],
    requiredLevel: 'expert',
  },
  {
    id: 'exp-teaching-others',
    title: 'Sharing Tai Chi With Others',
    description: 'Learn how to safely guide friends and family through basic Tai Chi movements.',
    duration: 38,
    difficulty: 'expert',
    category: 'Teaching',
    thumbnailUrl: '/thumbnails/teaching-tai-chi.jpg',
    videoUrl: '/videos/teaching.mp4',
    benefits: [
      'Develop teaching skills',
      'Share wellness with loved ones',
      'Deepen your own practice',
      'Build community',
    ],
    requiredLevel: 'expert',
  },
];

// Export all exercises grouped by tier
export const allExercises = {
  free: freeExercises,
  beginner: beginnerExercises,
  intermediate: intermediateExercises,
  expert: expertExercises,
};

// Get exercises for a specific tier
export const getExercisesForTier = (tier: string) => {
  return allExercises[tier as keyof typeof allExercises] || [];
};

// Get all available exercises for user based on their subscription
export const getAvailableExercises = (tier: string) => {
  const tiers = ['free', 'beginner', 'intermediate', 'expert'];
  const userTierIndex = tiers.indexOf(tier);

  let available: Exercise[] = [];
  for (let i = 0; i <= userTierIndex; i++) {
    available = [...available, ...getExercisesForTier(tiers[i])];
  }

  return available;
};
