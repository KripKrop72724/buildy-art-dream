import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { useStory } from './StoryDirector';

interface MicroInteractionProps {
  serviceType: string;
  isActive: boolean;
  onComplete?: () => void;
  manualTriggerKey?: number;
}

interface InteractionBeat {
  id: string;
  delay: number;
  duration: number;
  type: 'squeegee' | 'pest-retreat' | 'sparkle-burst' | 'celebration';
  position?: { x: number; y: number };
  message?: string;
}

export const MicroInteractionOrchestrator: React.FC<MicroInteractionProps> = ({
  serviceType,
  isActive,
  onComplete,
  manualTriggerKey
}) => {
  const { isSeriousMode } = useSeriousMode();
  const { triggerBeat } = useStory();
  const [activeInteractions, setActiveInteractions] = useState<InteractionBeat[]>([]);

  const getServiceInteractions = (service: string): InteractionBeat[] => {
    switch (service) {
      case 'pool':
        return [
          { id: 'pool-start', delay: 500, duration: 2000, type: 'squeegee', message: 'Starting pool cleaning...', position: { x: 30, y: 70 } },
          { id: 'pool-clean', delay: 2500, duration: 1500, type: 'sparkle-burst', message: 'Crystal clear water!', position: { x: 70, y: 30 } },
          { id: 'pool-complete', delay: 4000, duration: 1000, type: 'celebration', message: 'Pool perfection achieved! 🏊‍♂️', position: { x: 50, y: 50 } }
        ];
      
      case 'pest':
        return [
          { id: 'pest-detect', delay: 300, duration: 1000, type: 'pest-retreat', message: 'Pests detected!', position: { x: 80, y: 20 } },
          { id: 'pest-spray', delay: 1300, duration: 2000, type: 'pest-retreat', message: 'Safe treatment applied...', position: { x: 60, y: 40 } },
          { id: 'pest-retreat', delay: 3300, duration: 1500, type: 'pest-retreat', message: 'Pests retreating! 🏃‍♂️', position: { x: 20, y: 70 } },
          { id: 'pest-victory', delay: 4800, duration: 1000, type: 'celebration', message: 'Mission accomplished! 🛡️', position: { x: 50, y: 50 } }
        ];
      
      case 'deepClean':
        return [
          { id: 'clean-assess', delay: 400, duration: 1000, type: 'sparkle-burst', message: 'Assessing surfaces...', position: { x: 25, y: 25 } },
          { id: 'clean-scrub', delay: 1400, duration: 2500, type: 'squeegee', message: 'Deep cleaning in progress...', position: { x: 50, y: 60 } },
          { id: 'clean-sparkle', delay: 3900, duration: 2000, type: 'sparkle-burst', message: 'Surfaces sparkling! ✨', position: { x: 75, y: 25 } },
          { id: 'clean-done', delay: 5900, duration: 1000, type: 'celebration', message: 'Spotless perfection! 🌟', position: { x: 50, y: 50 } }
        ];
      
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!isActive || isSeriousMode) return;

    const interactions = getServiceInteractions(serviceType);
    const timeouts: NodeJS.Timeout[] = [];

    interactions.forEach(interaction => {
      const timeout = setTimeout(() => {
        console.debug('[Orchestrator] Triggering interaction', interaction.id, interaction);
        setActiveInteractions(prev => [...prev, interaction]);
        
        triggerBeat({
          id: interaction.id,
          timestamp: Date.now(),
          type: 'interaction',
          content: interaction.message,
          position: interaction.position
        });

        // Remove interaction after its duration
        setTimeout(() => {
          setActiveInteractions(prev => prev.filter(i => i.id !== interaction.id));
        }, interaction.duration);
      }, interaction.delay);

      timeouts.push(timeout);
    });

    // Trigger completion
    const totalDuration = Math.max(...interactions.map(i => i.delay + i.duration));
    const completeTimeout = setTimeout(() => {
      console.debug('[Orchestrator] Sequence complete for', serviceType);
      onComplete?.();
    }, totalDuration + 500);

    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      setActiveInteractions([]);
    };
  }, [isActive, serviceType, isSeriousMode, triggerBeat, onComplete]);

  // Manual one-off trigger for extra interactivity
  useEffect(() => {
    if (!manualTriggerKey || isSeriousMode) return;
    const now = Date.now();
    const extra: InteractionBeat = serviceType === 'pest'
      ? { id: `manual-pest-${now}`, delay: 0, duration: 1500, type: 'pest-retreat', message: 'Pests retreat!', position: { x: 60, y: 30 } }
      : { id: `manual-sparkle-${now}`, delay: 0, duration: 1300, type: 'sparkle-burst', message: 'Extra sparkle!', position: { x: 55, y: 45 } };
    console.debug('[Orchestrator] Manual trigger', extra.id, extra);
    setActiveInteractions(prev => [...prev, extra]);
    triggerBeat({ id: extra.id, timestamp: now, type: 'interaction', content: extra.message, position: extra.position });
    const rm = setTimeout(() => setActiveInteractions(prev => prev.filter(i => i.id !== extra.id)), extra.duration);
    return () => clearTimeout(rm);
  }, [manualTriggerKey, isSeriousMode, serviceType, triggerBeat]);

  const renderInteraction = (interaction: InteractionBeat) => {
    const baseClasses = "absolute pointer-events-none z-50";
    const style = {
      left: `${interaction.position?.x ?? 50}%`,
      top: `${interaction.position?.y ?? 50}%`,
      transform: 'translate(-50%, -50%)'
    };

    switch (interaction.type) {
      case 'squeegee':
        return (
          <motion.div
            key={interaction.id}
            className={`${baseClasses} w-32 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full`}
            style={style}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full"
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        );

      case 'pest-retreat':
        return (
          <motion.div
            key={interaction.id}
            className={`${baseClasses} text-6xl drop-shadow-lg`}
            style={style}
            initial={{ scale: 0.8, rotate: 0, x: 0, y: 0 }}
            animate={{
              scale: [0.8, 1, 0.9, 1],
              rotate: [0, 15, -10, 0],
              x: [0, -120],
              y: [0, -10],
            }}
            exit={{ opacity: 0, x: -180 }}
            transition={{ duration: Math.max(interaction.duration / 1000, 0.8), ease: "easeInOut" }}
          >
            🐛💨
          </motion.div>
        );

      case 'sparkle-burst':
        return (
          <motion.div
            key={interaction.id}
            className={`${baseClasses}`}
            style={style}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 40,
                  y: Math.sin(i * 45 * Math.PI / 180) * 40
                }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        );

      case 'celebration':
        return (
          <motion.div
            key={interaction.id}
            className={`${baseClasses} text-7xl drop-shadow-lg`}
            style={style}
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: [0, 1.2, 1], y: 0 }}
            exit={{ scale: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            🎉
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSeriousMode) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      <AnimatePresence>
        {activeInteractions.map(renderInteraction)}
      </AnimatePresence>
    </div>
  );
};