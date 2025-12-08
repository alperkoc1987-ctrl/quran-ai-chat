import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Compass as CompassIcon, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import geomagnetism from "geomagnetism";

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
  const [magneticDeclination, setMagneticDeclination] = useState<number>(0);

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
        
        // Calculate magnetic declination for this location
        try {
          const model = geomagnetism.model();
          const info = model.point([lat, lng]);
          setMagneticDeclination(info.decl); // Magnetic declination in degrees
          console.log('Magnetic Declination:', info.decl, 'degrees');
        } catch (err) {
          console.error('Failed to calculate magnetic declination:', err);
          setMagneticDeclination(0); // Fallback to no correction
        }
        
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
            const alpha = 0.2; // Smoothing factor (increased for better responsiveness)
            let newHeading = event.alpha!;
            
            // Normalize both values to 0-360
            newHeading = ((newHeading % 360) + 360) % 360;
            let prevNormalized = ((prev % 360) + 360) % 360;
            
            // Calculate shortest angular distance
            let diff = newHeading - prevNormalized;
            
            // Handle 360° wrap-around (shortest path)
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            
            // Dead zone: ignore very small changes to prevent jitter
            if (Math.abs(diff) < 2) return prevNormalized;
            
            // Apply smoothing
            let result = prevNormalized + alpha * diff;
            
            // Normalize result to 0-360 range
            result = ((result % 360) + 360) % 360;
            
            return result;
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

  // Apply magnetic declination correction to convert magnetic north to true north
  const correctedHeading = (smoothedHeading + magneticDeclination + 360) % 360;
  
  // DEBUG LOGGING
  useEffect(() => {
    if (qiblaDirection !== null && userLocation) {
      console.log('=== QIBLA COMPASS DEBUG ===');
      console.log('User Location:', userLocation);
      console.log('Qibla Direction (true north):', qiblaDirection.toFixed(1), '°');
      console.log('Raw Compass Heading (magnetic):', smoothedHeading.toFixed(1), '°');
      console.log('Magnetic Declination:', magneticDeclination.toFixed(1), '°');
      console.log('Corrected Heading (true north):', correctedHeading.toFixed(1), '°');
      console.log('Needle Rotation:', (qiblaDirection - correctedHeading).toFixed(1), '°');
      console.log('========================');
    }
  }, [smoothedHeading, qiblaDirection, magneticDeclination, correctedHeading, userLocation]);
  
  // Check if needle is pointing up (to Kaaba)
  // Needle rotation: correctedHeading - qiblaDirection
  // When device heading matches Qibla direction, needle points straight up = aligned
  const needleAngle = qiblaDirection !== null ? ((correctedHeading - qiblaDirection + 360) % 360) : 0;
  // Normalize to -180 to 180 range
  const normalizedAngle = needleAngle > 180 ? needleAngle - 360 : needleAngle;
  const headingDiff = Math.abs(normalizedAngle);

  // Vibration feedback when aligned with Qibla
  useEffect(() => {
    if (qiblaDirection === null) return;

    // Check if device is pointing toward Qibla (±5° tolerance)
    // Aligned when device heading matches Qibla direction (needle points up)
    const isNowAligned = headingDiff < 5;
    
    // Vibrate when becoming aligned (not continuously)
    if (isNowAligned && !isAligned) {
      if ('vibrate' in navigator) {
        navigator.vibrate(200); // Short vibration pulse
      }
    }
    
    setIsAligned(isNowAligned);
  }, [headingDiff, qiblaDirection, isAligned]);

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
            {/* DEBUG PANEL - Remove after testing */}
            {smoothedHeading !== null && (
              <Card className="p-4 bg-yellow-900/30 border-yellow-600">
                <div className="text-xs font-mono text-yellow-200 space-y-1">
                  <div><strong>Position:</strong> {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}</div>
                  <div><strong>Qibla Direction:</strong> {qiblaDirection.toFixed(1)}°</div>
                  <div><strong>Raw Heading:</strong> {smoothedHeading.toFixed(1)}°</div>
                  <div><strong>Magnetic Declination:</strong> {magneticDeclination.toFixed(1)}°</div>
                  <div><strong>Corrected Heading:</strong> {correctedHeading.toFixed(1)}°</div>
                  <div><strong>Needle Rotation:</strong> {(-(correctedHeading - qiblaDirection)).toFixed(1)}°</div>
                  <div><strong>Heading Diff:</strong> {headingDiff.toFixed(1)}° {isAligned ? '✅ ALIGNED' : '❌ NOT ALIGNED'}</div>
                </div>
              </Card>
            )}

            {/* Compass Display */}
            <Card className={`p-8 transition-all duration-300 ${
              isAligned 
                ? 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                : 'bg-slate-800/50 border-slate-700'
            }`}>
              <div className="relative w-full max-w-sm mx-auto aspect-square">
                {/* Compass Circle */}
                <div className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                  isAligned 
                    ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)]' 
                    : 'border-slate-600'
                } bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950`}>
                  
                  {/* White Compass Needle - Points toward Qibla direction */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${qiblaDirection !== null ? -(correctedHeading - qiblaDirection) : 0}deg)` }}
                  >
                    <div className="relative">
                      {/* Needle pointing up */}
                      <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[140px] border-b-white drop-shadow-2xl"></div>
                      {/* Needle tip circle - teal color */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-5 h-5 bg-teal-400 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </div>

                  {/* Kaaba Icon - ALWAYS at top (does NOT rotate) */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="text-5xl">🕋</div>
                  </div>
                </div>
              </div>

              {/* Direction Info */}
              <div className="mt-8 text-center space-y-3">
                {isAligned ? (
                  <div className="py-4 px-6 bg-emerald-500/20 border-2 border-emerald-400 rounded-xl animate-pulse">
                    <p className="text-2xl font-bold text-white mb-1">
                      ✓ Sie sind zur Qibla ausgerichtet
                    </p>
                    <p className="text-sm text-emerald-200">
                      Perfekt ausgerichtet für das Gebet
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-400">Qibla-Richtung</p>
                    <p className="text-4xl font-bold text-white">
                      {Math.round(qiblaDirection)}°
                    </p>
                    <p className="text-xs text-slate-500">
                      von Norden (im Uhrzeigersinn)
                    </p>
                  </div>
                )}
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
                <li>Der weiße Pfeil zeigt immer nach Norden</li>
                <li>Die Kaaba 🕋 zeigt die Qibla-Richtung</li>
                <li>Drehen Sie sich, bis die Kaaba oben am Pfeil ist</li>
                <li>Bei perfekter Ausrichtung leuchtet der Kompass grün</li>
                <li>Kalibrieren Sie Ihren Kompass bei Bedarf in den Geräteeinstellungen</li>
              </ul>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
