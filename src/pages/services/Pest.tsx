import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Heart, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import buildyPestImage from '@/assets/buildy-pest.png';
import sadRoachImage from '@/assets/sad-roach.png';

const Pest = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: 'Safe & Eco-Friendly',
      description: 'Child and pet-safe treatments that protect your family',
    },
    {
      icon: Heart,
      title: 'Gentle Approach',
      description: 'Non-scary methods that make pest control approachable',
    },
    {
      icon: Users,
      title: 'Family-First',
      description: 'Designed with families and children in mind',
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Results',
      description: 'Follow-up visits and satisfaction guarantee',
    },
  ];

  const pests = [
    'Ants', 'Cockroaches', 'Termites', 'Flies', 'Mosquitoes', 'Spiders',
    'Bedbugs', 'Rats & Mice', 'Silverfish', 'Moths', 'Wasps', 'Beetles'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pest/10 to-pest/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
                {t('services.pest.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                {t('services.pest.description')} with Pest Buildy, making pest control friendly and effective.
              </p>
              <Button variant="pest" size="kawaii">
                {t('common.bookNow')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <img 
                src={buildyPestImage} 
                alt="Pest Buildy" 
                className="w-full animate-chibi-bounce"
              />
              <div className="flex items-center justify-center">
                <img 
                  src={sadRoachImage} 
                  alt="Mr. Sad Roach" 
                  className="w-32 animate-wiggle"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Why Choose Our Pest Control?
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Family-friendly solutions that actually work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-pest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-pest" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pests We Handle */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Pests We Handle
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Comprehensive pest control for all common UAE pests
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {pests.map((pest, index) => (
              <motion.div
                key={pest}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-lg font-display font-semibold text-foreground">
                  {pest}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sad Roach Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={sadRoachImage} 
                alt="Mr. Sad Roach" 
                className="w-32 mx-auto mb-8 animate-wiggle"
              />
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Meet Mr. Sad Roach
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                Our pest control approach is so gentle, even the pests don't mind leaving! 
                Mr. Sad Roach represents our commitment to humane, family-friendly pest management 
                that gets results without scary tactics.
              </p>
              <Card className="p-8 bg-gradient-to-r from-pest/10 to-pest/5">
                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                  The BuildCare Promise
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  "We believe pest control doesn't have to be frightening. Our kawaii approach 
                  combines professional effectiveness with child-friendly methods, ensuring your 
                  family feels safe while we solve your pest problems. Even Mr. Sad Roach agrees - 
                  it's time to find a new home!"
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pest/20 to-pest/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Ready for Pest-Free Living?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              Let Pest Buildy handle your pest problems with safe, effective, family-friendly solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="pest" size="kawaii">
                Schedule Inspection
              </Button>
              <Button variant="outline" size="lg">
                Emergency Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pest;