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
      <h2 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h2>

      {image && (
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 overflow-hidden">
          {/* Dual line chart showing cortisol decreasing and testosterone increasing */}
          <div className="relative">
            <svg className="w-full h-48" viewBox="0 0 300 160" fill="none">
              {/* Grid background */}
              <g opacity="0.1">
                {[0, 40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#9CA3AF" strokeWidth="1" />
                ))}
                {[0, 60, 120, 180, 240, 300].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#9CA3AF" strokeWidth="1" />
                ))}
              </g>

              {/* Cortisol line (declining) */}
              <path
                d="M 20,40 Q 80,45 140,70 T 280,120"
                stroke="#6B7280"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <text x="20" y="30" fontSize="12" fill="#6B7280" fontWeight="600">
                Cortisol
              </text>

              {/* Testosterone line (increasing) with muscle emoji */}
              <path
                d="M 20,140 Q 80,125 140,90 T 280,35"
                stroke="#FF9B40"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Muscle emoji at end of testosterone line */}
              <circle cx="280" cy="35" r="14" fill="#FF9B40" />
              <text x="280" y="40" fontSize="16" textAnchor="middle" style={{ userSelect: 'none' }}>
                💪
              </text>

              <text x="20" y="155" fontSize="12" fill="#FF9B40" fontWeight="600">
                Testosterone
              </text>

              {/* X-axis labels */}
              <text x="20" y="178" fontSize="11" fill="#6B7280">
                Now
              </text>
              <text x="260" y="178" fontSize="11" fill="#6B7280" textAnchor="end">
                6 months
              </text>
            </svg>
          </div>

          {/* Phone preview mockup in bottom corner */}
          <div className="absolute -bottom-4 -right-4 w-24 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-4 border-gray-700 opacity-30 transform rotate-12" />
        </div>
      )}

      <p className="text-gray-700 leading-relaxed text-lg">{body}</p>

      {bullets && bullets.length > 0 && (
        <div className="space-y-4 bg-white rounded-2xl p-6 shadow-soft">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mt-0.5 shadow-sm">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-800 flex-1 text-base leading-relaxed font-medium">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      )}

      {stats && (
        <p className="text-sm text-gray-500 italic text-center">{stats}</p>
      )}
    </div>
  );
};
