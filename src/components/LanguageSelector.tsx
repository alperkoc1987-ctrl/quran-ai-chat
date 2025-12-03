/**
 * LanguageSelector.tsx
 * Component for selecting the language/translation.
 */

import { Language } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={currentLanguage === Language.German ? "default" : "ghost"}
          size="sm"
          onClick={() => onLanguageChange(Language.German)}
          className="text-xs"
        >
          Deutsch
        </Button>
        <Button
          variant={currentLanguage === Language.English ? "default" : "ghost"}
          size="sm"
          onClick={() => onLanguageChange(Language.English)}
          className="text-xs"
        >
          English
        </Button>
      </div>
    </div>
  );
}
