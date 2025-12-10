/**
 * PushToTalkButton.tsx
 * Push-to-talk audio recording button with speech-to-text conversion
 */

import { useState, useRef, useEffect } from "react";
import { Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PushToTalkButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

const MAX_RECORDING_TIME = 60000; // 1 minute in milliseconds

export function PushToTalkButton({ onTranscript, className }: PushToTalkButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle stop event
      mediaRecorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        // Convert to speech-to-text
        await convertSpeechToText(audioBlob);
        
        // Reset
        audioChunksRef.current = [];
        setRecordingTime(0);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      recordingStartTimeRef.current = Date.now();
      
      // Start timer
      recordingTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - recordingStartTimeRef.current;
        setRecordingTime(elapsed);
        
        // Auto-stop after max time
        if (elapsed >= MAX_RECORDING_TIME) {
          stopRecording();
          toast.info("Maximale Aufnahmezeit erreicht", {
            description: "Die Aufnahme wurde automatisch gestoppt."
          });
        }
      }, 100);
      
      toast.success("Aufnahme gestartet", {
        description: "Halten Sie die Taste gedrückt zum Aufnehmen"
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        toast.error("Mikrofon-Berechtigung verweigert", {
          description: "Bitte erlauben Sie den Zugriff auf das Mikrofon in Ihren Browser-Einstellungen."
        });
      } else {
        toast.error("Fehler beim Starten der Aufnahme", {
          description: "Bitte überprüfen Sie Ihre Mikrofon-Einstellungen."
        });
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const convertSpeechToText = async (audioBlob: Blob) => {
    try {
      toast.info("Konvertiere Sprache zu Text...");
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        
        // Call Manus speech-to-text API
        try {
          const response = await fetch("/api/speech-to-text", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              audio: base64Audio,
              language: "de" // German
            }),
          });

          if (!response.ok) {
            throw new Error("Speech-to-text conversion failed");
          }

          const data = await response.json();
          
          if (data.text && data.text.trim()) {
            onTranscript(data.text.trim());
            toast.success("Sprache erkannt!", {
              description: data.text.substring(0, 50) + (data.text.length > 50 ? "..." : "")
            });
          } else {
            toast.error("Keine Sprache erkannt", {
              description: "Bitte versuchen Sie es erneut und sprechen Sie deutlicher."
            });
          }
        } catch (error) {
          console.error("Speech-to-text error:", error);
          toast.error("Fehler bei der Spracherkennung", {
            description: "Bitte versuchen Sie es erneut."
          });
        }
      };
    } catch (error) {
      console.error("Error converting speech to text:", error);
      toast.error("Fehler bei der Konvertierung");
    }
  };

  const handleMouseDown = () => {
    if (!isRecording) {
      startRecording();
    }
  };

  const handleMouseUp = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isRecording) {
      startRecording();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isRecording) {
      stopRecording();
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`relative ${className} ${isRecording ? "bg-red-100 text-red-600 hover:bg-red-200" : "text-slate-600 dark:text-slate-300"}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        title="Halten zum Aufnehmen"
      >
        {isRecording ? (
          <>
            <StopCircle className="w-5 h-5 animate-pulse" />
            {/* Recording indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>
      
      {/* Recording time indicator */}
      {isRecording && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-600 font-medium whitespace-nowrap">
          {formatTime(recordingTime)} / 60s
        </div>
      )}
    </div>
  );
}
