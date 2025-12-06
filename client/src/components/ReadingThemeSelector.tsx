/**
 * ReadingThemeSelector.tsx
 * Component for selecting visual reading themes
 */

import { useReadingTheme, READING_THEMES, ReadingTheme } from "@/contexts/ReadingThemeContext";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function ReadingThemeSelector() {
  const { theme: currentTheme, setTheme } = useReadingTheme();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Aussehen</h3>
        <p className="text-sm text-slate-600 mb-4">
          Wähle ein Theme für eine angenehme Leseerfahrung
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.values(READING_THEMES).map((themeConfig) => {
          const isSelected = currentTheme === themeConfig.id;
          
          return (
            <button
              key={themeConfig.id}
              onClick={() => setTheme(themeConfig.id)}
              className="relative text-left"
            >
              <Card
                className={`p-4 transition-all ${
                  isSelected
                    ? "ring-2 ring-teal-600 shadow-md"
                    : "hover:shadow-md"
                }`}
              >
                {/* Theme Preview */}
                <div className={`rounded-lg p-3 mb-3 ${themeConfig.colors.background} ${themeConfig.colors.border} border`}>
                  {/* Arabic Text Preview */}
                  <div className={`text-right text-xl font-arabic mb-2 ${themeConfig.colors.arabic}`}>
                    بِسْمِ ٱللَّهِ
                  </div>
                  
                  {/* Transliteration Preview */}
                  <div className={`text-xs ${themeConfig.colors.transliteration} mb-1`}>
                    Bismillāh
                  </div>
                  
                  {/* Translation Preview */}
                  <div className={`text-xs ${themeConfig.colors.translation}`}>
                    Im Namen Allahs
                  </div>
                </div>

                {/* Theme Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{themeConfig.name}</h4>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{themeConfig.description}</p>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
