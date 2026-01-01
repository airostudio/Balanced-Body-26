# Balanced Body - Tai Chi Weight Loss for Seniors

A modern, mobile-first web application designed to help seniors achieve sustainable weight loss, improved balance, and enhanced well-being through Tai Chi walking exercises.

## Features

### 🎯 Personalized Onboarding
- **34-question comprehensive assessment** covering:
  - Fitness goals and current activity level
  - Health conditions and mobility concerns
  - Personal preferences and schedule
  - Physical measurements (height, weight)
  - Dietary restrictions and stress levels
  - Technology comfort and commitment level

### 💳 Flexible Subscription Tiers
1. **Free Level** - Introduction to Tai Chi basics
2. **Beginner Level ($9.99/month)** - Special intro: $1.99 for first 4 weeks
   - 8-week comprehensive Tai Chi course
   - Daily guided sessions (15-20 min)
   - Weight loss tracking tools
   - Healthy eating tips
3. **Intermediate Level ($8.99/month)**
   - Advanced forms and balance drills
   - Sample meal plans for seniors
   - Monthly challenges
4. **Expert Level ($12.99/month)**
   - Mastering routines (40-60 min)
   - Live Q&A sessions
   - One-on-one virtual check-ins
   - Premium early access

### 📊 Progress Tracking Dashboard
- Current streak and total sessions
- Weight loss progress with charts
- Achievement badges and milestones
- Personalized workout recommendations

### 🎨 Modern UI/UX
- Mobile-first responsive design
- Accessible interface for seniors
- Large, easy-to-read text and buttons
- Smooth animations and transitions
- Progress indicators throughout quiz

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form
- **Payment Processing**: Stripe (integration ready)
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── InfoScreen.tsx
│   ├── InputQuestion.tsx
│   ├── MultiChoiceQuestion.tsx
│   ├── ProgressBar.tsx
│   └── SingleChoiceQuestion.tsx
├── data/               # Static data and configuration
│   ├── quizQuestions.ts
│   └── subscriptionPlans.ts
├── pages/              # Main application pages
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   ├── Payment.tsx
│   ├── Quiz.tsx
│   └── Subscription.tsx
├── store/              # State management
│   └── useStore.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Balanced-Body-26
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_BASE_URL=your_api_base_url
```

## Key Features Implementation

### Quiz Flow
The quiz uses a multi-step form approach with:
- Progress tracking (current question / total)
- Multiple question types (single choice, multi-choice, input, info)
- Form validation
- State persistence in localStorage
- Smooth transitions between questions

### Subscription Model
- Tiered pricing with clear feature differentiation
- Special introductory pricing for beginners
- Stripe-ready payment integration
- Automatic tier-based feature access

### User Experience
- Mobile-first responsive design
- Large touch targets for senior users
- Clear visual hierarchy
- Helpful tips and explanations
- Motivational content throughout

## Future Enhancements

- [ ] Complete Stripe payment integration
- [ ] Backend API for user authentication
- [ ] Exercise video library with streaming
- [ ] Community forum with real-time chat
- [ ] Push notifications for workout reminders
- [ ] Integration with health tracking devices
- [ ] Personalized meal planning feature
- [ ] Live video sessions with instructors
- [ ] Social sharing and achievements
- [ ] Mobile app versions (iOS/Android)

## Design Philosophy

This application is specifically designed for older adults (55+) with:
- **Low-impact focus**: All exercises are gentle and joint-friendly
- **Safety first**: Adaptable to individual mobility levels
- **Clear communication**: Simple, jargon-free language
- **Visual clarity**: High contrast, large fonts
- **Encouraging tone**: Positive, supportive messaging
- **Accessibility**: Following WCAG guidelines

## Health Disclaimer

This application provides general wellness information and is not intended as medical advice. Users should consult with healthcare providers before starting any new exercise program, especially those with pre-existing conditions.

## License

Copyright © 2026 Balanced Body. All rights reserved.

## Support

For support, email support@balancedbody.com or visit our help center.

---

**Built with ❤️ for seniors seeking wellness through gentle movement**
