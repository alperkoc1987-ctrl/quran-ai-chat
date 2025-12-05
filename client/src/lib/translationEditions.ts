/**
 * translationEditions.ts
 * Mapping of translation languages to Quran API edition identifiers
 */

import { TranslationLanguage } from "@/contexts/TranslationLanguageContext";

/**
 * Map translation language to Quran API edition identifier
 * Based on api.alquran.cloud editions
 */
export function getTranslationEdition(language: TranslationLanguage): string {
  switch (language) {
    case "de":
      return "de.bubenheim"; // German - Bubenheim & Elyas
    case "en":
      return "en.sahih"; // English - Sahih International
    case "tr":
      return "tr.diyanet"; // Turkish - Diyanet İşleri
    case "ar":
      return "quran-uthmani"; // Arabic only - no translation
    default:
      return "de.bubenheim"; // Default to German
  }
}

/**
 * Get human-readable name for translation edition
 */
export function getTranslationName(language: TranslationLanguage): string {
  switch (language) {
    case "de":
      return "Bubenheim & Elyas";
    case "en":
      return "Sahih International";
    case "tr":
      return "Diyanet İşleri";
    case "ar":
      return "Nur Arabisch";
    default:
      return "Bubenheim & Elyas";
  }
}
