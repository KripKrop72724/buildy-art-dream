import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface RippleTransitionProps {
  children?: React.ReactNode;
  trigger?: boolean;
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  onComplete?: () => void;
}

export const RippleTransition = ({
  children,
  trigger = false,
  className = '',
  color = 'rgb(59, 130, 246)', // pool blue
  size = 'md',
  compact = false,
  onComplete
}: RippleTransitionProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Create stable random function to avoid infinite re-renders
  const random = useRef<(() => number) | null>(null);


  const sizeValues = {
    sm: { initial: 0, animate: 100 },
    md: { initial: 0, animate: 200 },
    lg: { initial: 0, animate: 400 }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !random.current) {
      let seed = 42;
      random.current = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
    }
  }, []);

  useEffect(() => {
    if (trigger && !isSeriousMode && random.current) {
      // Create multiple ripples at random positions
      const rippleCount = compact ? 2 : 3;
      const newRipples = Array.from({ length: rippleCount }, (_, i) => ({
        id: rippleId + i,
        x: random.current!() * 100,
        y: random.current!() * 100
      }));
      
      setRipples(prev => [...prev, ...newRipples]);
      setRippleId(prev => prev + rippleCount);

      // Clean up ripples after animation
      const duration = compact ? 700 : 1500;
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = setTimeout(() => {
        setRipples(prev => prev.filter(r => !newRipples.some(nr => nr.id === r.id)));
        onComplete?.();
      }, duration);

      return () => {
        if (cleanupTimerRef.current) {
          clearTimeout(cleanupTimerRef.current);
          cleanupTimerRef.current = null;
        }
      };
    }
  }, [trigger, isSeriousMode, rippleId, onComplete, compact]);

  useEffect(() => {
    return () => {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }
    };
  }, []);

  if (isSeriousMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Ripple Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border-2 opacity-60"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                borderColor: color
              }}
              initial={{
                width: sizeValues[size].initial,
                height: sizeValues[size].initial,
                opacity: 0.8,
                scale: 0
              }}
              animate={{
                width: sizeValues[size].animate,
                height: sizeValues[size].animate,
                opacity: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 1.2
              }}
              transition={{
                duration: compact ? 0.7 : 1.5,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Water Splash Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={`splash-${ripple.id}`}
              className="absolute"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Splash Droplets */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/70 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0
                  }}
                  animate={{
                    x: (i % 2 === 0 ? 1 : -1) * (20 + i * 5),
                    y: -10 - (i * 3),
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Pool-specific ripple component
export const PoolRippleTransition = (props: Omit<RippleTransitionProps, 'color'>) => (
  <RippleTransition {...props} color="rgb(34, 197, 204)" />
);