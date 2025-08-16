import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MascotCard } from '@/components/MascotCard';
import buildyPoolImage from '@/assets/buildy-pool.png';
import buildyPestImage from '@/assets/buildy-pest.png';
import buildyCleaningImage from '@/assets/buildy-cleaning.png';

const Home = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.pool.title'),
      description: t('services.pool.description'),
      image: buildyPoolImage,
      variant: 'pool' as const,
      href: '/services/pool',
      features: ['Weekly maintenance', 'Chemical balancing', 'Equipment repair', 'Emergency service']
    },
    {
      title: t('services.pest.title'),
      description: t('services.pest.description'),
      image: buildyPestImage,
      variant: 'pest' as const,
      href: '/services/pest',
      features: ['Safe treatments', 'Family-friendly', 'Follow-up visits', 'Warranty included']
    },
    {
      title: t('services.deepClean.title'),
      description: t('services.deepClean.description'),
      image: buildyCleaningImage,
      variant: 'cleaning' as const,
      href: '/services/deep-clean',
      features: ['Deep sanitization', 'Eco-friendly products', 'Post-clean inspection', 'Satisfaction guarantee']
    },
  ];

  const stats = [
    { icon: Users, value: '2000+', label: 'Happy Customers' },
    { icon: Shield, value: '99%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Emergency Service' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-card/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-body max-w-lg">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="kawaii" size="kawaii" asChild>
                  <Link to="/services">
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    {t('common.callNow')}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={buildyPoolImage} 
                  alt="Pool Buildy" 
                  className="w-full animate-float"
                />
                <img 
                  src={buildyPestImage} 
                  alt="Pest Buildy" 
                  className="w-full animate-chibi-bounce"
                />
                <img 
                  src={buildyCleaningImage} 
                  alt="Cleaning Buildy" 
                  className="w-full animate-float"
                />
                <div className="bg-gradient-primary rounded-2xl p-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-display font-bold">UAE</div>
                    <div className="text-sm">Trusted</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full animate-chibi-bounce" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-body">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Our Kawaii Services
            </h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Meet our adorable service specialists who make building maintenance fun and professional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <MascotCard
                    title={service.title}
                    description={service.description}
                    image={service.image}
                    variant={service.variant}
                    features={service.features}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Ready for Professional Care?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              Get a free quote today and let our kawaii team take care of your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="kawaii" size="kawaii" asChild>
                <Link to="/contact">
                  {t('common.getQuote')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;