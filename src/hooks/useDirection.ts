import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useDirection = () => {
  const { i18n } = useTranslation();
  
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';
  
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);
  
  return { direction, isRTL };
};