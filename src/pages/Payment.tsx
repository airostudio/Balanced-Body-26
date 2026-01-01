import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { subscriptionPlans } from '../data/subscriptionPlans';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { subscriptionTier, setAuthenticated } = useStore();
  const [processing, setProcessing] = useState(false);

  const selectedPlan = subscriptionPlans.find((p) => p.id === subscriptionTier);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setAuthenticated(true);
      navigate('/dashboard');
    }, 2000);
  };

  if (!selectedPlan || selectedPlan.price === 0) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">You're one step away from transforming your wellness</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h3>

              {selectedPlan.introPrice ? (
                <>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary-600">
                      ${selectedPlan.introPrice}
                    </span>
                    <span className="text-gray-600">for first {selectedPlan.introDuration} weeks</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Then ${selectedPlan.price}/{selectedPlan.interval} after trial
                  </p>
                </>
              ) : (
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">${selectedPlan.price}</span>
                  <span className="text-gray-600">/{selectedPlan.interval}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                <ul className="space-y-2">
                  {selectedPlan.features.slice(0, 5).map((feature, index) => (
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
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel anytime, no long-term commitment</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant access to all features</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    processing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${selectedPlan.introPrice ? `$${selectedPlan.introPrice}` : `$${selectedPlan.price}`}`
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming your subscription, you agree to our Terms of Service and Privacy Policy.
                Your subscription will auto-renew until canceled.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v16H4z"/>
                </svg>
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v16H4z"/>
                </svg>
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v16H4z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Secured by Stripe • 256-bit SSL Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
