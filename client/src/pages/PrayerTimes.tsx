import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, MapPin, Sunrise, Sun, Sunset, Moon, Clock, Loader2, Search, Navigation, Edit, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getPrayerSettings, savePrayerSettings, type PrayerSettings } from "@/lib/notificationService";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

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
  const { themeConfig } = useReadingTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationMode, setLocationMode] = useState<'auto' | 'manual'>('auto');
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");
  const [showTimeAdjustDialog, setShowTimeAdjustDialog] = useState(false);
  const [selectedPrayerForAdjust, setSelectedPrayerForAdjust] = useState<string | null>(null);
  const [timeAdjustments, setTimeAdjustments] = useState<Record<string, number>>({});

  // Load time adjustments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('prayerTimeAdjustments');
    if (stored) {
      try {
        setTimeAdjustments(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load prayer time adjustments:', e);
      }
    }
  }, []);

  // Apply time adjustment to a prayer time
  const applyTimeAdjustment = (timeStr: string, adjustmentMinutes: number): string => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + adjustmentMinutes;
    
    // Handle day wrap-around
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;
    
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  // Get adjusted prayer time
  const getAdjustedTime = (prayerName: string): string => {
    if (!prayerTimes) return '';
    const originalTime = prayerTimes[prayerName as keyof PrayerTimesData];
    const adjustment = timeAdjustments[prayerName] || 0;
    return adjustment !== 0 ? applyTimeAdjustment(originalTime, adjustment) : originalTime;
  };

  // Save time adjustment
  const saveTimeAdjustment = (prayerName: string, minutes: number) => {
    const newAdjustments = { ...timeAdjustments, [prayerName]: minutes };
    setTimeAdjustments(newAdjustments);
    localStorage.setItem('prayerTimeAdjustments', JSON.stringify(newAdjustments));
    setShowTimeAdjustDialog(false);
    setSelectedPrayerForAdjust(null);
  };

  // Reset time adjustment
  const resetTimeAdjustment = (prayerName: string) => {
    const newAdjustments = { ...timeAdjustments };
    delete newAdjustments[prayerName];
    setTimeAdjustments(newAdjustments);
    localStorage.setItem('prayerTimeAdjustments', JSON.stringify(newAdjustments));
    setShowTimeAdjustDialog(false);
    setSelectedPrayerForAdjust(null);
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine current and next prayer
  useEffect(() => {
    if (!prayerTimes) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerMinutes = prayerOrder.map(prayer => {
      const adjustedTime = getAdjustedTime(prayer);
      const [hours, minutes] = adjustedTime.split(':').map(Number);
      return { name: prayer, minutes: hours * 60 + minutes };
    });

    // Find current and next prayer
    let current = null;
    let next = null;

    for (let i = 0; i < prayerMinutes.length; i++) {
      if (currentMinutes >= prayerMinutes[i].minutes) {
        current = prayerMinutes[i].name;
        next = i < prayerMinutes.length - 1 ? prayerMinutes[i + 1].name : prayerMinutes[0].name;
      }
    }

    // If before Fajr, current is Isha from yesterday, next is Fajr
    if (currentMinutes < prayerMinutes[0].minutes) {
      current = 'Isha';
      next = 'Fajr';
    }

    setCurrentPrayer(current);
    setNextPrayer(next);

    // Calculate time until next prayer
    if (next) {
      const nextPrayerData = prayerMinutes.find(p => p.name === next);
      if (nextPrayerData) {
        let minutesUntil = nextPrayerData.minutes - currentMinutes;
        
        // If next prayer is tomorrow (Fajr after Isha)
        if (minutesUntil < 0) {
          minutesUntil += 24 * 60;
        }

        const hours = Math.floor(minutesUntil / 60);
        const mins = minutesUntil % 60;
        
        if (hours > 0) {
          setTimeUntilNext(`${hours}h ${mins}min`);
        } else {
          setTimeUntilNext(`${mins} Minuten`);
        }
      }
    }
  }, [prayerTimes, currentTime, timeAdjustments]);

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
    } else if (savedMode === 'auto' && savedLat && savedLon) {
      // Load previously saved auto location
      setLocationMode('auto');
      const lat = parseFloat(savedLat);
      const lon = parseFloat(savedLon);
      setCurrentLocation({ lat, lon });
      fetchPrayerTimes(lat, lon, savedCity || undefined, savedCountry || undefined);
    } else {
      // Don't auto-request, wait for user to click Automatisch button
      setLocationMode('auto');
      setLoading(false);
    }
  }, []);

  const fetchPrayerTimes = async (latitude: number, longitude: number, cityName?: string, countryName?: string) => {
    try {
      setLoading(true);
      setError(null);

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

        let finalCity = cityName;
        let finalCountry = countryName;

        if (!finalCity) {
          try {
            const geoResponse = await fetch(
              `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
            );
            
            if (geoResponse.ok) {
              const geoData = await geoResponse.json();
              if (geoData.address) {
                finalCity = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || data.data.meta?.timezone;
                finalCountry = geoData.address.country || '';
              }
            } else {
              finalCity = data.data.meta?.timezone || "Unbekannt";
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
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        localStorage.setItem('prayerLocationMode', 'auto');
        localStorage.setItem('prayerLat', lat.toString());
        localStorage.setItem('prayerLon', lon.toString());
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
      },
      {
        timeout: 10000,
        enableHighAccuracy: true
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
    { 
      name: "Fajr", 
      label: "Fajr", 
      labelGerman: "Morgengebet",
      icon: Sunrise, 
      color: "bg-gradient-to-br from-orange-400 to-amber-500",
      iconColor: "text-orange-600"
    },
    { 
      name: "Dhuhr", 
      label: "Dhuhr", 
      labelGerman: "Mittagsgebet",
      icon: Sun, 
      color: "bg-gradient-to-br from-yellow-400 to-orange-400",
      iconColor: "text-yellow-600"
    },
    { 
      name: "Asr", 
      label: "Asr", 
      labelGerman: "Nachmittagsgebet",
      icon: Sun, 
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      iconColor: "text-amber-600"
    },
    { 
      name: "Maghrib", 
      label: "Maghrib", 
      labelGerman: "Abendgebet",
      icon: Sunset, 
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      iconColor: "text-orange-700"
    },
    { 
      name: "Isha", 
      label: "Isha", 
      labelGerman: "Nachtgebet",
      icon: Moon, 
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className={`min-h-screen ${themeConfig.colors.background} pb-20`}>
      {/* Header */}
      <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm border-b ${themeConfig.colors.border} sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className={`text-xl font-bold ${themeConfig.colors.text}`}>Gebetszeiten</h1>
                <p className={`text-sm ${themeConfig.colors.textSecondary}`}>Ihre lokalen Gebetszeiten</p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          {prayerTimes && (
            <div className={`mt-4 flex items-center justify-between ${themeConfig.colors.backgroundSecondary} rounded-lg p-3`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className={`text-sm font-medium ${themeConfig.colors.text}`}>
                  {prayerTimes.city}{prayerTimes.country ? `, ${prayerTimes.country}` : ''}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${locationMode === 'auto' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                  {locationMode === 'auto' ? 'Automatisch' : 'Manuell'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCitySearch(true)}
                className="text-teal-600 hover:text-teal-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Ändern
              </Button>
            </div>
          )}

          {/* Current Date */}
          {prayerTimes && (
            <div className={`mt-2 flex items-center gap-2 ${themeConfig.colors.textSecondary} text-sm`}>
              <Calendar className="w-4 h-4" />
              <span>{currentTime.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600 mb-4" />
            <p className={`${themeConfig.colors.textSecondary}`}>Gebetszeiten werden geladen...</p>
          </div>
        )}

        {error && !loading && (
          <Card className="p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={requestLocation} className="bg-teal-600 hover:bg-teal-700">
              <Navigation className="w-4 h-4 mr-2" />
              Standort erneut anfordern
            </Button>
          </Card>
        )}

        {prayerTimes && !loading && (
          <div className="space-y-4">
            {/* Next Prayer Countdown Card */}
            {nextPrayer && (
              <Card className={`p-6 ${themeConfig.colors.card} border-2 border-teal-500 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${themeConfig.colors.textSecondary} mb-1`}>Nächstes Gebet</p>
                    <h2 className={`text-2xl font-bold ${themeConfig.colors.text}`}>
                      {prayers.find(p => p.name === nextPrayer)?.label}
                    </h2>
                    <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                      {prayers.find(p => p.name === nextPrayer)?.labelGerman}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-teal-600" />
                      <span className="text-3xl font-bold text-teal-600">
                        {getAdjustedTime(nextPrayer)}
                      </span>
                    </div>
                    <p className="text-sm text-teal-600 font-medium">in {timeUntilNext}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Prayer Times List */}
            <div className="space-y-3">
              {prayers.map((prayer) => {
                const Icon = prayer.icon;
                const isCurrent = currentPrayer === prayer.name;
                const isNext = nextPrayer === prayer.name;
                
                return (
                  <Card
                    key={prayer.name}
                    className={`p-4 transition-all ${
                      isCurrent 
                        ? `${themeConfig.colors.card} border-2 border-teal-500 shadow-md` 
                        : `${themeConfig.colors.card} ${themeConfig.colors.border}`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Prayer Icon */}
                        <div className={`w-14 h-14 rounded-xl ${prayer.color} flex items-center justify-center shadow-md`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        {/* Prayer Name */}
                        <div>
                          <h3 className={`text-lg font-bold ${themeConfig.colors.text}`}>
                            {prayer.label}
                          </h3>
                          <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                            {prayer.labelGerman}
                          </p>
                        </div>
                      </div>

                      {/* Prayer Time & Edit Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${isCurrent ? 'text-teal-600' : themeConfig.colors.text}`}>
                            {getAdjustedTime(prayer.name)}
                          </div>
                          {isCurrent && (
                            <span className="text-xs text-teal-600 font-medium">Aktuell</span>
                          )}
                          {timeAdjustments[prayer.name] && (
                            <span className="text-xs text-amber-600 font-medium">
                              {timeAdjustments[prayer.name] > 0 ? '+' : ''}{timeAdjustments[prayer.name]} min
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPrayerForAdjust(prayer.name);
                            setShowTimeAdjustDialog(true);
                          }}
                          className="h-8 w-8 text-slate-600 hover:text-teal-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Initial State - No Data */}
        {!prayerTimes && !loading && !error && (
          <Card className="p-8 text-center">
            <Clock className="w-16 h-16 mx-auto mb-4 text-teal-600" />
            <h2 className={`text-xl font-bold mb-2 ${themeConfig.colors.text}`}>Gebetszeiten laden</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Erlauben Sie den Standortzugriff, um Ihre lokalen Gebetszeiten zu sehen
            </p>
            <Button onClick={requestLocation} className="bg-teal-600 hover:bg-teal-700">
              <Navigation className="w-4 h-4 mr-2" />
              Standort aktivieren
            </Button>
          </Card>
        )}
      </div>

      {/* City Search Dialog */}
      <Dialog open={showCitySearch} onOpenChange={setShowCitySearch}>
        <DialogContent className={themeConfig.colors.card}>
          <DialogHeader>
            <DialogTitle className={themeConfig.colors.text}>Stadt auswählen</DialogTitle>
            <DialogDescription className={themeConfig.colors.textSecondary}>
              Suchen Sie nach Ihrer Stadt oder verwenden Sie automatische Standorterkennung
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Auto Location Button */}
            <Button
              onClick={() => {
                switchToAutoMode();
                setShowCitySearch(false);
              }}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Automatische Standorterkennung
            </Button>

            {/* Manual Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Stadt suchen..."
                value={citySearchQuery}
                onChange={(e) => {
                  setCitySearchQuery(e.target.value);
                  searchCity(e.target.value);
                }}
                className="pl-10"
              />
            </div>

            {/* Search Results */}
            {searching && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => selectCity(result)}
                    className={`w-full text-left p-3 rounded-lg ${themeConfig.colors.backgroundSecondary} hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <div>
                        <p className={`font-medium ${themeConfig.colors.text}`}>{result.city}</p>
                        <p className={`text-sm ${themeConfig.colors.textSecondary}`}>{result.country}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Time Adjustment Dialog */}
      <Dialog open={showTimeAdjustDialog} onOpenChange={setShowTimeAdjustDialog}>
        <DialogContent className={themeConfig.colors.card}>
          <DialogHeader>
            <DialogTitle className={themeConfig.colors.text}>Gebetszeit anpassen</DialogTitle>
            <DialogDescription className={themeConfig.colors.textSecondary}>
              {selectedPrayerForAdjust && `Passen Sie die Zeit für ${prayers.find(p => p.name === selectedPrayerForAdjust)?.label} an`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Adjustment */}
            {selectedPrayerForAdjust && (
              <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">Aktuelle Zeit</p>
                <p className="text-3xl font-bold text-teal-600">
                  {getAdjustedTime(selectedPrayerForAdjust)}
                </p>
                {timeAdjustments[selectedPrayerForAdjust] && (
                  <p className="text-xs text-amber-600 mt-1">
                    Original: {prayerTimes![selectedPrayerForAdjust as keyof PrayerTimesData]} 
                    ({timeAdjustments[selectedPrayerForAdjust] > 0 ? '+' : ''}{timeAdjustments[selectedPrayerForAdjust]} min)
                  </p>
                )}
              </div>
            )}

            {/* Adjustment Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {[-30, -15, -10, -5, 5, 10, 15, 30].map((minutes) => (
                <Button
                  key={minutes}
                  variant="outline"
                  onClick={() => selectedPrayerForAdjust && saveTimeAdjustment(selectedPrayerForAdjust, minutes)}
                  className="h-12 text-white hover:bg-teal-600 hover:text-white border-slate-600 bg-slate-700/50"
                >
                  {minutes > 0 ? '+' : ''}{minutes} min
                </Button>
              ))}
            </div>

            {/* Reset Button */}
            {selectedPrayerForAdjust && timeAdjustments[selectedPrayerForAdjust] && (
              <Button
                variant="destructive"
                onClick={() => resetTimeAdjustment(selectedPrayerForAdjust)}
                className="w-full"
              >
                Auf Original zurücksetzen
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
