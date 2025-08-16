import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface RippleTransitionProps {
  children: React.ReactNode;
  trigger?: boolean;
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

export const RippleTransition = ({
  children,
  trigger = false,
  className = '',
  color = 'rgb(59, 130, 246)', // pool blue
  size = 'md',
  onComplete
}: RippleTransitionProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const sizeValues = {
    sm: { initial: 0, animate: 100 },
    md: { initial: 0, animate: 200 },
    lg: { initial: 0, animate: 400 }
  };

  useEffect(() => {
    if (trigger && !isSeriousMode) {
      // Create multiple ripples at random positions
      const newRipples = Array.from({ length: 3 }, (_, i) => ({
        id: rippleId + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      
      setRipples(prev => [...prev, ...newRipples]);
      setRippleId(prev => prev + 3);

      // Clean up ripples after animation
      const timer = setTimeout(() => {
        setRipples(prev => prev.filter(r => !newRipples.some(nr => nr.id === r.id)));
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [trigger, isSeriousMode, rippleId, onComplete]);

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
                duration: 1.5,
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