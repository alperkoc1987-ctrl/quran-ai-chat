/**
 * ReadingThemeContext.tsx
 * Context for managing visual themes for the entire app
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ReadingTheme = "modern" | "classic" | "sepia" | "dark";

interface ThemeConfig {
  id: ReadingTheme;
  name: string;
  description: string;
  colors: {
    // Backgrounds
    background: string;
    backgroundSecondary: string;
    card: string;
    cardHover: string;
    
    // Text
    text: string;
    textSecondary: string;
    textMuted: string;
    
    // Quran-specific
    arabic: string;
    transliteration: string;
    translation: string;
    verseNumber: string;
    
    // UI Elements
    primary: string;
    primaryHover: string;
    accent: string;
    accentHover: string;
    border: string;
    borderLight: string;
    
    // Interactive
    buttonPrimary: string;
    buttonPrimaryHover: string;
    buttonPrimaryText: string;
    buttonSecondary: string;
    buttonSecondaryHover: string;
    buttonSecondaryText: string;
    
    // Special
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export const READING_THEMES: Record<ReadingTheme, ThemeConfig> = {
  modern: {
    id: "modern",
    name: "Modern Hell",
    description: "Mintgrün mit sanftem Verlauf",
    colors: {
      // Backgrounds
      background: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
      backgroundSecondary: "bg-emerald-50/50",
      card: "bg-white/90 backdrop-blur-sm",
      cardHover: "hover:bg-white",
      
      // Text
      text: "text-slate-900",
      textSecondary: "text-slate-600",
      textMuted: "text-slate-400",
      
      // Quran-specific
      arabic: "text-slate-900",
      transliteration: "text-teal-600",
      translation: "text-slate-700",
      verseNumber: "text-slate-500",
      
      // UI Elements
      primary: "bg-teal-600",
      primaryHover: "hover:bg-teal-700",
      accent: "bg-teal-500",
      accentHover: "hover:bg-teal-600",
      border: "border-slate-200",
      borderLight: "border-slate-100",
      
      // Interactive
      buttonPrimary: "bg-gradient-to-r from-teal-500 to-emerald-600",
      buttonPrimaryHover: "hover:from-teal-600 hover:to-emerald-700",
      buttonPrimaryText: "text-white",
      buttonSecondary: "bg-white border-2 border-teal-600",
      buttonSecondaryHover: "hover:bg-teal-50",
      buttonSecondaryText: "text-teal-600",
      
      // Special
      success: "text-green-600",
      warning: "text-amber-600",
      error: "text-red-600",
      info: "text-blue-600",
    },
  },
  classic: {
    id: "classic",
    name: "Klassisch",
    description: "Dunkelblau mit teal/grünen Akzenten",
    colors: {
      // Backgrounds
      background: "bg-gradient-to-br from-[#0a1929] to-[#001e3c]",
      backgroundSecondary: "bg-[#0a1929]",
      card: "bg-[#132f4c]",
      cardHover: "hover:bg-[#1a3a5c]",
      
      // Text
      text: "text-white",
      textSecondary: "text-slate-300",
      textMuted: "text-slate-400",
      
      // Quran-specific
      arabic: "text-white",
      transliteration: "text-teal-600",
      translation: "text-slate-200",
      verseNumber: "text-teal-600",
      
      // UI Elements
      primary: "bg-teal-500",
      primaryHover: "hover:bg-teal-600",
      accent: "bg-teal-600",
      accentHover: "hover:bg-teal-700",
      border: "border-slate-700",
      borderLight: "border-slate-800",
      
      // Interactive
      buttonPrimary: "bg-gradient-to-r from-teal-500 to-emerald-600",
      buttonPrimaryHover: "hover:from-teal-600 hover:to-emerald-700",
      buttonPrimaryText: "text-white",
      buttonSecondary: "bg-[#132f4c] border-2 border-teal-500",
      buttonSecondaryHover: "hover:bg-[#1a3a5c]",
      buttonSecondaryText: "text-teal-400",
      
      // Special
      success: "text-emerald-400",
      warning: "text-yellow-400",
      error: "text-red-400",
      info: "text-blue-400",
    },
  },
  sepia: {
    id: "sepia",
    name: "Sepia",
    description: "Warmes Beige wie altes Papier",
    colors: {
      // Backgrounds
      background: "bg-gradient-to-br from-[#f4f1e8] to-[#e8e3d6]",
      backgroundSecondary: "bg-[#f4f1e8]",
      card: "bg-[#faf8f3]",
      cardHover: "hover:bg-[#f0ede4]",
      
      // Text
      text: "text-[#3e2723]",
      textSecondary: "text-[#5d4037]",
      textMuted: "text-[#8d6e63]",
      
      // Quran-specific
      arabic: "text-[#3e2723]",
      transliteration: "text-[#6d4c41]",
      translation: "text-[#4e342e]",
      verseNumber: "text-[#795548]",
      
      // UI Elements
      primary: "bg-[#8d6e63]",
      primaryHover: "hover:bg-[#795548]",
      accent: "bg-[#a1887f]",
      accentHover: "hover:bg-[#8d6e63]",
      border: "border-[#d7ccc8]",
      borderLight: "border-[#e0d5d1]",
      
      // Interactive
      buttonPrimary: "bg-gradient-to-r from-[#8d6e63] to-[#795548]",
      buttonPrimaryHover: "hover:from-[#795548] hover:to-[#6d4c41]",
      buttonPrimaryText: "text-white",
      buttonSecondary: "bg-[#faf8f3] border-2 border-[#8d6e63]",
      buttonSecondaryHover: "hover:bg-[#f0ede4]",
      buttonSecondaryText: "text-[#5d4037]",
      
      // Special
      success: "text-green-700",
      warning: "text-amber-700",
      error: "text-red-700",
      info: "text-blue-700",
    },
  },
  dark: {
    id: "dark",
    name: "Dunkel",
    description: "Schwarz mit smaragdgrünen Akzenten",
    colors: {
      // Backgrounds
      background: "bg-gradient-to-br from-black to-zinc-900",
      backgroundSecondary: "bg-black",
      card: "bg-zinc-900",
      cardHover: "hover:bg-zinc-800",
      
      // Text
      text: "text-gray-100",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-500",
      
      // Quran-specific
      arabic: "text-white",
      transliteration: "text-emerald-400",
      translation: "text-gray-200",
      verseNumber: "text-emerald-500",
      
      // UI Elements
      primary: "bg-emerald-600",
      primaryHover: "hover:bg-emerald-700",
      accent: "bg-emerald-500",
      accentHover: "hover:bg-emerald-600",
      border: "border-zinc-800",
      borderLight: "border-zinc-700",
      
      // Interactive
      buttonPrimary: "bg-gradient-to-r from-emerald-600 to-emerald-700",
      buttonPrimaryHover: "hover:from-emerald-700 hover:to-emerald-800",
      buttonPrimaryText: "text-white",
      buttonSecondary: "bg-zinc-900 border-2 border-emerald-600",
      buttonSecondaryHover: "hover:bg-zinc-800",
      buttonSecondaryText: "text-emerald-400",
      
      // Special
      success: "text-emerald-400",
      warning: "text-amber-400",
      error: "text-red-400",
      info: "text-blue-400",
    },
  },
};

interface ReadingThemeContextType {
  theme: ReadingTheme;
  setTheme: (theme: ReadingTheme) => void;
  themeConfig: ThemeConfig;
}

const ReadingThemeContext = createContext<ReadingThemeContextType | undefined>(undefined);

const STORAGE_KEY = "quran-reading-theme";

export function ReadingThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ReadingTheme>(() => {
    // Load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in READING_THEMES) {
        return saved as ReadingTheme;
      }
    }
    return "classic"; // Default theme
  });

  const setTheme = (newTheme: ReadingTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  const themeConfig = READING_THEMES[theme];

  return (
    <ReadingThemeContext.Provider value={{ theme, setTheme, themeConfig }}>
      {children}
    </ReadingThemeContext.Provider>
  );
}

export function useReadingTheme() {
  const context = useContext(ReadingThemeContext);
  if (!context) {
    throw new Error("useReadingTheme must be used within ReadingThemeProvider");
  }
  return context;
}
