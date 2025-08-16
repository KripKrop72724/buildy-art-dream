import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BuildyMascot } from '@/components/anime/BuildyMascot';
import { useSeriousMode } from '@/contexts/SeriousModeContext';

interface FormData {
  // Step 1: Service & Location
  serviceType: string;
  location: string;
  urgency: string;
  
  // Step 2: Contact Info  
  name: string;
  phone: string;
  email: string;
  
  // Step 3: Details
  propertyType: string;
  message: string;
  preferredContact: string;
  bestTime: string;
}

const initialFormData: FormData = {
  serviceType: '',
  location: '',
  urgency: '',
  name: '',
  phone: '',
  email: '',
  propertyType: '',
  message: '',
  preferredContact: '',
  bestTime: ''
};

export const MultiStepContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isSeriousMode } = useSeriousMode();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = encodeURIComponent(
      `Hi BuildCare UAE! 👋\n\n` +
      `🏗️ Service: ${formData.serviceType}\n` +
      `📍 Location: ${formData.location}\n` +
      `⚡ Urgency: ${formData.urgency}\n` +
      `🏢 Property: ${formData.propertyType}\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email}\n` +
      `🕐 Best Time: ${formData.bestTime}\n\n` +
      `📝 Details: ${formData.message}\n\n` +
      `I'd like to get a quote for this service. Thank you!`
    );
    
    const phoneNumber = t('common.phone').replace(/[^\d]/g, '');
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent! 🎉",
      description: "We'll get back to you within 30 minutes during business hours.",
    });
    
    // Reset form
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.serviceType && formData.location && formData.urgency;
      case 2:
        return formData.name && formData.phone && formData.email;
      case 3:
        return formData.propertyType && formData.message;
      default:
        return false;
    }
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        {!isSeriousMode && (
          <div className="flex justify-center mb-4">
            <BuildyMascot 
              animation={currentStep === 3 ? 'clean' : 'idle'} 
              size="lg"
            />
          </div>
        )}
        
        <h2 className="text-3xl font-display font-bold mb-2">
          Get Your Free Quote
        </h2>
        <p className="text-muted-foreground font-body">
          Step {currentStep} of 3 - {
            currentStep === 1 ? 'Service Details' :
            currentStep === 2 ? 'Contact Information' :
            'Final Details'
          }
        </p>
        
        {/* Progress Bar */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-colors ${
                step <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="space-y-6"
          >
            {/* Step 1: Service & Location */}
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="serviceType">What service do you need? *</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => updateFormData('serviceType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pool">🏊 Pool Maintenance</SelectItem>
                      <SelectItem value="pest">🐛 Pest Control</SelectItem>
                      <SelectItem value="cleaning">✨ Deep Cleaning</SelectItem>
                      <SelectItem value="maintenance">🔧 General Maintenance</SelectItem>
                      <SelectItem value="emergency">🚨 Emergency Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Which emirate are you in? *</Label>
                  <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
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
                  <Label htmlFor="urgency">How urgent is this? *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">🚨 Emergency (Same day)</SelectItem>
                      <SelectItem value="urgent">⚡ Urgent (Within 2-3 days)</SelectItem>
                      <SelectItem value="soon">📅 Soon (Within a week)</SelectItem>
                      <SelectItem value="flexible">🗓️ Flexible (Anytime)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <>
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select value={formData.preferredContact} onValueChange={(value) => updateFormData('preferredContact', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How would you like us to contact you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">📱 WhatsApp</SelectItem>
                      <SelectItem value="phone">📞 Phone Call</SelectItem>
                      <SelectItem value="email">📧 Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <>
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="What type of property?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">🏠 Apartment</SelectItem>
                      <SelectItem value="villa">🏘️ Villa</SelectItem>
                      <SelectItem value="office">🏢 Office</SelectItem>
                      <SelectItem value="retail">🏪 Retail Space</SelectItem>
                      <SelectItem value="warehouse">🏭 Warehouse</SelectItem>
                      <SelectItem value="other">🏗️ Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bestTime">Best Time to Contact</Label>
                  <Select value={formData.bestTime} onValueChange={(value) => updateFormData('bestTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When can we reach you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">🌅 Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">☀️ Afternoon (12 PM - 6 PM)</SelectItem>
                      <SelectItem value="evening">🌆 Evening (6 PM - 9 PM)</SelectItem>
                      <SelectItem value="anytime">⏰ Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Tell us more about your needs *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Describe your specific requirements, property size, any special concerns, etc..."
                    rows={4}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => window.open(generateWhatsAppMessage(), '_blank')}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
              {!isSubmitting && <Mail className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Contact Options */}
      {currentStep === 3 && (
        <div className="mt-8 pt-6 border-t">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Or contact us directly:
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${t('common.phone').replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${t('common.email')}`}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};