import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface LottieAnimationProps {
  animationPath: string;
  fallbackImage?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  trigger?: 'viewport' | 'hover' | 'click' | 'immediate';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LottieAnimation = ({
  animationPath,
  fallbackImage,
  className = '',
  loop = true,
  autoplay = true,
  onComplete,
  trigger = 'immediate',
  size = 'md'
}: LottieAnimationProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [animationData, setAnimationData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  // Size classes
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  // Load Lottie animation data
  useEffect(() => {
    if (isSeriousMode) return;

    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        }
      } catch (error) {
        console.warn(`Failed to load Lottie animation: ${animationPath}`, error);
      }
    };

    loadAnimation();
  }, [animationPath, isSeriousMode]);

  // Intersection Observer for viewport trigger
  useEffect(() => {
    if (trigger !== 'viewport' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !isPlaying) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [trigger, isPlaying]);

  // Control animation playback
  useEffect(() => {
    if (!lottieRef.current) return;

    if (isPlaying && (trigger === 'immediate' || (trigger === 'viewport' && isInView))) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [isPlaying, isInView, trigger]);

  // Serious mode or fallback
  if (isSeriousMode || !animationData) {
    return fallbackImage ? (
      <motion.img
        src={fallbackImage}
        alt="BuildCare service illustration"
        className={`${sizeClasses[size]} object-contain ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    ) : (
      <div className={`${sizeClasses[size]} bg-muted/20 rounded-lg ${className}`} />
    );
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`${sizeClasses[size]} ${className} cursor-pointer`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false} // We control this manually
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
};

// Specialized Lottie components for BuildCare
export const PoolMaintenanceLottie = (props: Omit<LottieAnimationProps, 'animationPath' | 'fallbackImage'>) => (
  <LottieAnimation
    {...props}
    animationPath="/anime/lottie/buildy-idle-wave.json"
    fallbackImage="/anime/illustrations/pool-service-scene.png"
  />
);

export const PestControlLottie = (props: Omit<LottieAnimationProps, 'animationPath' | 'fallbackImage'>) => (
  <LottieAnimation
    {...props}
    animationPath="/anime/lottie/pest-retreat.json"
    fallbackImage="/anime/illustrations/pest-control-scene.png"
  />
);

export const DeepCleaningLottie = (props: Omit<LottieAnimationProps, 'animationPath' | 'fallbackImage'>) => (
  <LottieAnimation
    {...props}
    animationPath="/anime/lottie/droplet-hop.json"
    fallbackImage="/anime/illustrations/deep-cleaning-scene.png"
  />
);