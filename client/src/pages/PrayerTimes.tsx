import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, MapPin, Sunrise, Sun, Sunset, Moon, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  date: string;
  city: string;
  country: string;
}

export default function PrayerTimes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);

  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError(null);

      // Using Aladhan API - free and reliable
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );

      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Gebetszeiten");
      }

      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        const timings = data.data.timings;
        const date = data.data.date.readable;
        const meta = data.data.meta;

        setPrayerTimes({
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
          date,
          city: meta.timezone || "Unbekannt",
          country: ""
        });
      } else {
        throw new Error("Ungültige Antwort von der API");
      }
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird von Ihrem Browser nicht unterstützt");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationGranted(true);
        fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Standortzugriff wurde verweigert. Bitte erlauben Sie den Zugriff in Ihren Browsereinstellungen.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Standortinformationen sind nicht verfügbar.");
            break;
          case error.TIMEOUT:
            setError("Die Anfrage für den Standort ist abgelaufen.");
            break;
          default:
            setError("Ein unbekannter Fehler ist aufgetreten.");
        }
      }
    );
  };

  const prayers = [
    { name: "Fajr", label: "Fajr (Morgengebet)", icon: Sunrise, color: "from-orange-400 to-yellow-500" },
    { name: "Dhuhr", label: "Dhuhr (Mittagsgebet)", icon: Sun, color: "from-yellow-400 to-orange-500" },
    { name: "Asr", label: "Asr (Nachmittagsgebet)", icon: Sun, color: "from-amber-400 to-orange-600" },
    { name: "Maghrib", label: "Maghrib (Abendgebet)", icon: Sunset, color: "from-orange-500 to-red-600" },
    { name: "Isha", label: "Isha (Nachtgebet)", icon: Moon, color: "from-indigo-500 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Gebetszeiten</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Ihre lokalen Gebetszeiten</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!locationGranted && !prayerTimes && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Standortzugriff erforderlich
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Um Ihre lokalen Gebetszeiten anzuzeigen, benötigen wir Zugriff auf Ihren Standort.
            </p>
            <Button
              onClick={requestLocation}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Lädt...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Standort freigeben
                </>
              )}
            </Button>
          </Card>
        )}

        {error && (
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            <Button
              onClick={requestLocation}
              variant="outline"
              className="mt-4"
            >
              Erneut versuchen
            </Button>
          </Card>
        )}

        {loading && prayerTimes === null && (
          <Card className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Gebetszeiten werden geladen...</p>
          </Card>
        )}

        {prayerTimes && (
          <div className="space-y-4">
            {/* Date and Location */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-900 dark:text-white">{prayerTimes.date}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{prayerTimes.city}</span>
              </div>
            </Card>

            {/* Prayer Times */}
            {prayers.map((prayer) => {
              const Icon = prayer.icon;
              const time = prayerTimes[prayer.name as keyof PrayerTimesData] as string;
              
              return (
                <Card key={prayer.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${prayer.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{prayer.label}</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Disclaimer */}
            <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Hinweis:</strong> Die Gebetszeiten werden automatisch basierend auf Ihrem Standort berechnet. 
                Bitte überprüfen Sie die Zeiten mit Ihrer lokalen Moschee, da kleine Abweichungen möglich sind.
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
