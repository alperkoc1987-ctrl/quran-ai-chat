/**
 * PrayerTimesWidget.tsx
 * Elegant prayer times widget for home page with countdown
 */

import { useState, useEffect } from "react";
import { Moon } from "lucide-react";
import { Link } from "wouter";

interface PrayerTime {
  name: string;
  time: string;
}

export function PrayerTimesWidget() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load prayer times from localStorage
    const storedTimes = localStorage.getItem("prayerTimes");
    if (storedTimes) {
      try {
        const times = JSON.parse(storedTimes);
        const timesArray: PrayerTime[] = [
          { name: "Fajr", time: times.Fajr },
          { name: "Dhuhr", time: times.Dhuhr },
          { name: "Asr", time: times.Asr },
          { name: "Maghrib", time: times.Maghrib },
          { name: "Isha", time: times.Isha },
        ];
        setPrayerTimes(timesArray);
        setLoading(false);
      } catch (e) {
        console.error("Error parsing prayer times:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateNextPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Find next prayer
      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        const prayerTimeInMinutes = hours * 60 + minutes;

        if (prayerTimeInMinutes > currentTime) {
          setNextPrayer(prayer);
          return;
        }
      }

      // If no prayer found today, next is Fajr tomorrow
      setNextPrayer(prayerTimes[0]);
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerTimes]);

  useEffect(() => {
    if (!nextPrayer) return;

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = nextPrayer.time.split(":").map(Number);
      
      let targetTime = new Date();
      targetTime.setHours(hours, minutes, 0, 0);

      // If target time is in the past, it's tomorrow
      if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const diff = targetTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hoursLeft}:${minutesLeft.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, [nextPrayer]);

  if (loading) {
    return null;
  }

  if (!nextPrayer) {
    // No prayer times available - show link to prayer times page
    return (
      <Link href="/prayer-times">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-slate-700/50 hover:border-teal-500/50 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Gebetszeiten</h3>
          </div>
          <p className="text-sm text-slate-300">
            Tippen Sie hier, um Gebetszeiten einzurichten
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/prayer-times">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-slate-700/50 hover:border-teal-500/50 transition-all cursor-pointer">
        {/* Header with Moon Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-sm font-medium text-slate-300">Nächstes Gebet</h3>
        </div>

        {/* Prayer Name */}
        <div className="mb-2">
          <h2 className="text-3xl font-bold text-white">{nextPrayer.name}</h2>
        </div>

        {/* Prayer Time */}
        <div className="mb-4">
          <p className="text-5xl font-bold text-orange-400">
            {nextPrayer.time}
          </p>
        </div>

        {/* Countdown */}
        <div className="pt-3 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Gebetszeit beginnt in:</p>
          <p className="text-2xl font-semibold text-teal-400 font-mono">{countdown}</p>
        </div>
      </div>
    </Link>
  );
}
