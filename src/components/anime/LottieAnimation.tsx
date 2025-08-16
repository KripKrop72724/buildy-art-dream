import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { SafeImage } from '@/components/ui/safe-image';

interface LottieAnimationProps {
  animationPath: string;
  fallbackImage?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  trigger?: 'viewport' | 'hover' | 'click' | 'immediate';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  maxSize?: number;
}

export const LottieAnimation = ({
  animationPath,
  fallbackImage,
  className = '',
  loop = true,
  autoplay = true,
  onComplete,
  trigger = 'immediate',
  size = 'md',
  maxSize = 600
}: LottieAnimationProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [animationData, setAnimationData] = useState(null);
  const [useFallback, setUseFallback] = useState(false);
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

  const maxSizeStyle = maxSize ? { maxWidth: `${maxSize}px`, maxHeight: `${maxSize}px` } : {};

  // Load Lottie animation data with asset normalization and preloading
  useEffect(() => {
    if (isSeriousMode) return;

    let cancelled = false;
    setUseFallback(false);

    const baseFromPath = () => {
      if (animationPath.includes('buildy-idle-wave')) return '/anime/mascots/';
      if (animationPath.includes('pest')) return '/anime/pests/';
      if (animationPath.includes('droplet')) return '/anime/effects/';
      return '/anime/';
    };

    const normalize = (data: any) => {
      const cloned = { ...data, assets: Array.isArray(data.assets) ? data.assets.map((a: any) => ({ ...a })) : [] };
      const base = baseFromPath();
      cloned.assets?.forEach((a: any) => {
        if (a.p && !/^https?:\/\//.test(a.p)) {
          const url = a.p.startsWith('/') ? a.p : `${base}${a.p}`;
          a.u = '';
          a.p = url;
        }
      });
      return cloned;
    };

    const preloadAssets = async (assets: any[]) => {
      if (!assets?.length) return true;
      const results = await Promise.all(
        assets
          .filter((a) => a.p)
          .map(
            (a: any) =>
              new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = a.p;
              })
          )
      );
      return results.every(Boolean);
    };

    const load = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const raw = await response.json();
        const normalized = normalize(raw);
        const ok = await preloadAssets(normalized.assets || []);
        if (cancelled) return;
        if (!ok) {
          console.warn('Lottie assets failed to load, using static fallback:', animationPath);
          setUseFallback(true);
          setAnimationData(null);
          return;
        }
        console.debug('Lottie loaded:', animationPath);
        setAnimationData(normalized);
      } catch (error) {
        if (cancelled) return;
        console.warn(`Failed to load Lottie animation: ${animationPath}`, error);
        setUseFallback(true);
        setAnimationData(null);
      }
    };

    const watchdog = window.setTimeout(() => {
      if (!cancelled && !animationData) {
        console.warn('Lottie timed out, using fallback:', animationPath);
        setUseFallback(true);
      }
    }, 3500);

    load();

    return () => {
      cancelled = true;
      window.clearTimeout(watchdog);
    };
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
  if (isSeriousMode) {
    return (
      <motion.div
        className={`${sizeClasses[size]} ${className} flex items-center justify-center`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SafeImage 
          src={fallbackImage || '/anime/static/buildy-static.png'} 
          alt="Service illustration" 
          className="w-full h-full object-contain"
        />
      </motion.div>
    );
  }

  if (useFallback || !animationData) {
    return (
      <motion.div 
        className={`${sizeClasses[size]} ${className} flex items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SafeImage 
          src={fallbackImage || '/anime/static/buildy-static.png'}
          alt="Service illustration"
          className="w-full h-full object-contain"
        />
      </motion.div>
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
      style={maxSizeStyle}
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
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true }}
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

// Preload helper for warming up next slide assets
export const preloadLottieAssets = async (animationPath: string, fallbackImage?: string) => {
  try {
    // Preload Lottie JSON
    await fetch(animationPath);
    
    // Preload fallback image
    if (fallbackImage) {
      const img = new Image();
      img.src = fallbackImage;
    }
  } catch (error) {
    console.warn('Preload failed for:', animationPath, error);
  }
};