import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
              {t('nav.pricing')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto">
              Transparent, competitive pricing for all your building maintenance needs. 
              No hidden fees, just honest kawaii service.
            </p>
            <Button variant="kawaii" size="kawaii">
              {t('common.getQuote')}
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {['Pool Maintenance', 'Pest Control', 'Deep Cleaning'].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-display font-bold mb-4">{service}</h3>
                  <div className="text-4xl font-display font-bold text-primary mb-2">
                    From AED 199
                  </div>
                  <p className="text-muted-foreground font-body mb-6">
                    Professional service with kawaii care
                  </p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;