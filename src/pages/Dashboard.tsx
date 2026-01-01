import React from 'react';
import { useStore } from '../store/useStore';
import { subscriptionPlans } from '../data/subscriptionPlans';

export const Dashboard: React.FC = () => {
  const { userProfile, subscriptionTier, progress } = useStore();

  const currentPlan = subscriptionPlans.find((p) => p.id === subscriptionTier);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}!
              </h1>
              <p className="text-gray-600 mt-1">
                Your {currentPlan?.name} • Continue your wellness journey
              </p>
            </div>
            <button className="btn-secondary">
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{progress.currentStreak} days</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{progress.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Minutes</p>
                <p className="text-2xl font-bold text-gray-900">{progress.totalMinutes}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{progress.achievements.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Practice */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Practice</h2>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Morning Flow</h3>
                    <p className="text-gray-600">15 minutes • Beginner Level</p>
                  </div>
                  <span className="text-4xl">🌅</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A gentle morning routine to wake up your body and mind. Focus on balance and breathing.
                </p>
                <button className="btn-primary w-full">
                  Start Session
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Programs</h2>
              <div className="space-y-4">
                {subscriptionTier === 'free' ? (
                  <div className="text-center py-8">
                    <span className="text-6xl mb-4 block">🔒</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Unlock Full Access
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upgrade to access our complete library of Tai Chi programs
                    </p>
                    <button className="btn-primary">
                      View Plans
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⚖️</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Balance Basics</h3>
                        <p className="text-sm text-gray-600">8 sessions • Week 1-2</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🧘</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Mindful Movement</h3>
                        <p className="text-sm text-gray-600">10 sessions • Week 3-4</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Goals */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weight Progress</h3>
              {userProfile.currentWeight && userProfile.targetWeight ? (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current</span>
                      <span className="font-semibold">{userProfile.currentWeight} {userProfile.weightUnit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target</span>
                      <span className="font-semibold">{userProfile.targetWeight} {userProfile.weightUnit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">To Go</span>
                      <span className="font-semibold text-primary-600">
                        {Math.abs(userProfile.currentWeight - userProfile.targetWeight)} {userProfile.weightUnit}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-500 h-3 rounded-full"
                      style={{ width: '10%' }}
                    />
                  </div>
                  <button className="btn-secondary w-full mt-4 text-sm">
                    Log Weight
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Set your weight goals to track progress</p>
                  <button className="btn-secondary text-sm">
                    Set Goals
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
              {progress.achievements.length > 0 ? (
                <div className="space-y-3">
                  {progress.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-4xl mb-2 block">🏆</span>
                  <p className="text-gray-600 text-sm">
                    Complete your first session to earn achievements!
                  </p>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with fellow practitioners and share your journey
              </p>
              <button className="btn-secondary w-full">
                Visit Forum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
