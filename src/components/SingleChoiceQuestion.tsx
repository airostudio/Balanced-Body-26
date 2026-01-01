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
      {options.map((option) => {
        const value = option.value || option.id;
        const isSelected = selectedValue === value;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(value)}
            className={`quiz-option ${isSelected ? 'selected' : ''}`}
          >
            <div className="radio-button">
              {isSelected && <div className="radio-button-inner" />}
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
