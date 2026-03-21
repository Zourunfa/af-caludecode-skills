import { useState, useEffect } from 'react';
import Slideshow from './components/Slideshow';
import { generateSlides } from './utils/slideGenerator';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Generate slides from configuration
    const generatedSlides = generateSlides({
      title: '{{title}}',
      author: '{{author}}',
      count: {{slides}},
      theme: '{{theme}}'
    });
    setSlides(generatedSlides);

    // Keyboard event handlers
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide(prev => Math.max(prev - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(slides.length - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Slideshow
        slides={slides}
        currentSlide={currentSlide}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
        onFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        theme="{{theme}}"
      />
    </div>
  );
}

export default App;
