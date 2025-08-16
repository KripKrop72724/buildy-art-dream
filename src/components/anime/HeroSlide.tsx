import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LottieAnimation } from './LottieAnimation';
import { SqueegeEffectOverlay } from './SqueegeEffectOverlay';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

  const renderMicroInteraction = () => {
    if (isSeriousMode) return null;

    switch (data.animationType) {
      case 'squeegee':
        return <SqueegeEffectOverlay><div /></SqueegeEffectOverlay>;
      case 'pestRetreat':
        return (
          <motion.div
            className="absolute bottom-20 right-20 z-20"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 100, opacity: 0 }}
            transition={{ delay: 2, duration: 3, ease: "easeInOut" }}
          >
            <img 
              src="/anime/pests/pest-retreat-01.png" 
              alt="Friendly pest retreating"
              className="w-16 h-16"
            />
          </motion.div>
        );
      case 'sparkle':
        return (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 3) * 15}%`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  rotate: [0, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  delay: i * 0.2,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
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
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t(`home.hero.${data.service}.title`)}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t(`home.hero.${data.service}.subtitle`)}
            </motion.p>

            {/* Benefits List */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {['Weekly maintenance', 'Chemical balancing', 'Equipment repair', 'Emergency service'].map((benefit: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {benefit}
                </span>
              ))}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button asChild size="lg" className="group">
              <Link to={getServiceRoute(data.service)}>
                {t(`home.hero.${data.service}.primaryCta`)}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="flex gap-3">
              <Button asChild variant="outline" size="lg">
                <a href="tel:+971501234567">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('common.callNow')}
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                <a 
                  href={getWhatsAppLink(data.service)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
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