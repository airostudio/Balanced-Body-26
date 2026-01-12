import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { subscriptionTier } = useStore();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = subscriptionPlans.find((p) => p.id === subscriptionTier);

  const handleStripeCheckout = async () => {
    if (!selectedPlan?.stripePriceId) {
      setError('Stripe price ID not configured for this plan');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Call your backend to create a Stripe Checkout session
      // Update this URL to match your serverless function endpoint
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPlan.stripePriceId,
          planName: selectedPlan.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      // Redirect to Stripe Checkout
      // Modern approach: use the session URL if provided
      if (url) {
        window.location.href = url;
      } else {
        // Fallback: construct checkout URL from session ID
        window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use Stripe Checkout
    await handleStripeCheckout();
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
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-red-800 mb-1">Payment Error</h3>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800 mb-1">Secure Stripe Checkout</h3>
                    <p className="text-sm text-blue-700">
                      Click "Continue to Payment" to be redirected to Stripe's secure checkout page.
                    </p>
                  </div>
                </div>
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
                      Redirecting to Stripe...
                    </span>
                  ) : (
                    'Continue to Payment'
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
