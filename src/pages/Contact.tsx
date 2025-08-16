import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: Phone,
      title: t('common.callNow'),
      value: t('common.phone'),
      description: '24/7 Emergency Service Available',
      href: `tel:${t('common.phone').replace(/\s/g, '')}`,
      color: 'pool'
    },
    {
      icon: MessageCircle,
      title: t('common.whatsapp'),
      value: t('common.phone'),
      description: 'Quick responses via WhatsApp',
      href: `https://wa.me/${t('common.phone').replace(/[^\d]/g, '')}`,
      color: 'accent'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: t('common.email'),
      description: 'Detailed inquiries and quotes',
      href: `mailto:${t('common.email')}`,
      color: 'secondary'
    },
  ];

  const offices = [
    {
      city: 'Dubai',
      address: 'Business Bay, Dubai, UAE',
      phone: '+971 4 XXX XXXX',
      hours: '24/7 Emergency Service',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    {
      city: 'Abu Dhabi',
      address: 'Corniche Area, Abu Dhabi, UAE',
      phone: '+971 2 XXX XXXX',
      hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
      coordinates: { lat: 24.4539, lng: 54.3773 }
    },
    {
      city: 'Sharjah',
      address: 'City Centre, Sharjah, UAE',
      phone: '+971 6 XXX XXXX',
      hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
      coordinates: { lat: 25.3463, lng: 55.4209 }
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
              {t('nav.contact')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto">
              Ready to experience the kawaii difference? Get in touch with BuildCare UAE today. 
              Our friendly team is here to help with all your building maintenance needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Choose your preferred way to connect with us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className={`w-16 h-16 bg-${method.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className={`h-8 w-8 text-${method.color}`} />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-foreground mb-2">
                    {method.value}
                  </p>
                  <p className="text-muted-foreground font-body mb-4">
                    {method.description}
                  </p>
                  <Button 
                    variant={method.color as any} 
                    className="w-full"
                    asChild
                  >
                    <a href={method.href}>
                      Contact Now
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <Input placeholder="+971 XX XXX XXXX" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Service Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pool">Pool Maintenance</SelectItem>
                        <SelectItem value="pest">Pest Control</SelectItem>
                        <SelectItem value="cleaning">Deep Cleaning</SelectItem>
                        <SelectItem value="emergency">Emergency Service</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Location</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your emirate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                        <SelectItem value="ajman">Ajman</SelectItem>
                        <SelectItem value="rak">Ras Al Khaimah</SelectItem>
                        <SelectItem value="fujairah">Fujairah</SelectItem>
                        <SelectItem value="uaq">Umm Al Quwain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <Textarea 
                      placeholder="Tell us about your building maintenance needs..."
                      rows={4}
                    />
                  </div>

                  <Button variant="kawaii" size="kawaii" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-display font-bold text-foreground">
                  Our Offices
                </h3>
                <p className="text-muted-foreground font-body">
                  Visit us at any of our conveniently located offices across the UAE
                </p>

                {offices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h4 className="text-xl font-display font-semibold mb-2">
                            {office.city} Office
                          </h4>
                          <p className="text-muted-foreground font-body mb-2">
                            {office.address}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="h-4 w-4 text-pool" />
                            <span className="text-sm font-body">{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <span className="text-sm font-body">{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {/* Emergency Notice */}
                <Card className="p-6 bg-destructive/10 border-destructive/20">
                  <h4 className="text-lg font-display font-semibold mb-2 text-destructive">
                    Emergency Service
                  </h4>
                  <p className="text-muted-foreground font-body">
                    For urgent building maintenance emergencies, call our 24/7 hotline: 
                    <span className="font-semibold text-destructive ml-1">
                      {t('common.phone')}
                    </span>
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you respond to service requests?",
                answer: "Our average response time is 30 minutes for emergency services and same-day for regular maintenance requests."
              },
              {
                question: "Do you provide services in all emirates?",
                answer: "Yes! We provide comprehensive building care services across all seven emirates of the UAE."
              },
              {
                question: "Are your cleaning products safe for families?",
                answer: "Absolutely! We use eco-friendly, family-safe products that are effective yet gentle on people and pets."
              },
              {
                question: "Can I schedule regular maintenance visits?",
                answer: "Yes, we offer flexible scheduling options including weekly, monthly, and custom maintenance plans."
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <h4 className="text-lg font-display font-semibold mb-3 text-foreground">
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground font-body">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;