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
    case "fr":
      return "fr.hamidullah"; // French - Muhammad Hamidullah
    case "id":
      return "id.indonesian"; // Indonesian - Indonesian Ministry of Religious Affairs
    case "ur":
      return "ur.jalandhry"; // Urdu - Fateh Muhammad Jalandhry
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
    case "fr":
      return "Muhammad Hamidullah";
    case "id":
      return "Indonesian Ministry";
    case "ur":
      return "Fateh Muhammad Jalandhry";
    default:
      return "Bubenheim & Elyas";
  }
}
