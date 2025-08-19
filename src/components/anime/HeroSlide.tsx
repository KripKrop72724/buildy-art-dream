import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { LottieAnimation } from './LottieAnimation';
import { SqueegeEffectOverlay } from './SqueegeEffectOverlay';
import { RippleTransition } from './RippleTransition';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { useTranslation } from 'react-i18next';
import { StoryDirector, useStory } from './StoryDirector';
import { MicroInteractionOrchestrator } from './MicroInteractionOrchestrator';

export interface HeroSlideData {
  service: 'pool' | 'pest' | 'deepClean';
  animationType: 'squeegee' | 'pest-retreat' | 'sparkle-burst';
  animationPath: string;
  fallbackImage: string;
  durationMs: number;
}

interface HeroSlideProps {
  data: HeroSlideData;
}

// Syncs slide-local storyActive to StoryDirector context (must be inside provider)
const StorySync: React.FC<{ active: boolean }> = ({ active }) => {
  const { setStoryActive } = useStory();
  useEffect(() => setStoryActive(active), [active, setStoryActive]);
  return null;
};

export const HeroSlide: React.FC<HeroSlideProps> = ({ data }) => {
  const { isSeriousMode } = useSeriousMode();
  const { t } = useTranslation();
  const [storyActive, setStoryActive] = useState(false);
  const [interactionPhase, setInteractionPhase] = useState(0);
  const [manualTriggerKey, setManualTriggerKey] = useState(0);
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start story sequence when slide mounts
    introTimerRef.current = setTimeout(() => {
      setStoryActive(true);
    }, 500);

    return () => {
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
        introTimerRef.current = null;
      }
      setStoryActive(false);
      setInteractionPhase(0);
    };
  }, [data.service]);


  const getWhatsAppLink = (service: string) => {
    const messages = {
      pool: "Hi! I'd like to book a FREE Pool Maintenance inspection. When can you visit?",
      pest: "Hi! I need help with pest control. Can I schedule a FREE inspection?",
      deepClean: "Hi! I'm interested in your deep cleaning service. Can I get a FREE quote?"
    };
    const message = encodeURIComponent(messages[service as keyof typeof messages]);
    return `https://wa.me/971501234567?text=${message}`;
  };

  const getServiceRoute = (service: string) => {
    const routes = {
      pool: '/services/pool',
      pest: '/services/pest', 
      deepClean: '/services/deep-clean'
    };
    return routes[service as keyof typeof routes];
  };

  // Deterministic positions for consistent visuals
  const getSparklePositions = () => [
    { x: 15, y: 20 },
    { x: 75, y: 15 },
    { x: 25, y: 70 },
    { x: 85, y: 60 },
    { x: 45, y: 25 },
    { x: 65, y: 75 },
    { x: 10, y: 50 },
    { x: 90, y: 40 }
  ];

  const renderMicroInteraction = () => {
    if (isSeriousMode) return null;
    
    switch (data.animationType) {
      case 'squeegee':
        return (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0 }}
          >
            <SqueegeEffectOverlay 
              trigger={storyActive}
              className="absolute inset-0"
            >
              <div />
            </SqueegeEffectOverlay>
            {/* Pool completion badge */}
            <motion.div
              className="absolute top-6 right-6 z-30"
              initial={{ opacity: 0, scale: 0, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 6.5, duration: 0.6, ease: "backOut" }}
            >
              <div className="bg-blue-50/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-blue-700 shadow-lg border border-blue-200">
                {t('home.hero.pool.badge')}
              </div>
            </motion.div>
          </motion.div>
        );
      case 'pest-retreat':
        return (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Pest retreat path */}
            <motion.div
              className="absolute bottom-4 right-4 w-24 h-1 bg-gradient-to-l from-red-400/40 to-transparent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
            />
            {/* Animated pest retreat */}
            <motion.div
              className="absolute text-2xl"
              style={{ left: '80%', top: '20%' }}
              initial={{ x: 0, rotate: 0, scale: 1 }}
              animate={{ x: -100, rotate: 45, scale: 0.7 }}
              transition={{ delay: 3.0, duration: 2.0, ease: "easeOut" }}
            >
              🐛💨
            </motion.div>
            {/* White flag surrender */}
            <motion.div
              className="absolute text-xl"
              style={{ left: '70%', top: '30%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.0, duration: 0.5 }}
            >
              🏳️
            </motion.div>
            {/* Mission accomplished badge */}
            <motion.div
              className="absolute bottom-8 right-8 z-30"
              initial={{ opacity: 0, x: 30, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 5.0, duration: 0.6, ease: "backOut" }}
            >
              <div className="bg-red-50/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-red-700 shadow-lg border border-red-200">
                {t('home.hero.pest.badge')}
              </div>
            </motion.div>
          </div>
        );
      case 'sparkle-burst':
        return (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Deterministic sparkles */}
            {getSparklePositions().map((pos, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl will-change-transform"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2.0,
                  delay: 2.0 + (i * 0.2),
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
            {/* Bubble effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute w-4 h-4 rounded-full bg-blue-200/60"
                style={{ 
                  left: `${20 + (i * 12)}%`, 
                  top: `${60 + (i % 2 * 20)}%` 
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  y: -50
                }}
                transition={{
                  duration: 2.5,
                  delay: 3.5 + (i * 0.3),
                  ease: "easeOut"
                }}
              />
            ))}
            {/* Spotless perfection badge */}
            <motion.div
              className="absolute top-6 right-6 z-30"
              initial={{ opacity: 0, scale: 0, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 7.0, duration: 0.6, ease: "backOut" }}
            >
              <div className="bg-green-50/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-green-700 shadow-lg border border-green-200">
                {t('home.hero.deepClean.badge')}
              </div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <StoryDirector duration={data.durationMs} onStoryComplete={() => setStoryActive(false)}>
      <StorySync active={storyActive} />
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
        
        {/* Content */}
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Content Side */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t(`home.hero.${data.service}.title`)}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {t(`home.hero.${data.service}.subtitle`)}
              </motion.p>
              <motion.p 
                className="text-sm md:text-base text-primary/80 font-medium italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t(`home.hero.${data.service}.storyCaption`)}
              </motion.p>
            </div>

            <motion.div 
              className="prose prose-sm md:prose-base max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="text-muted-foreground">
                {t(`home.hero.${data.service}.description`)}
              </p>
            </motion.div>

            <motion.ul 
              className="space-y-2 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    {t(`home.hero.${data.service}.benefit${item}`)}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => window.open(getWhatsAppLink(data.service), '_blank')}
              >
                {t('home.hero.ctaButtons.whatsapp')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => window.location.href = getServiceRoute(data.service)}
              >
                {t('home.hero.ctaButtons.learnMore')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Animation Side */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md aspect-square" onClick={() => setManualTriggerKey((k) => k + 1)}>
              <LottieAnimation
                animationPath={data.animationPath}
                fallbackImage={data.fallbackImage}
                className="w-full h-full"
                loop={!isSeriousMode}
                autoplay={storyActive && !isSeriousMode}
                trigger="viewport"
              />
              
              {/* Interactive Micro-Orchestrator */}
              <MicroInteractionOrchestrator
                serviceType={data.service}
                isActive={storyActive}
                onComplete={() => setInteractionPhase(prev => prev + 1)}
                manualTriggerKey={manualTriggerKey}
              />
              
              {/* Traditional micro-interaction overlays for fallback */}
              {isSeriousMode && renderMicroInteraction()}
              
              {/* Decorative elements */}
              {!isSeriousMode && (
                <>
                  <motion.div 
                    className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </StoryDirector>
  );
};