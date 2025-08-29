import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

interface BuildyMascotProps {
  animation?: 'idle' | 'walk' | 'clean' | 'spray' | 'squeegee';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  useLottie?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
}

export const BuildyMascot = ({
  animation = 'idle',
  size = 'md',
  className = '',
  useLottie = false,
  loop = true,
  autoplay = true,
  onComplete
}: BuildyMascotProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation frame sequences
  const frameSequences = {
    idle: [
      '/anime/mascots/buildy-idle-wave-01.png',
      '/anime/mascots/buildy-idle-wave-02.png'
    ],
    walk: [
      '/anime/mascots/buildy-walk-01.png', 
      '/anime/mascots/buildy-walk-02.png'
    ],
    clean: [
      '/anime/mascots/buildy-sparkle-clean-01.png',
      '/anime/mascots/buildy-sparkle-clean-02.png'
    ],
    spray: ['/anime/mascots/buildy-sprayer-01.png'],
    squeegee: ['/anime/mascots/buildy-squeegee-01.png']
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  // Animation timing based on type
  const getAnimationDuration = () => {
    switch (animation) {
      case 'idle': return 2000;
      case 'walk': return 800;
      case 'clean': return 1500;
      case 'spray': return 1000;
      case 'squeegee': return 1200;
      default: return 2000;
    }
  };

  // Frame animation effect
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) return;

    const frames = frameSequences[animation];
    if (frames.length <= 1) return;

    const duration = getAnimationDuration();
    const interval = duration / frames.length;

    const timer = setInterval(() => {
      setCurrentFrame(prev => {
        const nextFrame = (prev + 1) % frames.length;
        if (nextFrame === 0 && !loop) {
          setIsPlaying(false);
          onComplete?.();
        }
        return nextFrame;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [animation, loop, isPlaying, prefersReducedMotion, onComplete]);

  // Lottie animation data (simplified - would be imported from JSON files)
  const lottieAnimations = {
    idle: '/anime/lottie/buildy-idle-wave.json',
    walk: '/anime/lottie/buildy-walk.json', // Would need to be created
    clean: '/anime/lottie/buildy-clean.json' // Would need to be created
  };

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <img
        src="/anime/static/buildy-static.png"
        alt="BuildCare mascot Buildy"
        className={`${sizeClasses[size]} object-contain ${className}`}
      />
    );
  }

  // Lottie version
  if (useLottie && lottieAnimations[animation]) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${sizeClasses[size]} ${className}`}
      >
        <Lottie
          animationData={lottieAnimations[animation]}
          loop={loop}
          autoplay={autoplay}
          onComplete={onComplete}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
    );
  }

  // Frame-based animation
  const currentSrc = frameSequences[animation][currentFrame];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${sizeClasses[size]} ${className} relative`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentFrame}
          src={currentSrc}
          alt={`BuildCare mascot Buildy - ${animation} animation`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onError={() => {
            console.warn(`Failed to load mascot frame: ${currentSrc}`);
          }}
        />
      </AnimatePresence>

      {/* Play/Pause Control (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-0 right-0 w-4 h-4 bg-primary/50 rounded text-xs"
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}
    </motion.div>
  );
};

// Convenience components for specific animations
export const IdleBuildyMascot = (props: Omit<BuildyMascotProps, 'animation'>) => (
  <BuildyMascot {...props} animation="idle" />
);

export const WalkingBuildyMascot = (props: Omit<BuildyMascotProps, 'animation'>) => (
  <BuildyMascot {...props} animation="walk" />
);

export const CleaningBuildyMascot = (props: Omit<BuildyMascotProps, 'animation'>) => (
  <BuildyMascot {...props} animation="clean" />
);

// Hook for mascot animations
export const useBuildyMascot = () => {
  const [animation, setAnimation] = useState<BuildyMascotProps['animation']>('idle');
  const [isPlaying, setIsPlaying] = useState(true);

  const play = (newAnimation?: BuildyMascotProps['animation']) => {
    if (newAnimation) setAnimation(newAnimation);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  
  const reset = () => {
    setAnimation('idle');
    setIsPlaying(true);
  };

  return {
    animation,
    isPlaying,
    play,
    pause,
    reset,
    setAnimation
  };
};