import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, MessageCircle, Mail, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDirection } from '@/hooks/useDirection';

export const FloatingContactDock = () => {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const [isExpanded, setIsExpanded] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      label: t('common.callNow'),
      href: `tel:${t('common.phone').replace(/\s/g, '')}`,
      color: 'bg-pool text-pool-foreground hover:bg-pool/90',
      delay: 0.1
    },
    {
      icon: MessageCircle,
      label: t('common.whatsapp'),
      href: `https://wa.me/${t('common.phone').replace(/[^\d]/g, '')}`,
      color: 'bg-accent text-accent-foreground hover:bg-accent/90',
      delay: 0.2
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${t('common.email')}`,
      color: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      delay: 0.3
    }
  ];

  return (
    <div className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`}>
      <div className="flex flex-col items-center space-y-3">
        {/* Contact Methods */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex flex-col space-y-3"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  transition={{ delay: method.delay }}
                  className={`
                    group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg
                    transition-all duration-300 hover:scale-110 ${method.color}
                  `}
                >
                  <method.icon className="h-5 w-5" />
                  
                  {/* Tooltip */}
                  <div className={`
                    absolute ${isRTL ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2
                    bg-card text-card-foreground px-3 py-1.5 rounded-lg shadow-lg text-sm font-body
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
                  `}>
                    {method.label}
                    <div className={`
                      absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45
                      ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}
                    `} />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            relative flex items-center justify-center w-16 h-16 rounded-full 
            bg-primary text-primary-foreground shadow-lg hover:shadow-xl
            transition-all duration-300 hover:scale-110 chibi-bounce
          "
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full animate-kawaii-pulse bg-primary/30" />
        </motion.button>

        {/* Floating CTA */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              absolute ${isRTL ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2
              bg-card text-card-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-body
              whitespace-nowrap pointer-events-none animate-float
            `}
          >
            {t('common.getQuote')}
            <div className={`
              absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-card rotate-45
              ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}
            `} />
          </motion.div>
        )}
      </div>
    </div>
  );
};