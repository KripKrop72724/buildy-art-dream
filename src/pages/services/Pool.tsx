import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Droplets, TestTube, Wrench, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import buildyPoolImage from '@/assets/buildy-pool.png';

const Pool = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Droplets,
      title: 'Water Treatment',
      description: 'Crystal clear water with proper chemical balance',
    },
    {
      icon: TestTube,
      title: 'Chemical Testing',
      description: 'Regular pH and chlorine level monitoring',
    },
    {
      icon: Wrench,
      title: 'Equipment Maintenance',
      description: 'Pump, filter, and heating system service',
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Round-the-clock support for urgent issues',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pool/10 to-pool/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
                {t('services.pool.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                {t('services.pool.description')} with Pool Buildy, your aquatic maintenance specialist.
              </p>
              <Button variant="pool" size="kawaii">
                {t('common.bookNow')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <img 
                src={buildyPoolImage} 
                alt="Pool Buildy" 
                className="w-80 mx-auto animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Pool Care Services
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Comprehensive pool maintenance for crystal clear water
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
                  <div className="w-16 h-16 bg-pool/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-pool" />
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

      {/* Process Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Our Pool Care Process
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Pool Buildy's step-by-step approach to perfect pool maintenance
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: '01', title: 'Initial Assessment', description: 'Pool Buildy inspects your pool condition and equipment' },
                { step: '02', title: 'Cleaning & Skimming', description: 'Remove debris and clean pool surfaces thoroughly' },
                { step: '03', title: 'Chemical Testing', description: 'Test and balance pH, chlorine, and alkalinity levels' },
                { step: '04', title: 'Equipment Check', description: 'Inspect and maintain pumps, filters, and heating systems' },
                { step: '05', title: 'Final Report', description: 'Detailed service report with recommendations' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-8"
                >
                  <div className="w-16 h-16 bg-pool text-pool-foreground rounded-full flex items-center justify-center font-display font-bold text-xl">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pool/20 to-pool/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Ready for Crystal Clear Water?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              Let Pool Buildy take care of your pool with professional, reliable service
            </p>
            <Button variant="pool" size="kawaii">
              Schedule Pool Service
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pool;