import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, #ff9b40 0%, #f58320 100%)',
          boxShadow: '0 0 8px rgba(255, 155, 64, 0.4)',
        }}
      />
    </div>
  );
};
