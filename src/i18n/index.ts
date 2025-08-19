import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        services: 'Services',
        pool: 'Pool Maintenance',
        pest: 'Pest Control',
        deepClean: 'Deep Cleaning',
        locations: 'Locations',
        about: 'About',
        pricing: 'Pricing',
        reviews: 'Reviews & Cases',
        blog: 'Blog',
        contact: 'Contact',
        legal: 'Legal'
      },
      // Common
      common: {
        getQuote: 'Get Quote',
        bookNow: 'Book Now',
        callNow: 'Call Now',
        learnMore: 'Learn More',
        readMore: 'Read More',
        viewAll: 'View All',
        loading: 'Loading...',
        error: 'Something went wrong',
        success: 'Success!',
        phone: '+971 XX XXX XXXX',
        email: 'info@buildcare.ae',
        whatsapp: 'WhatsApp Us'
      },
      // Home
      home: {
        hero: {
          title: 'Professional Building Care Services in UAE',
          subtitle: 'From pool maintenance to pest control - we keep your property pristine with our kawaii touch',
          cta: 'Explore Services',
          pool: {
            title: 'Crystal Clear Pools, Year-Round Bliss',
            subtitle: 'Professional pool maintenance that keeps your oasis sparkling clean and swim-ready',
            description: 'Comprehensive cleaning, chemical balancing, and expert care for a safe, sparkling pool.',
            storyCaption: 'Watch our expert team transform your pool into a pristine paradise',
            benefits: ['Weekly maintenance', 'Chemical balancing', 'Emergency repairs', 'Equipment servicing'],
            primaryCta: 'Book Free Pool Inspection',
            benefit1: 'Professional deep cleaning',
            benefit2: 'Chemical balancing and testing',
            benefit3: 'Equipment maintenance and repairs',
            badge: 'Pool Perfected!'
          },
          pest: {
            title: 'Gentle Pest Solutions That Work',
            subtitle: 'Family-safe treatments that effectively protect your home from unwanted visitors',
            description: 'Family-safe, pet-friendly treatments that make pests retreat fast and stay away.',
            storyCaption: 'See how we make pests retreat while keeping your family safe',
            benefits: ['Family-safe treatments', 'Pet-friendly', 'Follow-up visits', 'Warranty included'],
            primaryCta: 'Book Free Pest Inspection',
            badge: 'Mission Accomplished!',
            benefit1: 'Family-safe treatment methods',
            benefit2: '24/7 pest monitoring',
            benefit3: '100% satisfaction guarantee'
          },
          deepClean: {
            title: 'Deep Clean Magic That Sparkles',
            subtitle: 'Eco-friendly deep cleaning that transforms every corner of your space',
            description: 'Floor-to-ceiling deep cleaning with eco-friendly products and meticulous detail.',
            storyCaption: 'Experience the magical transformation of deep cleaning excellence',
            benefits: ['Eco-friendly products', 'Post-clean inspection', 'Satisfaction guarantee', 'Room-by-room care'],
            primaryCta: 'Book Free Cleaning Quote',
            badge: 'Spotless Perfection!',
            benefit1: 'Professional grade equipment',
            benefit2: 'Eco-friendly cleaning products',
            benefit3: 'Detailed cleaning checklist'
          },
          ctaButtons: {
            whatsapp: 'Get Quote on WhatsApp',
            learnMore: 'Learn More'
          }
        }
      },
      // Services
      services: {
        pool: {
          title: 'Pool Maintenance',
          description: 'Crystal clear water all year round'
        },
        pest: {
          title: 'Pest Control',
          description: 'Safe, effective, family-friendly solutions'  
        },
        deepClean: {
          title: 'Deep Cleaning',
          description: 'Professional cleaning that sparkles'
        }
      },
      // Locations
      locations: {
        emirates: 'Emirates',
        dubai: 'Dubai Neighborhoods',
        abudhabi: 'Abu Dhabi',
        sharjah: 'Sharjah',
        ajman: 'Ajman',
        rak: 'Ras Al Khaimah',
        fujairah: 'Fujairah',
        uaq: 'Umm Al Quwain'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        pool: 'صيانة المسابح',
        pest: 'مكافحة الآفات',
        deepClean: 'التنظيف العميق',
        locations: 'المواقع',
        about: 'عن الشركة',
        pricing: 'الأسعار',
        reviews: 'المراجعات والحالات',
        blog: 'المدونة',
        contact: 'اتصل بنا',
        legal: 'قانوني'
      },
      common: {
        getQuote: 'احصل على عرض سعر',
        bookNow: 'احجز الآن',
        callNow: 'اتصل الآن',
        learnMore: 'اعرف المزيد',
        readMore: 'اقرأ المزيد',
        viewAll: 'عرض الكل',
        loading: 'جاري التحميل...',
        error: 'حدث خطأ ما',
        success: 'نجح!',
        phone: '+971 XX XXX XXXX',
        email: 'info@buildcare.ae',
        whatsapp: 'راسلنا واتساب'
      },
      home: {
        hero: {
          title: 'خدمات العناية المهنية بالمباني في دولة الإمارات',
          subtitle: 'من صيانة المسابح إلى مكافحة الآفات - نحافظ على ممتلكاتك نظيفة',
          cta: 'استكشف الخدمات',
          pool: {
            title: 'مسابح صافية، سعادة على مدار السنة',
            subtitle: 'صيانة مسابح مهنية تحافظ على واحة منزلك نظيفة وجاهزة للسباحة',
            description: 'تنظيف شامل وتوازن للمواد الكيميائية ورعاية خبيرة لمسبح آمن ولامع.',
            storyCaption: 'شاهد فريقنا الخبير يحول مسبحك إلى جنة نظيفة',
            benefits: ['صيانة أسبوعية', 'توازن المواد الكيميائية', 'إصلاحات طارئة', 'خدمة المعدات'],
            primaryCta: 'احجز فحص مسبح مجاني',
            benefit1: 'تنظيف عميق احترافي',
            benefit2: 'توازن المواد الكيميائية والاختبار',
            benefit3: 'صيانة وإصلاح المعدات',
            badge: 'مسبح مثالي!'
          },
          pest: {
            title: 'حلول لطيفة ضد الآفات تعمل بفعالية',
            subtitle: 'علاجات آمنة للعائلة تحمي منزلك بفعالية من الزوار غير المرغوب فيهم',
            description: 'علاجات آمنة للعائلة وصديقة للحيوانات الأليفة تُبعد الآفات بسرعة وتمنع عودتها.',
            storyCaption: 'شاهد كيف نجعل الآفات تتراجع مع الحفاظ على سلامة عائلتك',
            benefits: ['علاجات آمنة للعائلة', 'صديقة للحيوانات الأليفة', 'زيارات متابعة', 'ضمان مشمول'],
            primaryCta: 'احجز فحص آفات مجاني',
            badge: 'تمت المهمة!',
            benefit1: 'طرق علاج آمنة للعائلة',
            benefit2: 'مراقبة الآفات على مدار الساعة',
            benefit3: 'ضمان الرضا 100%'
          },
          deepClean: {
            title: 'سحر التنظيف العميق الذي يلمع',
            subtitle: 'تنظيف عميق صديق للبيئة يحول كل زاوية في مساحتك',
            description: 'تنظيف عميق من الأرض إلى السقف بمنتجات صديقة للبيئة واهتمام دقيق بالتفاصيل.',
            storyCaption: 'اختبر التحول السحري لتميز التنظيف العميق',
            benefits: ['منتجات صديقة للبيئة', 'فحص ما بعد التنظيف', 'ضمان الرضا', 'العناية غرفة بغرفة'],
            primaryCta: 'احجز عرض تنظيف مجاني',
            badge: 'مثالية بلا عيوب!',
            benefit1: 'معدات احترافية',
            benefit2: 'منتجات تنظيف صديقة للبيئة',
            benefit3: 'قائمة تنظيف مفصلة'
          },
          ctaButtons: {
            whatsapp: 'احصل على عرض أسعار على واتساب',
            learnMore: 'اعرف أكثر'
          }
        }
      },
      services: {
        pool: {
          title: 'صيانة المسابح',
          description: 'مياه صافية طوال العام'
        },
        pest: {
          title: 'مكافحة الآفات', 
          description: 'حلول آمنة وفعالة ومناسبة للعائلة'
        },
        deepClean: {
          title: 'التنظيف العميق',
          description: 'تنظيف مهني يلمع'
        }
      },
      locations: {
        emirates: 'الإمارات',
        dubai: 'أحياء دبي',
        abudhabi: 'أبو ظبي',
        sharjah: 'الشارقة',
        ajman: 'عجمان',
        rak: 'رأس الخيمة',
        fujairah: 'الفجيرة',
        uaq: 'أم القيوين'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'buildcare-language',
      caches: ['localStorage']
    }
  });

export default i18n;