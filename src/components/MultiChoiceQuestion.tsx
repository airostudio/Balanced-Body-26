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
            className={`quiz-option ${isSelected ? 'selected' : ''}`}
          >
            <div className="checkbox">
              {isSelected && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {option.emoji && (
              <span className="text-2xl flex-shrink-0">{option.emoji}</span>
            )}

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-base">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-gray-600 mt-0.5">
                  {option.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
