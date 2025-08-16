import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Building2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dubai = () => {
  const { t } = useTranslation();

  const neighborhoods = [
    { name: 'Downtown Dubai', type: 'Commercial', response: '15 min', icon: Building2 },
    { name: 'Dubai Marina', type: 'Residential', response: '20 min', icon: Home },
    { name: 'Business Bay', type: 'Mixed Use', response: '18 min', icon: Building2 },
    { name: 'Dubai Hills', type: 'Residential', response: '25 min', icon: Home },
    { name: 'City Walk', type: 'Commercial', response: '22 min', icon: Building2 },
    { name: 'JLT', type: 'Mixed Use', response: '20 min', icon: Building2 },
    { name: 'Palm Jumeirah', type: 'Luxury', response: '30 min', icon: Home },
    { name: 'Dubai South', type: 'Mixed Use', response: '35 min', icon: Building2 },
    { name: 'Al Barsha', type: 'Residential', response: '25 min', icon: Home },
    { name: 'Deira', type: 'Heritage', response: '20 min', icon: Building2 },
    { name: 'Bur Dubai', type: 'Heritage', response: '18 min', icon: Building2 },
    { name: 'Jumeirah', type: 'Luxury', response: '28 min', icon: Home },
  ];

  const serviceAreas = [
    {
      title: 'Premium Zones',
      areas: ['Downtown Dubai', 'Dubai Marina', 'Business Bay', 'Palm Jumeirah'],
      response: '15-20 min',
      color: 'primary'
    },
    {
      title: 'Residential Areas',
      areas: ['Dubai Hills', 'Al Barsha', 'Jumeirah', 'JLT'],
      response: '20-25 min',
      color: 'secondary'
    },
    {
      title: 'Heritage Districts',
      areas: ['Deira', 'Bur Dubai', 'Al Fahidi', 'Karama'],
      response: '18-22 min',
      color: 'accent'
    },
    {
      title: 'Emerging Areas',
      areas: ['Dubai South', 'City Walk', 'Mohammed Bin Rashid City'],
      response: '25-35 min',
      color: 'pool'
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/15 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
              {t('locations.dubai')} Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto">
              Comprehensive building care services across Dubai's diverse neighborhoods. 
              From Downtown's skyscrapers to Palm Jumeirah's luxury villas - we've got you covered.
            </p>
            <Button variant="kawaii" size="kawaii">
              Find My Neighborhood
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Service Areas Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Dubai Service Zones
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Organized coverage for efficient and reliable service delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceAreas.map((zone, index) => (
              <motion.div
                key={zone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                    {zone.title}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Response Time:</div>
                    <div className={`text-lg font-semibold text-${zone.color}`}>
                      {zone.response}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {zone.areas.map((area) => (
                      <div key={area} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-body text-muted-foreground">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              All Dubai Neighborhoods
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Complete coverage across Dubai's dynamic landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow text-center">
                  <neighborhood.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-display font-semibold text-sm mb-1">
                    {neighborhood.name}
                  </h3>
                  <div className="text-xs text-muted-foreground mb-1">
                    {neighborhood.type}
                  </div>
                  <div className="text-xs text-secondary font-semibold">
                    {neighborhood.response}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai Specialties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Dubai-Specific Expertise
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Specialized services for Dubai's unique building requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-display font-semibold mb-4">
                  High-Rise Buildings
                </h3>
                <p className="text-muted-foreground font-body">
                  Specialized equipment and techniques for Dubai's iconic skyscrapers and tower maintenance.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 text-center">
                <Home className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-display font-semibold mb-4">
                  Luxury Villas
                </h3>
                <p className="text-muted-foreground font-body">
                  Premium care for Dubai's luxury residential properties including pools, gardens, and premium facilities.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-display font-semibold mb-4">
                  Mixed-Use Complexes
                </h3>
                <p className="text-muted-foreground font-body">
                  Comprehensive maintenance for Dubai's innovative mixed-use developments and communities.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/15 to-secondary/15">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Serving All of Dubai
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              From the historic charm of old Dubai to the modern marvels of new developments - 
              BuildCare UAE brings professional service to every corner of the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="kawaii" size="kawaii">
                {t('common.callNow')}
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dubai;