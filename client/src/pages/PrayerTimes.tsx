import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, MapPin, Sunrise, Sun, Sunset, Moon, Clock, Loader2, Search, Navigation, Edit3, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getPrayerSettings, savePrayerSettings, type PrayerSettings } from "@/lib/notificationService";

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

interface CitySearchResult {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function PrayerTimes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationMode, setLocationMode] = useState<'auto' | 'manual'>('auto');
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showTimeAdjustDialog, setShowTimeAdjustDialog] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [prayerSettings, setPrayerSettings] = useState<PrayerSettings>(getPrayerSettings());

  // Load saved location preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('prayerLocationMode') as 'auto' | 'manual' | null;
    const savedCity = localStorage.getItem('prayerCity');
    const savedCountry = localStorage.getItem('prayerCountry');
    const savedLat = localStorage.getItem('prayerLat');
    const savedLon = localStorage.getItem('prayerLon');

    if (savedMode === 'manual' && savedCity && savedLat && savedLon) {
      setLocationMode('manual');
      const lat = parseFloat(savedLat);
      const lon = parseFloat(savedLon);
      setCurrentLocation({ lat, lon });
      fetchPrayerTimes(lat, lon, savedCity, savedCountry || '');
    } else if (savedMode === 'auto') {
      setLocationMode('auto');
      requestLocation();
    }
  }, []);

  const fetchPrayerTimes = async (latitude: number, longitude: number, cityName?: string, countryName?: string) => {
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

        // If city/country not provided, try to get from API response or use reverse geocoding
        let finalCity = cityName;
        let finalCountry = countryName;

        if (!finalCity) {
          // Try reverse geocoding with Aladhan API
          try {
            const addressResponse = await fetch(
              `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
            );
            const addressData = await addressResponse.json();
            
            if (addressData.code === 200 && addressData.data?.meta) {
              // Extract city from timezone or use a geocoding service
              const timezone = addressData.data.meta.timezone;
              
              // Try to get city from geocoding API
              const geoResponse = await fetch(
                `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
              );
              
              if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                if (geoData.address) {
                  finalCity = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || timezone;
                  finalCountry = geoData.address.country || '';
                }
              } else {
                // Fallback to timezone
                finalCity = timezone;
              }
            }
          } catch (geoError) {
            console.error('Geocoding error:', geoError);
            finalCity = data.data.meta?.timezone || "Unbekannt";
          }
        }

        const prayerTimesData = {
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
          date,
          city: finalCity || "Unbekannt",
          country: finalCountry || ""
        };
        
        setPrayerTimes(prayerTimesData);
        
        // Save to localStorage for chat function access
        localStorage.setItem('prayerTimes', JSON.stringify({
          timings: {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha
          },
          date: { readable: date },
          city: finalCity || "Unbekannt",
          country: finalCountry || ""
        }));

        setCurrentLocation({ lat: latitude, lon: longitude });
      } else {
        throw new Error("Ungültige Antwort von der API");
      }
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten");
      toast.error("Fehler beim Laden der Gebetszeiten");
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird von Ihrem Browser nicht unterstützt");
      toast.error("Geolocation nicht unterstützt");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        localStorage.setItem('prayerLocationMode', 'auto');
        fetchPrayerTimes(lat, lon);
        toast.success("Standort erfolgreich erkannt");
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Standortzugriff wurde verweigert. Bitte erlauben Sie den Zugriff in Ihren Browsereinstellungen.");
            toast.error("Standortzugriff verweigert");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Standortinformationen sind nicht verfügbar.");
            toast.error("Standort nicht verfügbar");
            break;
          case error.TIMEOUT:
            setError("Die Anfrage für den Standort ist abgelaufen.");
            toast.error("Standortanfrage abgelaufen");
            break;
          default:
            setError("Ein unbekannter Fehler ist aufgetreten.");
            toast.error("Fehler beim Standortzugriff");
        }
      }
    );
  };

  const searchCity = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      // Use OpenStreetMap Nominatim for city search
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error("Fehler bei der Stadtsuche");
      }

      const data = await response.json();
      
      const results: CitySearchResult[] = data.map((item: any) => ({
        city: item.address?.city || item.address?.town || item.address?.village || item.name,
        country: item.address?.country || '',
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon)
      }));

      setSearchResults(results);
    } catch (err) {
      console.error('City search error:', err);
      toast.error("Fehler bei der Stadtsuche");
    } finally {
      setSearching(false);
    }
  };

  const selectCity = (result: CitySearchResult) => {
    setLocationMode('manual');
    localStorage.setItem('prayerLocationMode', 'manual');
    localStorage.setItem('prayerCity', result.city);
    localStorage.setItem('prayerCountry', result.country);
    localStorage.setItem('prayerLat', result.latitude.toString());
    localStorage.setItem('prayerLon', result.longitude.toString());
    
    fetchPrayerTimes(result.latitude, result.longitude, result.city, result.country);
    setShowCitySearch(false);
    setCitySearchQuery("");
    setSearchResults([]);
    toast.success(`Stadt auf ${result.city} gesetzt`);
  };

  const switchToAutoMode = () => {
    setLocationMode('auto');
    localStorage.setItem('prayerLocationMode', 'auto');
    localStorage.removeItem('prayerCity');
    localStorage.removeItem('prayerCountry');
    localStorage.removeItem('prayerLat');
    localStorage.removeItem('prayerLon');
    requestLocation();
  };

  const prayers = [
    { name: "Fajr", label: "Fajr (Morgengebet)", icon: Sunrise, color: "from-orange-400 to-yellow-500" },
    { name: "Dhuhr", label: "Dhuhr (Mittagsgebet)", icon: Sun, color: "from-yellow-400 to-orange-500" },
    { name: "Asr", label: "Asr (Nachmittagsgebet)", icon: Sun, color: "from-amber-400 to-orange-600" },
    { name: "Maghrib", label: "Maghrib (Abendgebet)", icon: Sunset, color: "from-orange-500 to-red-600" },
    { name: "Isha", label: "Isha (Nachtgebet)", icon: Moon, color: "from-indigo-500 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-20">
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
        {!prayerTimes && !loading && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Standort wählen
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Wählen Sie, wie Sie Ihren Standort festlegen möchten
            </p>
            <div className="flex flex-col gap-3">
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
                    <Navigation className="w-4 h-4 mr-2" />
                    Automatisch erkennen (GPS)
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowCitySearch(true)}
                variant="outline"
                className="border-2"
              >
                <Search className="w-4 h-4 mr-2" />
                Stadt manuell eingeben
              </Button>
            </div>
          </Card>
        )}

        {error && (
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-4">
            <p className="text-red-800 dark:text-red-300 text-sm mb-4">{error}</p>
            <div className="flex gap-2">
              <Button
                onClick={requestLocation}
                variant="outline"
                size="sm"
              >
                Erneut versuchen
              </Button>
              <Button
                onClick={() => setShowCitySearch(true)}
                variant="outline"
                size="sm"
              >
                Stadt eingeben
              </Button>
            </div>
          </Card>
        )}

        {loading && prayerTimes === null && (
          <Card className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Gebetszeiten werden geladen...</p>
          </Card>
        )}

        {/* City Search Modal */}
        {showCitySearch && (
          <Card className="p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Stadt suchen</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCitySearch(false);
                  setCitySearchQuery("");
                  setSearchResults([]);
                }}
              >
                Abbrechen
              </Button>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Stadt eingeben (z.B. Mainz, Berlin, Frankfurt)"
                value={citySearchQuery}
                onChange={(e) => {
                  setCitySearchQuery(e.target.value);
                  searchCity(e.target.value);
                }}
                className="pr-10"
              />
              {searching && (
                <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3 text-slate-400" />
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => selectCity(result)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <div className="font-medium text-slate-900 dark:text-white">{result.city}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{result.country}</div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        )}

        {prayerTimes && (
          <div className="space-y-4">
            {/* Date and Location */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{prayerTimes.date}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {prayerTimes.city}
                      {prayerTimes.country && `, ${prayerTimes.country}`}
                    </span>
                    {locationMode === 'manual' && (
                      <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                        Manuell
                      </span>
                    )}
                    {locationMode === 'auto' && (
                      <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                        Automatisch
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCitySearch(true)}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
              {locationMode === 'manual' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={switchToAutoMode}
                  className="w-full mt-2"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Zu automatischer Erkennung wechseln
                </Button>
              )}
            </Card>

            {/* Prayer Times */}
            {prayers.map((prayer) => {
              const Icon = prayer.icon;
              const baseTime = prayerTimes[prayer.name as keyof PrayerTimesData] as string;
              const prayerKey = prayer.name.toLowerCase() as keyof PrayerSettings;
              const adjustment = prayerSettings[prayerKey]?.timeAdjustment || 0;
              
              // Apply time adjustment
              const [hours, minutes] = baseTime.split(':').map(Number);
              const adjustedMinutes = minutes + adjustment;
              const finalHours = (hours + Math.floor(adjustedMinutes / 60) + 24) % 24;
              const finalMinutes = ((adjustedMinutes % 60) + 60) % 60;
              const displayTime = `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
              
              return (
                <Card 
                  key={prayer.name} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedPrayer(prayer.name);
                    setShowTimeAdjustDialog(true);
                  }}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${prayer.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{prayer.label}</h4>
                        {adjustment !== 0 && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {adjustment > 0 ? '+' : ''}{adjustment} min angepasst
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{displayTime}</p>
                        {adjustment !== 0 && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">Original: {baseTime}</p>
                        )}
                      </div>
                      <Edit className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Disclaimer */}
            <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Hinweis:</strong> Die Gebetszeiten werden basierend auf Ihrem Standort berechnet. 
                Bitte überprüfen Sie die Zeiten mit Ihrer lokalen Moschee, da kleine Abweichungen möglich sind.
                Tippen Sie auf eine Gebetszeit, um sie manuell anzupassen.
              </p>
            </Card>
          </div>
        )}

        {/* Time Adjustment Dialog */}
        <Dialog open={showTimeAdjustDialog} onOpenChange={setShowTimeAdjustDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Gebetszeit anpassen</DialogTitle>
              <DialogDescription>
                Passen Sie die Gebetszeit an Ihre lokalen Berechnungsmethoden an (±30 Minuten)
              </DialogDescription>
            </DialogHeader>
            {selectedPrayer && (() => {
              const prayerKey = selectedPrayer.toLowerCase() as keyof PrayerSettings;
              const currentAdjustment = prayerSettings[prayerKey]?.timeAdjustment || 0;
              const prayer = prayers.find(p => p.name === selectedPrayer);
              
              return (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {prayer?.label}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {currentAdjustment > 0 ? '+' : ''}{currentAdjustment} Minuten
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={currentAdjustment}
                      onChange={(e) => {
                        const newAdjustment = parseInt(e.target.value);
                        const newSettings = {
                          ...prayerSettings,
                          [prayerKey]: {
                            ...prayerSettings[prayerKey],
                            timeAdjustment: newAdjustment,
                          },
                        };
                        setPrayerSettings(newSettings);
                        savePrayerSettings(newSettings);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>-30 min</span>
                      <span>0</span>
                      <span>+30 min</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newSettings = {
                          ...prayerSettings,
                          [prayerKey]: {
                            ...prayerSettings[prayerKey],
                            timeAdjustment: 0,
                          },
                        };
                        setPrayerSettings(newSettings);
                        savePrayerSettings(newSettings);
                        toast.success('Anpassung zurückgesetzt');
                      }}
                      className="flex-1"
                    >
                      Zurücksetzen
                    </Button>
                    <Button
                      onClick={() => {
                        setShowTimeAdjustDialog(false);
                        toast.success('Gebetszeit angepasst');
                      }}
                      className="flex-1"
                    >
                      Fertig
                    </Button>
                  </div>
                </div>
              );
            })()}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
