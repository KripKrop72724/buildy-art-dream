import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

// Ensure asset paths respect the configured base URL so images don't
// break when the site is deployed in a subdirectory.
const resolveAsset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        resolveAsset('/anime/mascots/buildy-idle-wave-01.png'),
        resolveAsset('/anime/mascots/buildy-idle-wave-02.png')
      ],
      walk: [
        resolveAsset('/anime/mascots/buildy-walk-01.png'),
        resolveAsset('/anime/mascots/buildy-walk-02.png')
      ],
      clean: [
        resolveAsset('/anime/mascots/buildy-sparkle-clean-01.png'),
        resolveAsset('/anime/mascots/buildy-sparkle-clean-02.png')
      ],
      spray: [resolveAsset('/anime/mascots/buildy-sprayer-01.png')],
      squeegee: [resolveAsset('/anime/mascots/buildy-squeegee-01.png')]
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

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentFrame(prev => {
        const nextFrame = (prev + 1) % frames.length;
        if (nextFrame === 0 && !loop) {
          setIsPlaying(false);
          onComplete?.();
        }
        return nextFrame;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [animation, loop, isPlaying, prefersReducedMotion, onComplete]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Lottie animation data (simplified - would be imported from JSON files)
  const lottieAnimations = {
      idle: resolveAsset('/anime/lottie/buildy-idle-wave.json'),
      walk: resolveAsset('/anime/lottie/buildy-walk.json'), // Would need to be created
      clean: resolveAsset('/anime/lottie/buildy-clean.json') // Would need to be created
    };

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <img
        src={resolveAsset('/anime/static/buildy-static.png')}
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