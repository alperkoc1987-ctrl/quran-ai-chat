import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Compass as CompassIcon, MapPin, Loader2, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

export default function Qibla() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [currentHeading, setCurrentHeading] = useState<number>(0);
  const [locationGranted, setLocationGranted] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const calculateQiblaDirection = (userLat: number, userLng: number): number => {
    // Convert to radians
    const lat1 = (userLat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const lng1 = (userLng * Math.PI) / 180;
    const lng2 = (KAABA_LNG * Math.PI) / 180;

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird von Ihrem Browser nicht unterstützt");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setUserLocation({ lat, lng });
        setLocationGranted(true);
        
        const direction = calculateQiblaDirection(lat, lng);
        setQiblaDirection(direction);
        setLoading(false);
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

  useEffect(() => {
    if (!locationGranted) return;

    // Check if device supports compass
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          // Alpha gives the compass direction
          setCurrentHeading(event.alpha);
        }
      };

      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(() => {
            setError("Kompass-Zugriff wurde verweigert");
          });
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
      }

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } else {
      setError("Ihr Gerät unterstützt keinen Kompass");
    }
  }, [locationGranted]);

  const relativeDirection = qiblaDirection !== null ? (qiblaDirection - currentHeading + 360) % 360 : 0;

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
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Qibla-Richtung</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Finden Sie die Richtung nach Mekka</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!locationGranted && qiblaDirection === null && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CompassIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Standortzugriff erforderlich
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Um die Qibla-Richtung zu berechnen, benötigen wir Zugriff auf Ihren Standort.
            </p>
            <Button
              onClick={requestLocation}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
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

        {qiblaDirection !== null && (
          <div className="space-y-6">
            {/* Compass Display */}
            <Card className="p-8">
              <div className="relative w-full max-w-sm mx-auto aspect-square">
                {/* Compass Circle */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-xl">
                  {/* Cardinal Directions */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">N</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">S</div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">W</div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">E</div>
                  
                  {/* Qibla Arrow */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${relativeDirection}deg)` }}
                  >
                    <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[120px] border-b-gradient-to-t from-emerald-600 to-teal-500 drop-shadow-lg">
                      <Navigation className="w-8 h-8 text-white absolute -top-16 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 dark:bg-white rounded-full shadow-lg" />
                </div>
              </div>

              {/* Direction Info */}
              <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Qibla-Richtung</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                  {Math.round(qiblaDirection)}°
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  von Norden (im Uhrzeigersinn)
                </p>
              </div>
            </Card>

            {/* Location Info */}
            {userLocation && (
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Ihr Standort</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Breitengrad: {userLocation.lat.toFixed(4)}°<br />
                      Längengrad: {userLocation.lng.toFixed(4)}°
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Anleitung:</h3>
              <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1 list-disc list-inside">
                <li>Halten Sie Ihr Gerät flach (parallel zum Boden)</li>
                <li>Der grüne Pfeil zeigt die Richtung zur Kaaba in Mekka</li>
                <li>Drehen Sie sich, bis der Pfeil nach oben zeigt</li>
                <li>Kalibrieren Sie Ihren Kompass bei Bedarf in den Geräteeinstellungen</li>
              </ul>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
