import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from './en/translation.json';
import translationZhHans from './zh-Hans/translation.json';

export const defaultNS = 'translation';

export const resources = {
  en: { translation: translationEn },
  'zh-Hans': { translation: translationZhHans },
} as const;

function getInitialLanguage() {
  if (typeof localStorage === 'undefined') {
    return 'zh-Hans';
  }

  return localStorage.getItem('admin:lang') || 'zh-Hans';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: {
      zh: ['zh-Hans', 'en'],
      'zh-CN': ['zh-Hans', 'en'],
      default: ['zh-Hans', 'en'],
    },
    fallbackNS: 'translation',
    ns: ['translation'],
    debug: false,
    defaultNS,
    resources,
    supportedLngs: ['en', 'zh-Hans'],
    load: 'currentOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'admin:lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (language) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = language;
  document.documentElement.dir = i18n.dir(language);
});

export default i18n;
