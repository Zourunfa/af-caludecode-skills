import React from 'react';

const Slide = ({ slide, theme, isActive }) => {
  const themeClasses = {
    modern: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white',
    minimalist: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-gray-100',
    colorful: 'bg-gradient-to-br from-pink-500 to-orange-400 text-white'
  };

  const baseClasses = themeClasses[theme] || themeClasses.modern;

  return (
    <div
      className={`slide-enter h-full w-full flex flex-col justify-center items-center p-8 md:p-16 ${baseClasses} relative`}
    >
      {/* Slide Number - Fixed Position */}
      <div className="absolute bottom-8 right-8 text-sm opacity-60">
        {slide.number}
      </div>

      <div className="max-w-5xl w-full h-full flex flex-col">
        <div className="slide-content flex-1 space-y-4">
        {/* Slide Title */}
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
          {slide.title}
        </h1>

        {/* Slide Content */}
        {slide.content && (
          <p className="text-xl md:text-2xl opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {slide.content}
          </p>
        )}

        {/* Bullet Points */}
        {slide.bullets && slide.bullets.length > 0 && (
          <ul className="space-y-4 text-lg md:text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {slide.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-2xl">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Author on Title Slide */}
        {slide.isTitle && slide.author && (
          <p className="text-lg md:text-xl opacity-75 mt-8">
            {slide.author}
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Slide;
