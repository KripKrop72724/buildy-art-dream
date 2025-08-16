import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSlide } from './HeroSlide';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { useTranslation } from 'react-i18next';

interface HeroSlideData {
  id: string;
  service: 'pool' | 'pest' | 'deepClean';
  animationType: 'squeegee' | 'pestRetreat' | 'sparkle';
  lottieAnimation: string;
  staticFallback: string;
}

const slides: HeroSlideData[] = [
  {
    id: 'pool',
    service: 'pool',
    animationType: 'squeegee',
    lottieAnimation: '/anime/lottie/buildy-idle-wave.json',
    staticFallback: '/anime/static/buildy-static.png'
  },
  {
    id: 'pest',
    service: 'pest',
    animationType: 'pestRetreat',
    lottieAnimation: '/anime/lottie/pest-retreat.json',
    staticFallback: '/anime/static/pest-static.png'
  },
  {
    id: 'deepClean',
    service: 'deepClean',
    animationType: 'sparkle',
    lottieAnimation: '/anime/lottie/droplet-hop.json',
    staticFallback: '/anime/static/buildy-static.png'
  }
];

export const AnimatedHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isSeriousMode } = useSeriousMode();
  const { t } = useTranslation();

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Re-enable auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/.1)_0%,transparent_50%)]" />

      {/* Carousel Container */}
      <div 
        className="relative h-full"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <HeroSlide data={slides[currentSlide]} />
          </motion.div>
        </AnimatePresence>

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
              {index === currentSlide && isAutoPlaying && (
                <motion.div
                  className="w-full h-full rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
};