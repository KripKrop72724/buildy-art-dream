import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Droplets, TestTube, Wrench, Clock, CheckCircle, Star, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { SqueegeEffectOverlay } from '@/components/anime/SqueegeEffectOverlay';
import { PoolRippleTransition } from '@/components/anime/RippleTransition';
import { ScrollTriggeredAnimation } from '@/components/anime/ScrollTriggeredAnimation';
import { BuildyMascot } from '@/components/anime/BuildyMascot';
import { useSeriousMode } from '@/contexts/SeriousModeContext';
import buildyPoolImage from '@/assets/buildy-pool.png';

const Pool = () => {
  const { t } = useTranslation();
  const { isSeriousMode } = useSeriousMode();
  const [activeTab, setActiveTab] = useState('services');
  const [showSqueegeEffect, setShowSqueegeEffect] = useState(false);
  const [showRipples, setShowRipples] = useState(false);

  const services = [
    {
      icon: Droplets,
      title: 'Water Treatment',
      description: 'Crystal clear water with proper chemical balance',
      features: ['pH balancing', 'Chlorine optimization', 'Algae prevention', 'Water clarity']
    },
    {
      icon: TestTube,
      title: 'Chemical Testing',
      description: 'Regular pH and chlorine level monitoring',
      features: ['Weekly testing', 'Digital reports', 'Adjustment recommendations', 'Safety compliance']
    },
    {
      icon: Wrench,
      title: 'Equipment Maintenance',
      description: 'Pump, filter, and heating system service',
      features: ['Pump servicing', 'Filter cleaning/replacement', 'Heater maintenance', 'Equipment inspection']
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Round-the-clock support for urgent issues',
      features: ['Immediate response', 'Equipment failure support', 'Water quality emergencies', 'Holiday coverage']
    },
  ];

  const pricingPlans = [
    {
      name: 'Basic Pool Care',
      price: 'AED 299',
      period: '/month',
      description: 'Essential maintenance for small residential pools',
      features: [
        'Weekly cleaning & skimming',
        'Basic chemical balancing',
        'Filter inspection',
        'Monthly equipment check',
        'WhatsApp support'
      ],
      popular: false
    },
    {
      name: 'Premium Pool Care',
      price: 'AED 499',
      period: '/month',
      description: 'Comprehensive care for medium to large pools',
      features: [
        'Bi-weekly deep cleaning',
        'Advanced chemical management',
        'Equipment maintenance',
        'Algae treatment included',
        'Priority emergency support',
        'Digital water reports'
      ],
      popular: true
    },
    {
      name: 'Luxury Pool Care',
      price: 'AED 799',
      period: '/month',
      description: 'Premium service for luxury pools and resorts',
      features: [
        'Daily monitoring available',
        'Premium chemical systems',
        'Full equipment warranty',
        'Aesthetic enhancements',
        '24/7 dedicated support',
        'Seasonal preparation',
        'Guest event preparation'
      ],
      popular: false
    }
  ];

  const maintenanceChecklist = [
    { category: 'Water Quality', items: [
      'Test pH levels (7.2-7.6)',
      'Check chlorine levels (1-3 ppm)',
      'Monitor alkalinity (80-120 ppm)',
      'Inspect water clarity',
      'Test calcium hardness'
    ]},
    { category: 'Physical Cleaning', items: [
      'Skim surface debris',
      'Vacuum pool floor',
      'Brush walls and tiles',
      'Empty skimmer baskets',
      'Clean pool deck'
    ]},
    { category: 'Equipment Check', items: [
      'Inspect pump operation',
      'Check filter condition',
      'Test heater function',
      'Verify timer settings',
      'Examine safety equipment'
    ]}
  ];

  const galleryImages = [
    {
      before: '/anime/illustrations/pool-before.jpg',
      after: '/anime/illustrations/pool-after.jpg',
      title: 'Villa Pool Transformation - Dubai Hills',
      description: 'From algae-green to crystal clear in just one treatment'
    },
    {
      before: '/anime/illustrations/pool-before-2.jpg', 
      after: '/anime/illustrations/pool-after-2.jpg',
      title: 'Community Pool Revival - Business Bay',
      description: 'Complete renovation and chemical rebalancing'
    },
    {
      before: '/anime/illustrations/pool-before-3.jpg',
      after: '/anime/illustrations/pool-after-3.jpg', 
      title: 'Luxury Resort Pool - Palm Jumeirah',
      description: 'Weekly maintenance ensuring perfect conditions'
    }
  ];

  const faqs = [
    {
      question: 'How often should my pool be serviced?',
      answer: 'For residential pools in the UAE climate, we recommend weekly service during summer (April-October) and bi-weekly during cooler months. Pool Buildy will customize the schedule based on your pool usage and local conditions.'
    },
    {
      question: 'What chemicals do you use and are they safe?',
      answer: 'We use only premium, eco-friendly pool chemicals that are safe for families and pets. All our products meet UAE safety standards and are applied by certified technicians.'
    },
    {
      question: 'Can you service pools during Ramadan or holidays?',
      answer: 'Yes! Our service continues year-round with respectful scheduling during Ramadan and holiday coverage to ensure your pool is always ready when you need it.'
    },
    {
      question: 'What happens if my pool equipment breaks down?',
      answer: 'Our 24/7 emergency service includes equipment failure support. We carry common replacement parts and can arrange same-day repairs for most issues.'
    },
    {
      question: 'Do you provide service in all Dubai areas?',
      answer: 'Yes, Pool Buildy serves all Dubai neighborhoods from Downtown to Dubai South, with average response times of 15-30 minutes depending on your location.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with Squeegee Effect */}
      <SqueegeEffectOverlay 
        trigger={showSqueegeEffect}
        onComplete={() => setShowSqueegeEffect(false)}
      >
        <section className="py-20 bg-gradient-to-br from-pool/10 to-pool/5 relative overflow-hidden">
          <PoolRippleTransition trigger={showRipples}>
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
                    {t('services.pool.description')} with Pool Buildy, your aquatic maintenance specialist who makes pool care delightful and professional.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      variant="pool" 
                      size="kawaii"
                      onClick={() => setShowSqueegeEffect(true)}
                    >
                      {t('common.bookNow')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setShowRipples(true)}
                    >
                      Watch Demo
                    </Button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex items-center gap-4">
                    <img src="/anime/badges/uae-certified.png" alt="UAE Certified" className="w-10 h-10" />
                    <img src="/anime/badges/family-safe.png" alt="Family Safe" className="w-10 h-10" />
                    <img src="/anime/badges/24-7-service.png" alt="24/7 Service" className="w-10 h-10" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center relative"
                >
                  {!isSeriousMode ? (
                    <BuildyMascot 
                      animation="squeegee"
                      size="xl"
                      className="animate-float mx-auto"
                    />
                  ) : (
                    <img 
                      src={buildyPoolImage} 
                      alt="Pool Buildy" 
                      className="w-80 mx-auto"
                    />
                  )}
                  
                  {/* Floating water droplets */}
                  {!isSeriousMode && (
                    <>
                      <motion.div 
                        className="absolute top-10 left-10 w-8 h-8 bg-pool/30 rounded-full"
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute bottom-10 right-10 w-6 h-6 bg-pool/40 rounded-full"
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </PoolRippleTransition>
        </section>
      </SqueegeEffectOverlay>

      {/* Services & Pricing Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Pool Care Services & Pricing
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Comprehensive pool maintenance with transparent pricing
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="checklist">Maintenance Checklist</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <ScrollTriggeredAnimation
                    key={service.title}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                      <div className="w-16 h-16 bg-pool/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <service.icon className="h-8 w-8 text-pool" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body mb-4">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-pool" />
                            <span className="font-body text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </ScrollTriggeredAnimation>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <ScrollTriggeredAnimation
                    key={plan.name}
                    animation="scale"
                    delay={index * 0.1}
                  >
                    <Card className={`p-8 text-center relative h-full flex flex-col ${
                      plan.popular ? 'border-pool border-2' : ''
                    }`}>
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pool text-pool-foreground">
                          Most Popular
                        </Badge>
                      )}
                      
                      <h3 className="text-2xl font-display font-bold mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-display font-bold text-pool">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground font-body mb-6 flex-1">
                        {plan.description}
                      </p>
                      
                      <div className="space-y-3 mb-8 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-pool shrink-0" />
                            <span className="text-sm font-body">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant={plan.popular ? "pool" : "outline"}
                        className="w-full mt-auto"
                      >
                        Choose Plan
                      </Button>
                    </Card>
                  </ScrollTriggeredAnimation>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="checklist" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {maintenanceChecklist.map((category, index) => (
                  <ScrollTriggeredAnimation
                    key={category.category}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <Card className="p-6 h-full">
                      <h3 className="text-xl font-display font-semibold mb-4 text-pool">
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-pool mt-0.5 shrink-0" />
                            <span className="text-sm font-body text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </ScrollTriggeredAnimation>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Pool Transformations
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                See the amazing results Pool Buildy delivers across the UAE
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid lg:grid-cols-3 gap-8">
            {galleryImages.map((item, index) => (
              <ScrollTriggeredAnimation
                key={item.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-2 h-48">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent z-10" />
                      <img 
                        src="/anime/illustrations/pool-service-scene.png" 
                        alt="Before" 
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-l from-green-500/20 to-transparent z-10" />
                      <img 
                        src="/anime/illustrations/pool-service-scene.png" 
                        alt="After" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        After
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pool/20 to-pool/10">
        <div className="container mx-auto px-4 text-center">
          <ScrollTriggeredAnimation animation="scale">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Ready for Crystal Clear Water?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-body">
                Let Pool Buildy take care of your pool with professional, reliable service that brings joy to maintenance
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button variant="pool" size="kawaii" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now - {t('common.phone')}
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Quote
                </Button>
              </div>

              {/* Emergency Service Note */}
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-sm font-body text-destructive">
                  <strong>Pool Emergency?</strong> We offer 24/7 emergency service for equipment failures, 
                  water quality issues, and urgent repairs. Call now for immediate assistance!
                </p>
              </div>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Pool Care FAQ
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Common questions about our pool maintenance services
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="max-w-4xl mx-auto">
            <ScrollTriggeredAnimation animation="slideUp">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-body pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pool;