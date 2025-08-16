import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface ScrollTriggeredAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'retreat';
  triggerOffset?: number;
  className?: string;
  delay?: number;
}

export const ScrollTriggeredAnimation = ({
  children,
  animation = 'fadeIn',
  triggerOffset = 0.1,
  className = '',
  delay = 0
}: ScrollTriggeredAnimationProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0 && !isVisible) {
        setIsVisible(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isVisible]);

  // Animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    retreat: {
      hidden: { opacity: 1, x: 0, scale: 1 },
      visible: { opacity: 0.7, x: 100, scale: 0.8 }
    }
  };

  // For serious mode, just show content without animation
  if (isSeriousMode) {
    return <div className={className}>{children}</div>;
  }

  // Transform values for scroll-based animations
  const x = useTransform(scrollYProgress, [0, 1], animation === 'retreat' ? [0, 200] : [0, 0]);
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    animation === 'retreat' ? [1, 1, 0.7, 0.3] : [1, 1, 1, 1]
  );
  const scale = useTransform(scrollYProgress, [0, 1], animation === 'retreat' ? [1, 0.8] : [1, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }}
      style={
        animation === 'retreat' ? {
          x,
          opacity,
          scale
        } : undefined
      }
    >
      {children}
    </motion.div>
  );
};

// Pest retreat animation component
export const PestRetreatAnimation = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <ScrollTriggeredAnimation
      animation="retreat"
      triggerOffset={0.2}
      className={className}
    >
      {children}
    </ScrollTriggeredAnimation>
  );
};

// Sparkle wipe animation for cleaning
export const SparkleWipeAnimation = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { isSeriousMode } = useSeriousMode();
  const [isWiping, setIsWiping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSeriousMode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWiping(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isSeriousMode]);

  if (isSeriousMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Sparkle overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none"
        initial={{ x: '-100%' }}
        animate={isWiping ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Sparkle particles */}
      {isWiping && !isSeriousMode && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={isWiping ? { opacity: 1 } : { opacity: 0.7 }}
        transition={{ duration: 2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};