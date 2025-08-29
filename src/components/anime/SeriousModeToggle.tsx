import { motion } from 'framer-motion';
import { Briefcase, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const SeriousModeToggle = () => {
  const { isSeriousMode, toggleSeriousMode } = useSeriousMode();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSeriousMode}
            className="relative overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{ 
                scale: isSeriousMode ? 0 : 1,
                opacity: isSeriousMode ? 0 : 1 
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart className="h-4 w-4 text-primary" />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{ 
                scale: isSeriousMode ? 1 : 0,
                opacity: isSeriousMode ? 1 : 0 
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </motion.div>

            {/* Invisible spacer to maintain button size */}
            <div className="w-4 h-4 opacity-0">
              <Heart className="h-4 w-4" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-card border shadow-lg">
          <p className="text-sm font-medium">
            {isSeriousMode ? '🌸 Switch to Kawaii Mode' : '💼 Switch to Professional Mode'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {isSeriousMode ? 'Enable cute animations & mascots' : 'Disable animations for business'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};