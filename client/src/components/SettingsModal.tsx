import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, X, Key } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Default API Key provided by user (fallback)
const DEFAULT_API_KEY = "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";

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      // Auto-fill with default key if no key is stored
      setApiKey(DEFAULT_API_KEY);
      // Also save it to localStorage immediately so it works right away
      localStorage.setItem("openai_api_key", DEFAULT_API_KEY);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1000);
    } else {
      localStorage.removeItem("openai_api_key");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Einstellungen
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ihr Key wird nur lokal in Ihrem Browser gespeichert und niemals an unseren Server gesendet (außer zur Weiterleitung an OpenAI).
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button 
              onClick={handleSave} 
              className={`bg-teal-600 hover:bg-teal-700 ${isSaved ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {isSaved ? "Gespeichert!" : "Speichern"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
