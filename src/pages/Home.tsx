import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, Star, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PoolMaintenanceLottie, PestControlLottie, DeepCleaningLottie } from '@/components/anime/LottieAnimation';
import { ScrollTriggeredAnimation } from '@/components/anime/ScrollTriggeredAnimation';
import { MultiStepContactForm } from '@/components/forms/MultiStepContactForm';
import { AnimatedHeroCarousel } from '@/components/anime/AnimatedHeroCarousel';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

const Home = () => {
  const { t } = useTranslation();
  const { isSeriousMode } = useSeriousMode();

  const services = [
    {
      title: t('services.pool.title'),
      description: t('services.pool.description'),
      component: PoolMaintenanceLottie,
      href: '/services/pool',
      features: ['Weekly maintenance', 'Chemical balancing', 'Equipment repair', 'Emergency service'],
      pricing: 'From AED 299/month',
      color: 'pool'
    },
    {
      title: t('services.pest.title'),
      description: t('services.pest.description'),
      component: PestControlLottie,
      href: '/services/pest',
      features: ['Safe treatments', 'Family-friendly', 'Follow-up visits', 'Warranty included'],
      pricing: 'From AED 199/visit',
      color: 'pest'
    },
    {
      title: t('services.deepClean.title'),
      description: t('services.deepClean.description'),
      component: DeepCleaningLottie,
      href: '/services/deep-clean',
      features: ['Deep sanitization', 'Eco-friendly products', 'Post-clean inspection', 'Satisfaction guarantee'],
      pricing: 'From AED 149/room',
      color: 'cleaning'
    },
  ];

  const stats = [
    { icon: Users, value: '2000+', label: 'Happy Customers', color: 'primary' },
    { icon: Shield, value: '99%', label: 'Success Rate', color: 'secondary' },
    { icon: Clock, value: '24/7', label: 'Emergency Service', color: 'accent' },
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Mansouri',
      location: 'Dubai Marina',
      rating: 5,
      text: 'BuildCare UAE transformed our pool maintenance experience. The kawaii approach made it so much less stressful, and Pool Buildy always does an amazing job!',
      service: 'Pool Maintenance'
    },
    {
      name: 'Sarah Johnson',
      location: 'Abu Dhabi',
      rating: 5,
      text: 'I was terrified of pest control services until I found BuildCare. Their gentle approach and the adorable mascots made my kids actually excited about the visit!',
      service: 'Pest Control'
    },
    {
      name: 'Mohammad Hassan',
      location: 'Sharjah',
      rating: 5,
      text: 'The deep cleaning service exceeded all expectations. Cleaning Buildy brought actual magic to our home - everything sparkles now!',
      service: 'Deep Cleaning'
    }
  ];

  const areas = [
    { name: 'Dubai', properties: '1200+', response: '15 min' },
    { name: 'Abu Dhabi', properties: '800+', response: '30 min' },
    { name: 'Sharjah', properties: '600+', response: '25 min' },
    { name: 'Ajman', properties: '400+', response: '20 min' },
  ];

  const blogPosts = [
    {
      title: '5 Pool Maintenance Tips for UAE Summer',
      excerpt: 'Keep your pool crystal clear during the hottest months with Pool Buildy\'s expert advice.',
      readTime: '3 min read',
      category: 'Pool Care'
    },
    {
      title: 'Making Pest Control Family-Friendly',
      excerpt: 'How our kawaii approach transforms a scary necessity into a positive experience.',
      readTime: '4 min read',
      category: 'Pest Control'
    },
    {
      title: 'The Magic of Professional Deep Cleaning',
      excerpt: 'Discover the before and after transformations that make Cleaning Buildy so special.',
      readTime: '5 min read',
      category: 'Cleaning'
    }
  ];

  const faqs = [
    {
      question: 'What makes BuildCare UAE different from other maintenance companies?',
      answer: 'Our kawaii approach combines professional service with friendly, approachable mascots that make building maintenance less intimidating and more delightful for everyone involved.'
    },
    {
      question: 'Are your services really family and pet safe?',
      answer: 'Yes! All our cleaning products and pest control treatments are certified family and pet safe. We prioritize your loved ones\' safety above all else.'
    },
    {
      question: 'How quickly can you respond to emergency requests?',
      answer: 'We offer 24/7 emergency service with an average response time of 30 minutes across the UAE. For urgent pool, pest, or cleaning emergencies, we\'re always ready to help.'
    },
    {
      question: 'Do you service all emirates?',
      answer: 'Yes! BuildCare UAE provides comprehensive services across all seven emirates. Response times may vary by location, but we\'re committed to serving the entire UAE community.'
    },
    {
      question: 'Can I schedule regular maintenance visits?',
      answer: 'Absolutely! We offer flexible scheduling options including weekly, bi-weekly, monthly, and custom maintenance plans to fit your specific needs and budget.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Hero Carousel */}
      <AnimatedHeroCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <ScrollTriggeredAnimation 
                key={stat.label}
                animation="scale"
                delay={index * 0.1}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-${stat.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-body">
                    {stat.label}
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiles with Lottie */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Our Kawaii Services
              </h2>
              <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
                Meet our adorable service specialists who make building maintenance fun and professional
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollTriggeredAnimation
                key={service.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <Link to={service.href} className="flex-1">
                    <div className="text-center mb-6">
                      <service.component 
                        size="lg" 
                        trigger="hover"
                        className="mx-auto mb-4 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body mb-4">
                        {service.description}
                      </p>
                      <div className={`text-lg font-semibold text-${service.color} mb-4`}>
                        {service.pricing}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full bg-${service.color} animate-kawaii-pulse`}></span>
                          <span className="font-body text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                  
                  <Button variant={service.color as any} className="w-full mt-auto">
                    Learn More
                  </Button>
                </Card>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Process */}
      <section className="py-20 bg-gradient-to-r from-card/30 to-card/10">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Simple steps to get professional building care
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Contact Us', description: 'Call, message, or use our online form', icon: Phone },
                { step: '02', title: 'Schedule Visit', description: 'We arrange a convenient time for assessment', icon: Clock },
                { step: '03', title: 'Get Service', description: 'Our kawaii team provides professional care', icon: Shield },
                { step: '04', title: 'Enjoy Results', description: 'Sparkling clean, pest-free, well-maintained property', icon: Star },
              ].map((item, index) => (
                <ScrollTriggeredAnimation
                  key={item.step}
                  animation="slideUp"
                  delay={index * 0.15}
                 >
                   <div className="text-center">
                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       <item.icon className="h-8 w-8 text-primary" />
                     </div>
                     <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-display font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm">
                      {item.description}
                    </p>
                  </div>
                </ScrollTriggeredAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Real stories from happy customers across the UAE
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollTriggeredAnimation
                key={testimonial.name}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-body mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-display font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.service}
                    </div>
                  </div>
                </Card>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Service Areas
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Professional building care across the UAE
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-6">
            {areas.map((area, index) => (
              <ScrollTriggeredAnimation
                key={area.name}
                animation="scale"
                delay={index * 0.1}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-display font-bold mb-2 text-foreground">
                    {area.name}
                  </h3>
                  <div className="text-primary font-semibold mb-1">
                    {area.properties} Properties
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Response: {area.response}
                  </div>
                </Card>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teasers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Latest Tips & Stories
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Expert advice and insights from our kawaii team
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollTriggeredAnimation
                key={post.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="text-sm text-primary font-semibold mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground font-body mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {post.readTime}
                  </div>
                </Card>
              </ScrollTriggeredAnimation>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog">
                View All Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Everything you need to know about BuildCare UAE
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

      {/* Compact Lead Form */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollTriggeredAnimation animation="scale">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Ready to Experience the Kawaii Difference?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
                Get your free quote today and let our adorable team take care of your property
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <MultiStepContactForm />
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;