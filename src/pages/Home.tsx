import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Balanced Body
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-2">
            Tai Chi Weight Loss for Seniors
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A safe, effective, and engaging Tai Chi walking program designed for older adults
            seeking sustainable weight loss, improved balance, and enhanced well-being.
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl shadow-2xl p-12 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <span className="text-8xl mb-4 block">🧘‍♂️</span>
              <p className="text-2xl font-semibold text-gray-700">
                Gentle Movement, Powerful Results
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-20">
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary text-xl px-12 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            Start Your Free Assessment
            <svg
              className="inline-block ml-2 w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          <p className="text-gray-600 mt-4">Takes only 5 minutes • Personalized for you</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Improve Balance</h3>
            <p className="text-gray-600">
              Reduce fall risk and move with confidence through gentle, controlled movements
              specifically designed for seniors.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📉</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lose Weight Safely</h3>
            <p className="text-gray-600">
              Achieve sustainable weight loss without high-impact stress on your joints.
              Low-impact, high effectiveness.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">😌</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reduce Stress</h3>
            <p className="text-gray-600">
              Calm your mind and body with mindful Tai Chi movements that lower cortisol and
              boost mental clarity.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Tai Chi Walking?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect for Seniors</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Low-impact and joint-friendly</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Adaptable to your fitness level</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Safe for those with mobility concerns</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Practice anywhere, anytime</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proven Results</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Reduces fall risk by up to 43%</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Improves cardiovascular health</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Enhances flexibility and strength</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Clinically proven for pain relief</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of seniors who have discovered the gentle power of Tai Chi walking.
            Start your personalized program today.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary text-xl px-12 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};
