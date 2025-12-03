/**
 * MessageBubble.tsx
 * Component for displaying individual chat messages with source citations.
 */

import { ChatMessage, SourceType, SourceReference } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, X } from "lucide-react";
import { useState } from "react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.isUser;
  const [selectedSource, setSelectedSource] = useState<SourceReference | null>(null);

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
                onClick={() => setSelectedSource(source)}
                className="p-3 bg-amber-50 border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
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

      {/* Source Detail Modal */}
      {selectedSource !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-4 flex items-center justify-between">
              <div>
                <Badge
                  className={`text-xs mb-2 ${
                    selectedSource?.type === SourceType.Quran
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedSource?.type}
                </Badge>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSource?.reference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <p className="text-gray-700 leading-relaxed text-base">
                {selectedSource?.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
