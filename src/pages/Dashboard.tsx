import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { getAvailableExercises } from '../data/exercises';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, subscriptionTier, progress } = useStore();

  const currentPlan = subscriptionPlans.find((p) => p.id === subscriptionTier);
  const availableExercises = getAvailableExercises(subscriptionTier);
  const todayExercise = availableExercises[0]; // First available exercise

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-5 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}!
              </h1>
              <p className="text-lg text-white/90">
                {currentPlan?.name} • Continue your wellness journey
              </p>
            </div>
            <button
              onClick={() => navigate('/subscription')}
              className="hidden md:block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="card bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Current Streak</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{progress.currentStreak}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-2xl">💪</span>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Sessions</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{progress.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Minutes</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{progress.totalMinutes}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Achievements</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{progress.achievements.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Today's Practice */}
          <div className="lg:col-span-2 space-y-6">
            {todayExercise && (
              <div className="card bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Practice</h2>
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{todayExercise.title}</h3>
                      <p className="text-sm text-gray-600">{todayExercise.duration} minutes • {todayExercise.difficulty}</p>
                    </div>
                    <span className="text-4xl">🌅</span>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {todayExercise.description}
                  </p>
                  <button
                    onClick={() => navigate(`/exercise/${todayExercise.id}`)}
                    className="btn-primary w-full"
                  >
                    Start Session
                  </button>
                </div>
              </div>
            )}

            <div className="card bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Exercises</h2>
                <button
                  onClick={() => navigate('/library')}
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  View All →
                </button>
              </div>

              {subscriptionTier === 'free' ? (
                <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                  <span className="text-6xl mb-4 block">🔒</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Unlock Full Access
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    Upgrade to access our complete library of Tai Chi programs and personalized content
                  </p>
                  <button
                    onClick={() => navigate('/subscription')}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Plans
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableExercises.slice(0, 3).map((exercise) => (
                    <button
                      key={exercise.id}
                      onClick={() => navigate(`/exercise/${exercise.id}`)}
                      className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:shadow-soft"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">⚖️</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                        <p className="text-sm text-gray-600">{exercise.duration} min • {exercise.category}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Progress & Goals */}
          <div className="space-y-6">
            <div className="card bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weight Progress</h3>
              {userProfile.currentWeight && userProfile.targetWeight ? (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className="font-bold text-gray-900">{userProfile.currentWeight} {userProfile.weightUnit}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Target</span>
                      <span className="font-bold text-gray-900">{userProfile.targetWeight} {userProfile.weightUnit}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                      <span className="text-sm font-semibold text-primary-700">To Go</span>
                      <span className="font-bold text-primary-700">
                        {Math.abs(Number(userProfile.currentWeight) - Number(userProfile.targetWeight))} {userProfile.weightUnit}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: '15%',
                        background: 'linear-gradient(90deg, #ff9b40 0%, #f58320 100%)',
                      }}
                    />
                  </div>
                  <button className="btn-secondary w-full mt-4 text-sm">
                    Log Weight
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4 text-sm">Set your weight goals to track progress</p>
                  <button className="btn-secondary text-sm w-full">
                    Set Goals
                  </button>
                </div>
              )}
            </div>

            <div className="card bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/library')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">Exercise Library</div>
                    <div className="text-xs text-gray-600">{availableExercises.length} available</div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/subscription')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">Subscription</div>
                    <div className="text-xs text-gray-600 capitalize">{subscriptionTier} plan</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
