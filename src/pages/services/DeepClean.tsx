import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Leaf, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import buildyCleaningImage from '@/assets/buildy-cleaning.png';

const DeepClean = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Sparkles,
      title: 'Deep Sanitization',
      description: 'Thorough cleaning that reaches every corner',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Products',
      description: 'Safe, green cleaning solutions for your family',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'We work around your schedule and needs',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed or we return',
    },
  ];

  const cleaningAreas = [
    { name: 'Kitchen Deep Clean', description: 'Appliances, countertops, cabinets, and backsplash' },
    { name: 'Bathroom Sanitization', description: 'Tiles, grout, fixtures, and ventilation' },
    { name: 'Living Areas', description: 'Furniture, carpets, windows, and baseboards' },
    { name: 'Bedroom Refresh', description: 'Closets, mattresses, and air purification' },
    { name: 'Office Spaces', description: 'Desks, electronics, and workspace optimization' },
    { name: 'Outdoor Areas', description: 'Patios, balconies, and exterior cleaning' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
                {t('services.deepClean.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                {t('services.deepClean.description')} with Cleaning Buildy, your sparkle specialist.
              </p>
              <Button variant="cleaning" size="kawaii">
                {t('common.bookNow')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center relative"
            >
              <img 
                src={buildyCleaningImage} 
                alt="Cleaning Buildy" 
                className="w-80 mx-auto animate-float"
              />
              {/* Sparkle Effects */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-kawaii-pulse" />
              <div className="absolute top-20 right-20 w-6 h-6 bg-secondary rounded-full animate-kawaii-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-20 left-20 w-3 h-3 bg-primary rounded-full animate-kawaii-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Why Choose Our Deep Cleaning?
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Professional cleaning that transforms your space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Areas */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Areas We Clean
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Comprehensive cleaning for every part of your space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleaningAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    {area.name}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {area.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              The Cleaning Buildy Process
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Our magical step-by-step cleaning transformation
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: '01', title: 'Pre-Cleaning Assessment', description: 'Cleaning Buildy evaluates your space and creates a custom plan' },
                { step: '02', title: 'Preparation & Protection', description: 'Cover furniture and prepare areas for deep cleaning' },
                { step: '03', title: 'Deep Cleaning Magic', description: 'Thorough cleaning with eco-friendly products and techniques' },
                { step: '04', title: 'Sanitization & Sparkle', description: 'Final sanitization and detail work for that perfect finish' },
                { step: '05', title: 'Quality Inspection', description: 'Walk-through with you to ensure 100% satisfaction' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-8"
                >
                  <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-display font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-body">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Promise */}
      <section className="py-20 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                The Transformation Promise
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                Watch your space transform from cluttered to crystal clean with Cleaning Buildy's magical touch
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 bg-muted/50">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-muted-foreground">
                    Before
                  </h3>
                  <ul className="space-y-2 text-left">
                    <li>• Dust and grime buildup</li>
                    <li>• Stained surfaces</li>
                    <li>• Cluttered spaces</li>
                    <li>• Unpleasant odors</li>
                  </ul>
                </Card>
                <Card className="p-8 bg-accent/10 border-accent/20">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-accent">
                    After
                  </h3>
                  <ul className="space-y-2 text-left">
                    <li>• Sparkling clean surfaces</li>
                    <li>• Fresh, sanitized spaces</li>
                    <li>• Organized and tidy</li>
                    <li>• Pleasant, clean scents</li>
                  </ul>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Ready for a Sparkling Clean Space?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              Let Cleaning Buildy transform your space with professional deep cleaning magic
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cleaning" size="kawaii">
                Book Deep Cleaning
              </Button>
              <Button variant="outline" size="lg">
                Get Free Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeepClean;