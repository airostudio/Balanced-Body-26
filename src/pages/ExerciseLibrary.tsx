import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getAvailableExercises, allExercises } from '../data/exercises';
import { ExerciseCard } from '../components/ExerciseCard';

export const ExerciseLibrary: React.FC = () => {
  const navigate = useNavigate();
  const { subscriptionTier } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const availableExercises = getAvailableExercises(subscriptionTier);
  const allExercisesList = [
    ...allExercises.free,
    ...allExercises.beginner,
    ...allExercises.intermediate,
    ...allExercises.expert,
  ];

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allExercisesList.map(ex => ex.category)))];

  // Filter exercises
  const filteredExercises = selectedCategory === 'all'
    ? allExercisesList
    : allExercisesList.filter(ex => ex.category === selectedCategory);

  const isLocked = (exerciseId: string) => {
    return !availableExercises.find(ex => ex.id === exerciseId);
  };

  const handleExerciseClick = (exerciseId: string) => {
    if (!isLocked(exerciseId)) {
      navigate(`/exercise/${exerciseId}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">Exercise Library</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Explore our complete collection of Tai Chi exercises designed for gentle, effective wellness.
          </p>

          {/* Tier badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-white capitalize">{subscriptionTier} Plan</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 bg-white border-b shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Exercises' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => handleExerciseClick(exercise.id)}
              isLocked={isLocked(exercise.id)}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Upgrade CTA if on free tier */}
      {subscriptionTier === 'free' && (
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12 text-center shadow-soft-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unlock Your Full Potential
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Upgrade to access our complete library of Tai Chi exercises, personalized programs, and expert guidance.
              </p>
              <button
                onClick={() => navigate('/subscription')}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                View Plans
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
