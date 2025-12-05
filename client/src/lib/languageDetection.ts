// Automatic Language Detection based on browser/device settings

export type SupportedLanguage = 'de' | 'en' | 'ar';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
};

/**
 * Detect the user's preferred language from browser settings
 * Priority: localStorage > browser language > default (de for Germany, en otherwise)
 */
export function detectUserLanguage(): SupportedLanguage {
  // Check localStorage first
  const stored = localStorage.getItem('preferredLanguage') as SupportedLanguage;
  if (stored && SUPPORTED_LANGUAGES[stored]) {
    return stored;
  }

  // Detect from browser language
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Extract language code (e.g., 'de-DE' -> 'de')
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Check if it's a supported language
  if (langCode === 'de' || langCode === 'en' || langCode === 'ar') {
    return langCode as SupportedLanguage;
  }
  
  // Default to German for German-speaking regions, English otherwise
  const region = browserLang.split('-')[1]?.toUpperCase();
  if (region === 'DE' || region === 'AT' || region === 'CH') {
    return 'de';
  }
  
  return 'en';
}

/**
 * Save user's language preference
 */
export function saveLanguagePreference(lang: SupportedLanguage): void {
  localStorage.setItem('preferredLanguage', lang);
  
  // Update document direction for RTL languages
  document.documentElement.dir = SUPPORTED_LANGUAGES[lang].direction;
  document.documentElement.lang = lang;
}

/**
 * Get current language
 */
export function getCurrentLanguage(): SupportedLanguage {
  return detectUserLanguage();
}

/**
 * Initialize language settings on app load
 */
export function initializeLanguage(): SupportedLanguage {
  const lang = detectUserLanguage();
  saveLanguagePreference(lang);
  return lang;
}

/**
 * Check if user is in Germany (for default German UI)
 */
export function isUserInGermany(): boolean {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const region = browserLang.split('-')[1]?.toUpperCase();
  return region === 'DE';
}
