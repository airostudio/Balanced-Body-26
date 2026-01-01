import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { useStore } from '../store/useStore';
import type { SubscriptionTier } from '../types';

export const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const { setSubscriptionTier } = useStore();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('beginner');

  const handleSelectPlan = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
  };

  const handleContinue = () => {
    setSubscriptionTier(selectedTier);
    if (selectedTier === 'free') {
      navigate('/dashboard');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Choose Your Path to Wellness
          </h1>
          <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
            Start your personalized Tai Chi journey with a plan that fits your goals and lifestyle
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                selectedTier === plan.id
                  ? 'ring-4 ring-primary-500 transform scale-105'
                  : 'hover:shadow-xl'
              } ${plan.highlighted ? 'border-4 border-primary-400' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.highlighted && (
                <div className="bg-primary-500 text-white text-center py-2 font-semibold text-sm">
                  MOST POPULAR
                </div>
              )}

              {plan.introPrice && (
                <div className="bg-secondary-500 text-white text-center py-2 font-semibold text-sm">
                  SPECIAL OFFER
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                <div className="mb-4">
                  {plan.introPrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary-600">
                          ${plan.introPrice}
                        </span>
                        <span className="text-gray-500">/{plan.interval}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        First {plan.introDuration} weeks, then ${plan.price}/{plan.interval}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500">/{plan.interval}</span>
                      )}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan.id);
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    selectedTier === plan.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedTier === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Balanced Body Tai Chi?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚖️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Improved Balance</h3>
                <p className="text-sm text-gray-600">
                  Reduce fall risk and move with confidence through gentle, flowing movements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📉</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Sustainable Weight Loss</h3>
                <p className="text-sm text-gray-600">
                  Lose weight naturally without high-impact stress on your joints
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">😌</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Stress Reduction</h3>
                <p className="text-sm text-gray-600">
                  Lower cortisol levels and boost mental clarity through mindful movement
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Supportive Community</h3>
                <p className="text-sm text-gray-600">
                  Connect with like-minded seniors on the same wellness journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleContinue}
            className="btn-primary px-12 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Continue with {subscriptionPlans.find((p) => p.id === selectedTier)?.name}
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
          <p className="text-sm text-gray-500 mt-4">
            Cancel anytime. No long-term commitments required.
          </p>
        </div>
      </div>
    </div>
  );
};
