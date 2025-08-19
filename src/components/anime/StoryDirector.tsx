import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  ReactNode
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryBeat {
  id: string;
  timestamp: number;
  type: 'intro' | 'action' | 'interaction' | 'payoff' | 'transition';
  content?: string;
  position?: { x: number; y: number };
}

interface StoryContextType {
  currentBeat: StoryBeat | null;
  triggerBeat: (beat: StoryBeat) => void;
  isStoryActive: boolean;
  setStoryActive: (active: boolean) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);
const StoryProgressContext = createContext(0);

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryDirector');
  }
  return context;
};

export const useStoryProgress = () => useContext(StoryProgressContext);

interface StoryDirectorProps {
  children: ReactNode;
  duration: number;
  onStoryComplete?: () => void;
}

export const StoryDirector: React.FC<StoryDirectorProps> = ({
  children,
  duration,
  onStoryComplete
}) => {
  const [currentBeat, setCurrentBeat] = useState<StoryBeat | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryActive, setIsStoryActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const frameRef = useRef<number | null>(null);
  const beatTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    if (!isStoryActive) return;


    const start = startTime ?? Date.now();
    if (!startTime) setStartTime(start);
    const tick = () => {
      if (startTime) {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setStoryProgress(progress);

        if (progress >= 1) {
          setIsStoryActive(false);
          if (import.meta.env.DEV) {
            console.debug('[StoryDirector] Story completed');
          }
          onStoryComplete?.();
          return;
        }
      }
      frameRef.current = requestAnimationFrame(tick); // schedule next frame
    };


    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setStoryProgress(progress);

      if (progress >= 1) {
        setIsStoryActive(false);
        console.debug('[StoryDirector] Story completed');
        onStoryComplete?.();
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStoryActive, startTime, duration, onStoryComplete]);

  // Auto narrative beats tied to progress
  useEffect(() => {
    if (!isStoryActive) return;

    let phase: 'intro' | 'action' | 'payoff' | null = null;
    if (storyProgress < 0.2) phase = 'intro';
    else if (storyProgress < 0.85) phase = 'action';
    else phase = 'payoff';

    if (phase && (currentBeat?.id?.startsWith('auto-') ? !currentBeat : true)) {
      // Avoid spamming same phase twice in a row
      const id = `auto-${phase}-${Date.now()}`;
      const contentMap = {
        intro: 'Assessing surfaces…',
        action: 'Deep cleaning in progress…',
        payoff: 'Spotless perfection!'
      } as const;

      setCurrentBeat({
        id,
        timestamp: Date.now(),
        type: phase === 'intro' ? 'intro' : phase === 'action' ? 'interaction' : 'payoff',
        content: contentMap[phase],
        position: { x: 50, y: 18 }
      });

      if (beatTimeoutRef.current) clearTimeout(beatTimeoutRef.current);
      beatTimeoutRef.current = setTimeout(() => {
        setCurrentBeat(cb => (cb && cb.id === id ? null : cb));
      }, 1600);
      return () => {
        if (beatTimeoutRef.current) {
          clearTimeout(beatTimeoutRef.current);
          beatTimeoutRef.current = null;
        }
      };
    }
  }, [storyProgress, isStoryActive]);


  const triggerBeat = useCallback(
    (beat: StoryBeat) => {
      setCurrentBeat(beat);
      if (!startTime) {
        setStartTime(Date.now());
      }
      if (!isStoryActive) {
        setIsStoryActive(true);
        console.debug('[StoryDirector] Story started', { beatId: beat.id });
      }
    },
    [isStoryActive, startTime]
  );

  const triggerBeat = (beat: StoryBeat) => {
    setCurrentBeat(beat);
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (!isStoryActive) {
      setIsStoryActive(true);
      if (import.meta.env.DEV) {
        console.debug('[StoryDirector] Story started', { beatId: beat.id });
      }
    }
  };


  const setStoryActive = useCallback((active: boolean) => {
    setIsStoryActive(active);
    if (active) {
      setStartTime(Date.now());
      setStoryProgress(0);
    } else {
      setStartTime(null);
      setCurrentBeat(null);
    }
  }, []);

  const contextValue = useMemo(
    () => ({ currentBeat, triggerBeat, isStoryActive, setStoryActive }),
    [currentBeat, triggerBeat, isStoryActive, setStoryActive]
  );

  useEffect(() => {
    return () => {
      if (beatTimeoutRef.current) {
        clearTimeout(beatTimeoutRef.current);
      }
    };
  }, []);

  return (
    <StoryContext.Provider value={contextValue}>
      <StoryProgressContext.Provider value={storyProgress}>
        <div className="relative">
          {children}
          <AnimatePresence>
            {currentBeat && currentBeat.content && (
              <motion.div
                key={currentBeat.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: typeof currentBeat.position?.x === 'number' ? `${currentBeat.position.x}%` : (currentBeat.position?.x || '50%'),
                  top: typeof currentBeat.position?.y === 'number' ? `${currentBeat.position.y}%` : (currentBeat.position?.y || '50%'),
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium backdrop-blur-sm">
                  {currentBeat.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </StoryProgressContext.Provider>
    </StoryContext.Provider>
  );
};