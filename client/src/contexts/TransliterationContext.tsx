/**
 * TransliterationContext.tsx
 * Global context for managing transliteration display preference
 */

import { createContext, useContext, useState, ReactNode } from "react";

interface TransliterationContextType {
  showTransliteration: boolean;
  setShowTransliteration: (show: boolean) => void;
}

const TransliterationContext = createContext<TransliterationContextType | undefined>(undefined);

export function TransliterationProvider({ children }: { children: ReactNode }) {
  const [showTransliteration, setShowTransliterationState] = useState<boolean>(() => {
    // Initialize from localStorage (with SSR safety check)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("show_transliteration");
      // Default to true if not set
      return stored === null ? true : stored === "true";
    }
    return true; // Default to true
  });

  const setShowTransliteration = (show: boolean) => {
    setShowTransliterationState(show);
    if (typeof window !== "undefined") {
      localStorage.setItem("show_transliteration", show.toString());
    }
  };

  return (
    <TransliterationContext.Provider value={{ showTransliteration, setShowTransliteration }}>
      {children}
    </TransliterationContext.Provider>
  );
}

export function useTransliteration() {
  const context = useContext(TransliterationContext);
  if (context === undefined) {
    throw new Error("useTransliteration must be used within a TransliterationProvider");
  }
  return context;
}
