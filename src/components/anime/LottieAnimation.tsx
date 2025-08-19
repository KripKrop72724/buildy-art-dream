import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { SafeImage } from '@/components/ui/safe-image';

// Resolve asset paths respecting Vite's base URL. This prevents broken
// references when the app is served from a subdirectory.
const resolveAsset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

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

// Module-level cache so animations are loaded once per session
// Lottie JSON files live in `src/anime` so they can be imported as modules
const rawAnimationModules = import.meta.glob('/src/anime/**/*.json', {
  import: 'default'
});

const animationModules: Record<string, () => Promise<unknown>> = {};
Object.keys(rawAnimationModules).forEach((key) => {
  // Drop the `/src` prefix so callers can use paths like `/anime/foo.json`
  animationModules[key.replace(/^\/src/, '')] = rawAnimationModules[key];
});

const animationCache: Record<string, Promise<unknown>> = {};

const getAnimation = async (path: string): Promise<unknown> => {
  if (!animationCache[path]) {
    const importer = animationModules[path];
    if (!importer) {
      return Promise.reject(new Error(`Animation not found: ${path}`));
    }
    animationCache[path] = importer().then((m: unknown) => (m as { default?: unknown }).default ?? m);
    animationCache[path].catch(() => {
      delete animationCache[path];
    });
  }
  return animationCache[path];
};

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
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const loadedRef = useRef(false);
  const watchdogRef = useRef<number | null>(null);

  // Size classes
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const maxSizeStyle = maxSize ? { maxWidth: `${maxSize}px`, maxHeight: `${maxSize}px` } : {};

  const resolvedFallback = resolveAsset(
    fallbackImage || '/anime/static/buildy-static.png'
  );

  // Load Lottie animation data using dynamic import
  useEffect(() => {
    if (isSeriousMode) return;
    let cancelled = false;
    setUseFallback(false);

    const load = async () => {
      try {
        const data = await getAnimation(animationPath);
        if (cancelled) return;
        
        console.log('✅ Lottie animation loaded successfully:', animationPath);
        loadedRef.current = true;
        
        if (useFallback) {
          console.log('🔄 Lottie recovered from fallback state:', animationPath);
        }

        setUseFallback(false);
        setAnimationData(data);
      } catch (error) {
        if (cancelled) return;
        console.error('❌ Failed to load Lottie animation:', animationPath, error);
        setUseFallback(true);
        setAnimationData(null);
      }
    };


    if (watchdogRef.current) window.clearTimeout(watchdogRef.current);
    watchdogRef.current = window.setTimeout(() => {
      if (!cancelled && !loadedRef.current) {
        console.warn('Lottie watchdog timeout - falling back to static image:', animationPath);
        setUseFallback(true);
      }
    }, 5000);


    load();
    return () => {
      cancelled = true;

      if (watchdogRef.current) {
        window.clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }

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
          src={resolvedFallback}
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
          src={resolvedFallback}
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
    // Preload Lottie JSON by importing it
    await getAnimation(animationPath);

    // Preload fallback image
    if (fallbackImage) {
      const img = new Image();
      img.src = resolveAsset(fallbackImage);
    }
  } catch (error) {
    console.warn('Preload failed for:', animationPath, error);
  }
};
