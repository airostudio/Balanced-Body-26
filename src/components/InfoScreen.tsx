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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Image */}
      {image && (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 -mx-5 md:mx-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add(
                'bg-gradient-to-br',
                'from-primary-200',
                'to-accent-200',
                'flex',
                'items-center',
                'justify-center'
              );
              // Add fallback content
              const fallback = document.createElement('div');
              fallback.className = 'text-center p-8';
              fallback.innerHTML = `
                <div class="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <span class="text-4xl">✨</span>
                </div>
                <p class="text-gray-700 font-semibold text-lg">${title}</p>
              `;
              e.currentTarget.parentElement!.appendChild(fallback);
            }}
          />
          {/* Gradient Overlay for better text readability if we add text overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>

      {/* Body Text */}
      <p className="text-gray-700 leading-relaxed text-lg">{body}</p>

      {/* Benefits List */}
      {bullets && bullets.length > 0 && (
        <div className="space-y-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-soft border border-gray-100">
          {bullets.map((bullet, index) => (
            <div
              key={index}
              className="flex items-start gap-3.5 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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

      {/* Stats/Research Citation */}
      {stats && (
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-gray-700 italic flex-1 leading-relaxed">
              {stats}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
