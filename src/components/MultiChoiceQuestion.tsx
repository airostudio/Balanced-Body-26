import React from 'react';
import type { QuizOption } from '../types';

interface MultiChoiceQuestionProps {
  options: QuizOption[];
  selectedValues?: string[];
  onSelect: (values: string[]) => void;
}

export const MultiChoiceQuestion: React.FC<MultiChoiceQuestionProps> = ({
  options,
  selectedValues = [],
  onSelect,
}) => {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((v) => v !== value));
    } else {
      onSelect([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const value = (option.value || option.id) as string;
        const isSelected = selectedValues.includes(value);

        return (
          <button
            key={option.id}
            onClick={() => handleToggle(value)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              isSelected
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-primary-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
                isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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
        );
      })}
    </div>
  );
};
