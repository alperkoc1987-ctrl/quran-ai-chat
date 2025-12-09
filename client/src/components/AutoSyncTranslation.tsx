import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslationLanguage } from "@/contexts/TranslationLanguageContext";
import type { TranslationLanguage } from "@/contexts/TranslationLanguageContext";

/**
 * AutoSyncTranslation component
 * Automatically syncs Quran translation language with UI language
 * Only syncs if user hasn't manually set a translation language
 */
export function AutoSyncTranslation() {
  const { language: uiLanguage } = useLanguage();
  const { language: translationLanguage, setLanguage: setTranslationLanguage } = useTranslationLanguage();

  useEffect(() => {
    // Check if user has manually set translation language
    const manuallySet = localStorage.getItem("translationLanguageManuallySet");
    
    // If manually set, don't auto-sync
    if (manuallySet === "true") {
      return;
    }

    // Map UI language to translation language
    // For unsupported languages, fallback to English
    let targetTranslation: TranslationLanguage;
    
    switch (uiLanguage) {
      case "de":
        targetTranslation = "de";
        break;
      case "en":
        targetTranslation = "en";
        break;
      case "tr":
        targetTranslation = "tr";
        break;
      case "ar":
        targetTranslation = "ar";
        break;
      case "fr":
      case "id":
      case "ur":
        // Fallback to English for languages without Quran translation
        targetTranslation = "en";
        break;
      default:
        targetTranslation = "en";
    }

    // Only update if different
    if (translationLanguage !== targetTranslation) {
      setTranslationLanguage(targetTranslation);
    }
  }, [uiLanguage, translationLanguage, setTranslationLanguage]);

  return null;
}
