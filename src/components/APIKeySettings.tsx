/**
 * APIKeySettings.tsx
 * Component for users to securely input and store their OpenAI API key
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Check, AlertCircle } from "lucide-react";

const STORAGE_KEY = "openai_api_key";

export function APIKeySettings() {
  const [apiKey, setApiKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (inputValue.trim().startsWith("sk-")) {
      localStorage.setItem(STORAGE_KEY, inputValue.trim());
      setApiKey(inputValue.trim());
      setInputValue("");
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey("");
    setInputValue("");
    setIsEditing(false);
  };

  const maskKey = (key: string) => {
    if (key.length < 8) return key;
    return key.slice(0, 8) + "..." + key.slice(-4);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-5 h-5 text-teal-600" />
        <h3 className="font-semibold text-gray-900">OpenAI API Key</h3>
      </div>

      {apiKey && !isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {showKey ? apiKey : maskKey(apiKey)}
              </span>
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex-1"
            >
              Ändern
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              Löschen
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            ✅ API Key ist sicher gespeichert und wird nicht öffentlich gemacht.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {!apiKey && (
            <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                Geben Sie Ihren OpenAI API Key ein, um den Chat zu aktivieren. Der Key wird lokal gespeichert und nicht öffentlich gemacht.
              </p>
            </div>
          )}

          <Input
            type={showKey ? "text" : "password"}
            placeholder="sk-proj-..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="font-mono text-sm"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!inputValue.trim().startsWith("sk-")}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
            >
              Speichern
            </Button>
            {isEditing && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setInputValue("");
                }}
                className="flex-1"
              >
                Abbrechen
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            🔒 Ihr Key wird nur lokal auf Ihrem Gerät gespeichert.
          </p>
        </div>
      )}

      {isSaved && (
        <div className="mt-2 text-xs text-green-600 font-semibold">
          ✅ API Key erfolgreich gespeichert!
        </div>
      )}
    </div>
  );
}

// Export function to get API key from storage
export function getStoredAPIKey(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}
