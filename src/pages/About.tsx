import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Award, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CharacterShowcase } from '@/components/CharacterShowcase';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: 'Kawaii Care',
      description: 'We believe building maintenance should be approachable and friendly, not intimidating'
    },
    {
      icon: Award,
      title: 'Professional Excellence',
      description: 'Highest quality standards with certified technicians and proven methods'
    },
    {
      icon: Users,
      title: 'Family-First',
      description: 'Safe, family-friendly services that consider your loved ones above all'
    },
    {
      icon: Target,
      title: 'UAE Focus',
      description: 'Deep understanding of local climate, regulations, and cultural needs'
    },
  ];

  const timeline = [
    { year: '2018', title: 'Foundation', description: 'BuildCare UAE founded with a vision to make building maintenance friendly' },
    { year: '2019', title: 'Team Growth', description: 'Expanded to 50+ certified technicians across Dubai' },
    { year: '2020', title: 'Kawaii Revolution', description: 'Introduced our mascot-based approach to make services approachable' },
    { year: '2021', title: 'Emirates Expansion', description: 'Extended services to all seven emirates' },
    { year: '2022', title: 'Digital Innovation', description: 'Launched online booking and customer portal' },
    { year: '2023', title: 'Recognition', description: 'Awarded "Best Customer Service" by UAE Business Awards' },
    { year: '2024', title: 'Future Ready', description: 'Continuing to innovate with eco-friendly solutions' },
  ];

  const stats = [
    { number: '2000+', label: 'Happy Customers' },
    { number: '50+', label: 'Certified Technicians' },
    { number: '7', label: 'Emirates Covered' },
    { number: '99%', label: 'Customer Satisfaction' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
                About BuildCare UAE
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                We're revolutionizing building maintenance in the UAE by combining professional expertise 
                with a kawaii approach that makes property care approachable, friendly, and effective.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="kawaii" size="kawaii">
                  {t('common.getQuote')}
                </Button>
                <Button variant="outline" size="lg">
                  Meet Our Team
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-card rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-display font-semibold mb-6 text-foreground">
                  Our Mission
                </h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  "To transform building maintenance from a necessary chore into a delightful experience, 
                  ensuring every property in the UAE receives professional care with a smile."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-body">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              The principles that guide every service we provide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Story */}
      <section className="py-20 bg-gradient-to-r from-accent/10 to-pool/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Meet Our Kawaii Team
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              The adorable faces behind our professional services
            </p>
          </motion.div>

          <CharacterShowcase />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              From startup to UAE's favorite building care service
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-8"
                >
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-lg shrink-0">
                    {item.year}
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

      {/* Team Culture */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Why We're Different
              </h2>
              <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                  At BuildCare UAE, we believe that professional service doesn't have to be impersonal. 
                  Our kawaii approach breaks down barriers, making building maintenance accessible and 
                  approachable for everyone - from busy families to large corporations.
                </p>
                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                  We've trained our entire team not just in technical expertise, but in customer care 
                  that puts people first. Every interaction is designed to be pleasant, every service 
                  delivered with a smile, and every problem solved with creativity and compassion.
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
              Join thousands of satisfied customers who've discovered that building maintenance 
              can be both professional and delightful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="kawaii" size="kawaii">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg">
                {t('common.callNow')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;