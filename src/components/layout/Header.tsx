import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDirection } from '@/hooks/useDirection';
import { SeriousModeToggle } from '@/components/anime/SeriousModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const navigation = [
    { name: t('nav.home'), href: '/', current: location.pathname === '/' },
    { 
      name: t('nav.services'), 
      href: '/services',
      children: [
        { name: t('nav.pool'), href: '/services/pool' },
        { name: t('nav.pest'), href: '/services/pest' },
        { name: t('nav.deepClean'), href: '/services/deep-clean' },
      ]
    },
    { 
      name: t('nav.locations'), 
      href: '/locations',
      children: [
        { name: t('locations.emirates'), href: '/locations/emirates' },
        { name: t('locations.dubai'), href: '/locations/dubai' },
      ]
    },
    { name: t('nav.about'), href: '/about', current: location.pathname === '/about' },
    { name: t('nav.pricing'), href: '/pricing', current: location.pathname === '/pricing' },
    { name: t('nav.reviews'), href: '/reviews', current: location.pathname === '/reviews' },
    { name: t('nav.blog'), href: '/blog', current: location.pathname === '/blog' },
    { name: t('nav.contact'), href: '/contact', current: location.pathname === '/contact' },
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* GTM Placeholder */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold text-primary">
              BuildCare
            </div>
            <div className="text-sm text-secondary font-display">UAE</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-1">
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isRTL ? 'end' : 'start'}>
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.name} asChild>
                          <Link to={child.href} className="w-full">
                            {child.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      item.current ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Serious Mode Toggle */}
            <SeriousModeToggle />
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{i18n.language.toUpperCase()}</span>
            </Button>

            {/* CTA Button */}
            <Button variant="kawaii" size="sm" className="hidden md:inline-flex">
              {t('common.getQuote')}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t py-4"
            >
              <div className="space-y-3">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className={`${isRTL ? 'mr-4' : 'ml-4'} space-y-2`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block py-1 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="kawaii" className="w-full mt-4">
                  {t('common.getQuote')}
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};