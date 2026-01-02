import React from 'react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
  isLocked?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick, isLocked }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-300 ${
        isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-soft-lg hover:-translate-y-1 active:scale-98'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-accent-100 to-accent-200 overflow-hidden">
        {/* Background Image */}
        {exercise.thumbnailUrl && (
          <img
            src={exercise.thumbnailUrl}
            alt={exercise.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
              isLocked ? 'blur-md scale-105' : ''
            }`}
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white font-semibold text-sm drop-shadow-lg">Upgrade to unlock</p>
            </div>
          </div>
        )}

        {/* Play Icon Overlay (only show when not locked) */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 to-black/40">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl transform transition-transform hover:scale-110">
              <svg className="w-10 h-10 text-primary-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
          {exercise.duration} min
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
            exercise.difficulty === 'beginner' ? 'bg-green-500 text-white' :
            exercise.difficulty === 'intermediate' ? 'bg-primary-500 text-white' :
            'bg-purple-600 text-white'
          }`}>
            {exercise.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {exercise.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {exercise.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {exercise.description}
        </p>

        {/* Benefits */}
        {exercise.benefits && exercise.benefits.length > 0 && (
          <div className="space-y-1.5">
            {exercise.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};
