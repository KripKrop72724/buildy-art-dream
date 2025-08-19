import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RippleTransition } from './RippleTransition';

interface NarrativeBridgeProps {
  isActive: boolean;
  fromService: string;
  toService: string;
  onComplete: () => void;
}

export const NarrativeBridge: React.FC<NarrativeBridgeProps> = ({
  isActive,
  fromService,
  toService,
  onComplete
}) => {
  const completionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleComplete = (delay: number) => {
    if (completionRef.current) clearTimeout(completionRef.current);
    completionRef.current = setTimeout(onComplete, delay);
  };

  useEffect(() => {
    return () => {
      if (completionRef.current) {
        clearTimeout(completionRef.current);
      }
    };
  }, []);
  const getBridgeEffect = () => {
    const transitionKey = `${fromService}-${toService}`;
    
    switch (transitionKey) {
      case 'pool-pest':
        return (
          <motion.div
            key="pool-to-pest"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-red-500/20"
            onAnimationComplete={() => scheduleComplete(600)}
          >
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              From Pool to Pest Protection! 🏊‍♂️➡️🐛
            </div>
          </motion.div>
        );
      
      case 'pest-deepClean':
        return (
          <motion.div
            key="pest-to-clean"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-r from-red-500/20 to-green-500/20"
            onAnimationComplete={() => scheduleComplete(600)}
          >
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              Now for Deep Cleaning! 🐛➡️✨
            </div>
          </motion.div>
        );
      
      case 'deepClean-pool':
        return (
          <RippleTransition
            trigger={true}
            color="hsl(var(--primary))"
            onComplete={() => scheduleComplete(600)}
          >
            <motion.div
              key="clean-to-pool"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-r from-green-500/20 to-blue-500/20"
            >
              <div className="text-2xl font-bold text-white drop-shadow-lg">
                Back to Pool Perfection! ✨➡️🏊‍♂️
              </div>
            </motion.div>
          </RippleTransition>
        );
      
      default:
        return (
          <motion.div
            key="default-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-primary/10"
            onAnimationComplete={() => scheduleComplete(300)}
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {isActive && getBridgeEffect()}
    </AnimatePresence>
  );
};