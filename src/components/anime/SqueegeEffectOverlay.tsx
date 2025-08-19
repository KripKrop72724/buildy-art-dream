import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface SqueegeEffectOverlayProps {
  children: React.ReactNode;
  trigger?: boolean;
  className?: string;
  onComplete?: () => void;
}

export const SqueegeEffectOverlay = ({
  children,
  trigger = false,
  className = '',
  onComplete
}: SqueegeEffectOverlayProps) => {
  const { isSeriousMode } = useSeriousMode();
  const [isWiping, setIsWiping] = useState(false);
  const [showSqueegee, setShowSqueegee] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropletPositions, setDropletPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [sparklePositions, setSparklePositions] = useState<Array<{ left: number; top: number }>>([]);

  const createSeededRandom = (seed = 42) => {
    return () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
  };

  useEffect(() => {
    const rand = createSeededRandom();
    setDropletPositions(
      Array.from({ length: 8 }, () => ({ x: rand() * 100, y: rand() * 30 }))
    );
    setSparklePositions(
      Array.from({ length: 8 }, () => ({ left: rand() * 100, top: rand() * 100 }))
    );
  }, []);

  useEffect(() => {
    if (trigger && !isSeriousMode && dropletPositions.length && sparklePositions.length) {
      setIsWiping(true);
      setShowSqueegee(true);
      
      const timer = setTimeout(() => {
        setIsWiping(false);
        setShowSqueegee(false);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, isSeriousMode, onComplete, dropletPositions, sparklePositions]);

  if (isSeriousMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Squeegee Tool */}
      <AnimatePresence>
        {showSqueegee && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Squeegee Handle and Blade */}
            <motion.div
              className="absolute w-8 h-32 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"
              style={{
                top: '20%',
                left: '-2rem'
              }}
              animate={{
                x: ['0vw', '100vw'],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut"
              }}
            >
              {/* Blade */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Water Droplets */}
      <AnimatePresence>
        {isWiping && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {dropletPositions.map(({ x, y }, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-blue-400/60 rounded-full"
                initial={{
                  x: x + '%',
                  y: y + '%',
                  scale: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  y: '+=100px',
                  rotate: 360
                }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Wiping Effect Overlay */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent pointer-events-none z-20"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Clean Sparkle Effect */}
      <AnimatePresence>
        {isWiping && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {sparklePositions.map(({ left, top }, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-yellow-400 text-xl"
                style={{
                  left: left + '%',
                  top: top + '%'
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 1,
                  delay: 1.5 + (i * 0.1),
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};