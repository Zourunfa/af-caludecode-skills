import React from 'react';
import Slide from './Slide';
import { getThemeStyles } from '../themes';

const Slideshow = ({
  slides,
  currentSlide,
  onNext,
  onPrev,
  onGoTo,
  onFullscreen,
  isFullscreen,
  theme
}) => {
  const themeStyles = getThemeStyles(theme);
  const currentSlideData = slides[currentSlide];

  if (!currentSlideData) {
    return null;
  }

  return (
    <div
      className="relative h-full w-full transition-all duration-300"
      style={themeStyles.container}
    >
      {/* Main Slide */}
      <Slide slide={currentSlideData} theme={theme} isActive={true} />

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm transition-all"
        >
          ← Prev
        </button>

        {/* Slide Indicator */}
        <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentSlide === slides.length - 1}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm transition-all"
        >
          Next →
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={onFullscreen}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white/50 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Dots */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-8 left-8 text-xs opacity-50 space-y-1 hidden md:block">
        <div><span className="kbd">←</span> <span className="kbd">→</span> Navigate</div>
        <div><span className="kbd">Space</span> Next</div>
        <div><span className="kbd">F</span> Fullscreen</div>
      </div>
    </div>
  );
};

export default Slideshow;
