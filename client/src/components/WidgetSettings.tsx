/**
 * WidgetSettings.tsx
 * Widget customization settings component
 */

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { LayoutGrid } from "lucide-react";

interface WidgetPreferences {
  showAyatOfTheDay: boolean;
  showResumeReading: boolean;
}

export function WidgetSettings() {
  const [preferences, setPreferences] = useState<WidgetPreferences>({
    showAyatOfTheDay: true,
    showResumeReading: true,
  });

  useEffect(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem("widgetPreferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading widget preferences:", e);
      }
    }
  }, []);

  const updatePreference = (key: keyof WidgetPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem("widgetPreferences", JSON.stringify(newPreferences));
  };

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Widget-Anpassung</h3>
          <p className="text-xs text-slate-400">Wählen Sie, welche Widgets auf der Startseite angezeigt werden</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Ayat of the Day Widget */}
        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
          <div>
            <Label htmlFor="ayat-widget" className="text-sm font-medium text-white cursor-pointer">
              Ayat des Tages
            </Label>
            <p className="text-xs text-slate-400 mt-1">
              Zeigt einen inspirierenden Vers aus dem Koran
            </p>
          </div>
          <Switch
            id="ayat-widget"
            checked={preferences.showAyatOfTheDay}
            onCheckedChange={(checked) => updatePreference("showAyatOfTheDay", checked)}
          />
        </div>

        {/* Resume Reading Widget */}
        <div className="flex items-center justify-between py-3">
          <div>
            <Label htmlFor="resume-reading-widget" className="text-sm font-medium text-white cursor-pointer">
              Lesen fortsetzen
            </Label>
            <p className="text-xs text-slate-400 mt-1">
              Zeigt Ihren Lesefortschritt und letzten Vers
            </p>
          </div>
          <Switch
            id="resume-reading-widget"
            checked={preferences.showResumeReading}
            onCheckedChange={(checked) => updatePreference("showResumeReading", checked)}
          />
        </div>
      </div>
    </Card>
  );
}

// Hook to use widget preferences in other components
export function useWidgetPreferences(): WidgetPreferences {
  const [preferences, setPreferences] = useState<WidgetPreferences>({
    showAyatOfTheDay: true,
    showResumeReading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("widgetPreferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading widget preferences:", e);
      }
    }

    // Listen for changes
    const handleStorageChange = () => {
      const updated = localStorage.getItem("widgetPreferences");
      if (updated) {
        try {
          setPreferences(JSON.parse(updated));
        } catch (e) {
          console.error("Error parsing widget preferences:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return preferences;
}
