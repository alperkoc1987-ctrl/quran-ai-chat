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
  const [smoothedHeading, setSmoothedHeading] = useState<number>(0);
  const [locationGranted, setLocationGranted] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [compassPermissionNeeded, setCompassPermissionNeeded] = useState(false);

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

  const requestCompassPermission = async () => {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setCurrentHeading(event.alpha);
          // Smooth the compass rotation using exponential moving average
          setSmoothedHeading(prev => {
            const alpha = 0.08; // Lower smoothing factor for more stability
            let diff = event.alpha! - prev;
            // Handle 360° wrap-around
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            
            // Dead zone: ignore very small changes to prevent jitter
            if (Math.abs(diff) < 2) return prev;
            
            return (prev + alpha * diff + 360) % 360;
          });
        }
      };

      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            setCompassPermissionNeeded(false);
            setError(null);
          } else {
            setError("Kompass-Zugriff wurde verweigert. Bitte aktivieren Sie 'Bewegung & Ausrichtung' in den Safari-Einstellungen.");
          }
        } catch (err) {
          setError("Kompass-Zugriff wurde verweigert");
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
        setCompassPermissionNeeded(false);
      }
    } else {
      setError("Ihr Gerät unterstützt keinen Kompass");
    }
  };

  useEffect(() => {
    if (!locationGranted) return;

    // Check if device supports compass
    if ('DeviceOrientationEvent' in window) {
      // Check if permission is needed (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setCompassPermissionNeeded(true);
      } else {
        // Auto-start for non-iOS devices
        requestCompassPermission();
      }
    } else {
      setError("Ihr Gerät unterstützt keinen Kompass");
    }
  }, [locationGranted]);

  const relativeDirection = qiblaDirection !== null ? (qiblaDirection - smoothedHeading + 360) % 360 : 0;

  // Vibration feedback when aligned with Qibla
  useEffect(() => {
    if (qiblaDirection === null) return;

    // Check if arrow is pointing toward Qibla (±5° tolerance)
    const isNowAligned = Math.abs(relativeDirection) < 5 || Math.abs(relativeDirection - 360) < 5;
    
    // Vibrate when becoming aligned (not continuously)
    if (isNowAligned && !isAligned) {
      if ('vibrate' in navigator) {
        navigator.vibrate(200); // Short vibration pulse
      }
    }
    
    setIsAligned(isNowAligned);
  }, [relativeDirection, qiblaDirection, isAligned]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Qibla-Richtung</h1>
              <p className="text-xs text-slate-400">Finden Sie die Richtung nach Mekka</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!locationGranted && qiblaDirection === null && (
          <Card className="p-8 text-center bg-slate-800/50 border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CompassIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Standortzugriff erforderlich
            </h2>
            <p className="text-sm text-slate-300 mb-6">
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
          <Card className="p-6 bg-red-900/20 border-red-800">
            <p className="text-red-300 text-sm">{error}</p>
            <Button
              onClick={compassPermissionNeeded ? requestCompassPermission : requestLocation}
              variant="outline"
              className="mt-4"
            >
              Erneut versuchen
            </Button>
          </Card>
        )}

        {compassPermissionNeeded && !error && (
          <Card className="p-8 text-center bg-teal-900/20 border-teal-800">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CompassIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Kompass aktivieren
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              Tippen Sie auf den Button, um den Kompass zu aktivieren und die Qibla-Richtung anzuzeigen.
            </p>
            <Button
              onClick={requestCompassPermission}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              <CompassIcon className="w-4 h-4 mr-2" />
              Kompass aktivieren
            </Button>
          </Card>
        )}

        {qiblaDirection !== null && (
          <div className="space-y-6">
            {/* Compass Display */}
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="relative w-full max-w-sm mx-auto aspect-square">
                {/* Compass Circle */}
                <div className={`absolute inset-0 rounded-full border-4 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 ${
                  isAligned ? 'border-teal-500 shadow-teal-500/50' : 'border-slate-600'
                }`}>
                  {/* Top Notch Marker */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-4 bg-teal-400 rounded-full"></div>
                  
                  {/* Qibla Direction Arrow - Rotates to point toward Kaaba */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${relativeDirection}deg)` }}
                  >
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[100px] border-b-white drop-shadow-lg"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-3 h-3 bg-teal-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Kaaba Icon - Fixed at top (Qibla target) */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="text-5xl">🕋</div>
                  </div>
                </div>
              </div>

              {/* Direction Info */}
              <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-slate-400">Qibla-Richtung</p>
                <p className="text-4xl font-bold text-white">
                  {Math.round(qiblaDirection)}°
                </p>
                <p className="text-xs text-slate-400">
                  von Norden (im Uhrzeigersinn)
                </p>
              </div>
            </Card>

            {/* Location Info */}
            {userLocation && (
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Ihr Standort</h3>
                    <p className="text-sm text-slate-300">
                      Breitengrad: {userLocation.lat.toFixed(4)}°<br />
                      Längengrad: {userLocation.lng.toFixed(4)}°
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card className="p-6 bg-teal-900/20 border-teal-800">
              <h3 className="font-semibold text-teal-300 mb-2">Anleitung:</h3>
              <ul className="text-sm text-teal-200 space-y-1 list-disc list-inside">
                <li>Halten Sie Ihr Gerät flach (parallel zum Boden)</li>
                <li>Der grüne Pfeil zeigt zur Kaaba 🕋 in Mekka</li>
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
