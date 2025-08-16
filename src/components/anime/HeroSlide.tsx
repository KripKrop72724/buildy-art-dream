import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from './LottieAnimation';
import { SqueegeEffectOverlay } from './SqueegeEffectOverlay';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RippleTransition } from './RippleTransition';

interface HeroSlideData {
  id: string;
  service: 'pool' | 'pest' | 'deepClean';
  animationType: 'squeegee' | 'pestRetreat' | 'sparkle';
  lottieAnimation: string;
  staticFallback: string;
}

interface HeroSlideProps {
  data: HeroSlideData;
}

export const HeroSlide = ({ data }: HeroSlideProps) => {
  const { isSeriousMode } = useSeriousMode();
  const { t } = useTranslation();

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
    { left: '15%', top: '20%' },
    { left: '75%', top: '15%' },
    { left: '25%', top: '70%' },
    { left: '85%', top: '60%' },
    { left: '45%', top: '25%' },
    { left: '65%', top: '75%' },
    { left: '10%', top: '50%' },
    { left: '90%', top: '40%' }
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
            transition={{ delay: 1.2 }}
          >
            <SqueegeEffectOverlay 
              trigger={true}
              className="absolute inset-0"
            >
              <div />
            </SqueegeEffectOverlay>
          </motion.div>
        );
      case 'pestRetreat':
        return (
          <>
            {/* Retreat path animation */}
            <motion.div
              className="absolute bottom-4 right-4 w-24 h-1 bg-gradient-to-l from-red-400/40 to-transparent rounded-full z-25"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
            />
            {/* Retreat badge */}
            <motion.div
              className="absolute bottom-8 right-8 z-30"
              initial={{ opacity: 0, x: 30, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 3.0, duration: 0.6, ease: "backOut" }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-red-600 shadow-lg border border-red-100">
                {t('home.hero.pest.badge')}
              </div>
            </motion.div>
          </>
        );
      case 'sparkle':
        return (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Deterministic sparkles */}
            {getSparklePositions().map((pos, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl will-change-transform"
                style={{ left: pos.left, top: pos.top }}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.8,
                  delay: 1.5 + (i * 0.15),
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
            {/* Clean status badge */}
            <motion.div
              className="absolute top-6 right-6 z-35"
              initial={{ opacity: 0, scale: 0, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.6, ease: "backOut" }}
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
    <div className="container mx-auto px-4 h-full flex items-center">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Content Side */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.0 }}
            >
              {t(`home.hero.${data.service}.title`)}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t(`home.hero.${data.service}.subtitle`)}
            </motion.p>

            {/* Story Caption */}
            <motion.div
              className="text-lg text-primary/80 font-medium italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t(`home.hero.${data.service}.storyCaption`)}
            </motion.div>

            {/* Benefits List */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {(t(`home.hero.${data.service}.benefits`, { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                <motion.span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                >
                  ✓ {benefit}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button
              size="lg"
              className="btn-kawaii text-lg px-8 relative overflow-hidden group"
              asChild
            >
              <a href={getWhatsAppLink(data.service)}>
                {t(`home.hero.${data.service}.primaryCta`)}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    delay: 2,
                    repeat: Infinity, 
                    repeatDelay: 4 
                  }}
                />
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="text-lg hover:bg-primary/5"
              asChild
            >
              <Link to={getServiceRoute(data.service)}>
                {t('common.learnMore')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animation Side */}
        <motion.div
          className="relative flex items-center justify-center min-h-[400px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main Lottie Animation */}
          <LottieAnimation
            animationPath={data.lottieAnimation}
            fallbackImage={data.staticFallback}
            className="w-full max-w-lg"
            trigger="viewport"
            size="xl"
            loop={true}
            autoplay={true}
          />

          {/* Micro-interactions Overlay */}
          {renderMicroInteraction()}

          {/* Decorative Elements */}
          {!isSeriousMode && (
            <>
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-16 h-16 bg-secondary/10 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};