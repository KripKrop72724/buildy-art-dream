import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { HeroSlide, type HeroSlideData } from './HeroSlide';
import { useSeriousMode } from '../../contexts/SeriousModeContext';
import { NarrativeBridge } from './NarrativeBridge';
import { preloadLottieAssets } from './LottieAnimation';

const slides: HeroSlideData[] = [
  {
    service: 'pool',
    animationType: 'squeegee',
    animationPath: '/anime/lottie/buildy-idle-wave.json',
    fallbackImage: '/anime/static/buildy-static.png',
    durationMs: 8000
  },
  {
    service: 'pest',
    animationType: 'pest-retreat',
    animationPath: '/anime/lottie/pest-retreat.json',
    fallbackImage: '/anime/static/pest-static.png',
    durationMs: 8000
  },
  {
    service: 'deepClean',
    animationType: 'sparkle-burst',
    animationPath: '/anime/lottie/droplet-hop.json',
    fallbackImage: '/anime/static/buildy-static.png',
    durationMs: 8000
  }
];

export const AnimatedHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { isSeriousMode } = useSeriousMode();

  // Auto-advance slides based on their duration
  useEffect(() => {
    if (isPaused || isSeriousMode || isTransitioning) return;

    const currentSlideDuration = slides[currentSlide]?.durationMs || 8000;
    // Add extra pause time if user recently interacted
    const pauseBonus = userInteracted ? 2000 : 0;
    
    const timer = setTimeout(() => {
      if (!userInteracted) {
        handleSlideTransition((currentSlide + 1) % slides.length);
      }
    }, currentSlideDuration + pauseBonus);

    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, isSeriousMode, isTransitioning, userInteracted]);

  // Reset user interaction flag after a delay
  useEffect(() => {
    if (userInteracted) {
      const timer = setTimeout(() => setUserInteracted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [userInteracted]);

  // Preload next slide assets
  useEffect(() => {
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    const nextSlide = slides[nextSlideIndex];
    
    if (nextSlide?.animationPath) {
      preloadLottieAssets(nextSlide.animationPath, nextSlide.fallbackImage);
    }
  }, [currentSlide, slides]);

  const handleSlideTransition = (targetIndex: number) => {
    if (targetIndex !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      // Brief delay before changing slide to show transition effect
      setTimeout(() => {
        setCurrentSlide(targetIndex);
        setTimeout(() => setIsTransitioning(false), 600);
      }, 300);
    }
  };

  const goToSlide = (index: number) => {
    setUserInteracted(true);
    handleSlideTransition(index);
  };

  const nextSlide = () => {
    setUserInteracted(true);
    handleSlideTransition((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setUserInteracted(true);
    handleSlideTransition((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/.1)_0%,transparent_50%)]" />

      {/* Carousel Container */}
      <div 
        className="relative min-h-[80vh]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="h-full"
            >
              <HeroSlide data={slides[currentSlide]} />
            </motion.div>
          </AnimatePresence>

          {/* Narrative Bridge Transitions */}
          <NarrativeBridge
            isActive={isTransitioning}
            fromService={slides[currentSlide]?.service || ''}
            toService={slides[(currentSlide + 1) % slides.length]?.service || ''}
            onComplete={() => {}}
          />
        </div>

        {/* Navigation Arrows */}
        {!isSeriousMode && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary scale-125'
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && !isPaused && !isTransitioning && (
                <motion.div
                  className="w-full h-full rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: (slides[currentSlide]?.durationMs || 8000) / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter & Serious Mode Indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </div>
          {isSeriousMode && (
            <motion.div
              className="bg-muted/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-muted-foreground border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              💼 Professional Mode
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export type { HeroSlideData };