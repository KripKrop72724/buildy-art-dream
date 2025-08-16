import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Emirates = () => {
  const { t } = useTranslation();

  const emirates = [
    {
      name: t('locations.dubai'),
      coverage: '100%',
      response: '30 min',
      specialties: ['Luxury Properties', 'High-Rise Buildings', 'Marina Areas'],
      href: '/locations/dubai'
    },
    {
      name: t('locations.abudhabi'),
      coverage: '95%',
      response: '45 min',
      specialties: ['Government Buildings', 'Cultural Sites', 'Island Properties'],
      href: '/locations/abu-dhabi'
    },
    {
      name: t('locations.sharjah'),
      coverage: '90%',
      response: '40 min',
      specialties: ['Industrial Areas', 'Educational Facilities', 'Heritage Buildings'],
      href: '/locations/sharjah'
    },
    {
      name: t('locations.ajman'),
      coverage: '85%',
      response: '35 min',
      specialties: ['Residential Complexes', 'Beachfront Properties', 'Commercial Centers'],
      href: '/locations/ajman'
    },
    {
      name: t('locations.rak'),
      coverage: '80%',
      response: '50 min',
      specialties: ['Mountain Resorts', 'Coastal Properties', 'Adventure Facilities'],
      href: '/locations/rak'
    },
    {
      name: t('locations.fujairah'),
      coverage: '75%',
      response: '60 min',
      specialties: ['Port Facilities', 'Mountain Properties', 'Beach Resorts'],
      href: '/locations/fujairah'
    },
    {
      name: t('locations.uaq'),
      coverage: '70%',
      response: '55 min',
      specialties: ['Agricultural Areas', 'Eco-Tourism', 'Heritage Sites'],
      href: '/locations/uaq'
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
              {t('locations.emirates')} Coverage
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto">
              Professional building care services across all seven emirates of the UAE. 
              Our kawaii team is ready to serve you wherever you are.
            </p>
            <Button variant="kawaii" size="kawaii">
              Find Your Area
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Emirates Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Service Areas
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Comprehensive coverage across the United Arab Emirates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emirates.map((emirate, index) => (
              <motion.div
                key={emirate.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-display font-semibold">
                      {emirate.name}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-body">Coverage:</span>
                      <span className="font-semibold text-primary">{emirate.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-body">Response Time:</span>
                      <span className="font-semibold text-secondary">{emirate.response}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-display font-semibold mb-3 text-foreground">
                      Specialties:
                    </h4>
                    <ul className="space-y-2">
                      {emirate.specialties.map((specialty) => (
                        <li key={specialty} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-sm text-muted-foreground font-body">
                            {specialty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <a href={emirate.href}>
                      View Details
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Stats */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-display font-bold text-primary mb-2">
                7
              </div>
              <div className="text-muted-foreground font-body">
                Emirates Covered
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-display font-bold text-secondary mb-2">
                30min
              </div>
              <div className="text-muted-foreground font-body">
                Average Response Time
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-display font-bold text-accent mb-2">
                24/7
              </div>
              <div className="text-muted-foreground font-body">
                Emergency Service
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Ready to Serve You
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              No matter which emirate you're in, BuildCare UAE is ready to provide professional building care services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="kawaii" size="kawaii">
                {t('common.callNow')}
              </Button>
              <Button variant="secondary" size="lg">
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Emirates;