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
            benefits: ['Weekly maintenance', 'Chemical balancing', 'Emergency repairs', 'Equipment servicing'],
            primaryCta: 'Book Free Pool Inspection'
          },
          pest: {
            title: 'Gentle Pest Solutions That Work',
            subtitle: 'Family-safe treatments that effectively protect your home from unwanted visitors',
            benefits: ['Family-safe treatments', 'Pet-friendly', 'Follow-up visits', 'Warranty included'],
            primaryCta: 'Book Free Pest Inspection'
          },
          deepClean: {
            title: 'Deep Clean Magic That Sparkles',
            subtitle: 'Eco-friendly deep cleaning that transforms every corner of your space',
            benefits: ['Eco-friendly products', 'Post-clean inspection', 'Satisfaction guarantee', 'Room-by-room care'],
            primaryCta: 'Book Free Cleaning Quote'
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
            benefits: ['صيانة أسبوعية', 'توازن المواد الكيميائية', 'إصلاحات طارئة', 'خدمة المعدات'],
            primaryCta: 'احجز فحص مسبح مجاني'
          },
          pest: {
            title: 'حلول لطيفة ضد الآفات تعمل بفعالية',
            subtitle: 'علاجات آمنة للعائلة تحمي منزلك بفعالية من الزوار غير المرغوب فيهم',
            benefits: ['علاجات آمنة للعائلة', 'صديقة للحيوانات الأليفة', 'زيارات متابعة', 'ضمان مشمول'],
            primaryCta: 'احجز فحص آفات مجاني'
          },
          deepClean: {
            title: 'سحر التنظيف العميق الذي يلمع',
            subtitle: 'تنظيف عميق صديق للبيئة يحول كل زاوية في مساحتك',
            benefits: ['منتجات صديقة للبيئة', 'فحص ما بعد التنظيف', 'ضمان الرضا', 'العناية غرفة بغرفة'],
            primaryCta: 'احجز عرض تنظيف مجاني'
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