import React from 'react';
import type { QuizOption } from '../types';

interface SingleChoiceQuestionProps {
  options: QuizOption[];
  selectedValue?: string | number;
  onSelect: (value: string | number) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.value || option.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedValue === (option.value || option.id)
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-primary-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
              ${selectedValue === (option.value || option.id) ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}">
              {selectedValue === (option.value || option.id) && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
            {option.emoji && <span className="text-2xl">{option.emoji}</span>}
            <div className="flex-1">
              <div className="font-medium text-gray-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-1">{option.description}</div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
