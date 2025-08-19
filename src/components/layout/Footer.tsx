import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';

export const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const services = [
    { name: t('nav.pool'), href: '/services/pool' },
    { name: t('nav.pest'), href: '/services/pest' },
    { name: t('nav.deepClean'), href: '/services/deep-clean' },
  ];

  const locations = [
    { name: t('locations.dubai'), href: '/locations/dubai' },
    { name: t('locations.abudhabi'), href: '/locations/abu-dhabi' },
    { name: t('locations.sharjah'), href: '/locations/sharjah' },
    { name: t('locations.ajman'), href: '/locations/ajman' },
  ];

  const company = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.pricing'), href: '/pricing' },
    { name: t('nav.reviews'), href: '/reviews' },
    { name: t('nav.blog'), href: '/blog' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/buildcareuae' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/buildcareuae' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/buildcareuae' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/buildcareuae' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-display font-bold text-primary">
                BuildCare
              </div>
              <div className="text-sm text-secondary font-display">UAE</div>
            </div>
            
            <p className="text-sm text-muted-foreground font-body">
              Professional building maintenance services across the UAE. 
              From pool care to pest control, we keep your property pristine with our kawaii touch.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>{t('common.phone')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>{t('common.email')}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              {t('nav.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              {t('nav.locations')}
            </h3>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location.name}>
                  <Link
                    to={location.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">
                {t('nav.legal')}
              </h3>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground font-body">
              © 2024 BuildCare UAE. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground font-body mt-2 md:mt-0 flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="h-3 w-3 text-red-500" /> for the UAE community
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};