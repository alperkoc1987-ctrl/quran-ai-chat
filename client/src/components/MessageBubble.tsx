/**
 * MessageBubble.tsx
 * Component for displaying individual chat messages with source citations.
 */

import { ChatMessage, SourceType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.isUser;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg`}>
        {/* Main message bubble */}
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        </div>

        {/* Sources display (only for AI responses) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <BookOpen className="w-4 h-4" />
              Quellen
            </div>

            {message.sources.map((source) => (
              <Card
                key={source.id}
                className="p-3 bg-amber-50 border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          source.type === SourceType.Quran
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {source.type}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      {source.reference}
                    </p>
                    <p className="text-xs text-gray-600 italic line-clamp-2">
                      "{source.text}"
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-blue-200 text-right" : "text-gray-500"
          }`}
        >
          {message.timestamp.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
