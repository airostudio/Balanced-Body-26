import React from 'react';

interface InfoScreenProps {
  title: string;
  body: string;
  bullets?: string[];
  stats?: string;
  image?: string;
}

export const InfoScreen: React.FC<InfoScreenProps> = ({
  title,
  body,
  bullets,
  stats,
  image,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      {image && (
        <div className="relative bg-gray-100 rounded-xl p-6 flex items-center justify-center min-h-[200px]">
          {/* Cortisol graph placeholder - would be replaced with actual chart */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-end gap-2 h-32">
                {[100, 85, 70, 55, 40, 30].map((height, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 bg-gray-200 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Now</span>
                <span>6 months</span>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700">Cortisol</p>
          </div>
        </div>
      )}

      <p className="text-gray-700 leading-relaxed">{body}</p>

      {bullets && bullets.length > 0 && (
        <div className="space-y-3">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-primary-600"
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
              </div>
              <p className="text-gray-700 flex-1">{bullet}</p>
            </div>
          ))}
        </div>
      )}

      {stats && (
        <p className="text-sm text-gray-500 italic mt-4">{stats}</p>
      )}
    </div>
  );
};
