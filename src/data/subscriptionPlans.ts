import type { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Level',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      '"What is Tai Chi Walking?" introductory video',
      'Basic posture and foundational principles guide',
      '2 sample Tai Chi walking sessions (5-10 min)',
      'Community forum (read-only)',
      'Basic progress tracking',
    ],
  },
  {
    id: 'beginner',
    name: 'Beginner Level',
    price: 9.99,
    currency: 'USD',
    interval: 'month',
    introPrice: 1.99,
    introDuration: 4, // 4 weeks
    highlighted: true,
    features: [
      'Comprehensive 8-week Tai Chi Walking Course',
      'Daily guided sessions (15-20 minutes)',
      'Weight loss tracking tools with charts',
      'Healthy eating tips for seniors',
      'Full community forum access',
      'Basic analytics and progress reports',
      'Educational modules on Tai Chi philosophy',
    ],
    stripePriceId: 'price_beginner_monthly', // Replace with actual Stripe price ID
  },
  {
    id: 'intermediate',
    name: 'Intermediate Level',
    price: 8.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Beginner Level',
      'Advanced Tai Chi walking forms (25-35 min)',
      'Specific focus modules (hip mobility, knee strength)',
      'Advanced balance drills',
      'Sample meal plans tailored for seniors',
      'Monthly themed challenges',
      'Personalized recommendations',
      'Exclusive expert interviews',
    ],
    stripePriceId: 'price_intermediate_monthly', // Replace with actual Stripe price ID
  },
  {
    id: 'expert',
    name: 'Expert Level',
    price: 12.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Intermediate Level',
      'Mastering Tai Chi walking routines (40-60 min)',
      'Creative combinations & freeform practice',
      'Advanced meditation & mindfulness tracks',
      'Live Q&A sessions with experts',
      'One-on-one virtual check-ins (15 min/quarter)',
      'Premium early access to new features',
      'Customizable workout plans',
      'Priority support',
    ],
    stripePriceId: 'price_expert_monthly', // Replace with actual Stripe price ID
  },
];
