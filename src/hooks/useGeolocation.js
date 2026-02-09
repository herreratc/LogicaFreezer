import { useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentLocation } from '../lib/geoLocation';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentLocation();
      setLocation(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const startWatch = useCallback(() => {
    if (!('geolocation' in navigator)) {
      const err = new Error('Geolocalizacao nao suportada neste dispositivo.');
      err.code = 'GEOLOCATION_NOT_SUPPORTED';
      setError(err);
      return;
    }

    if (watchIdRef.current != null) return;

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 5000,
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      options
    );
  }, []);

  const stopWatch = useCallback(() => {
    if (watchIdRef.current == null) return;
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  }, []);

  useEffect(() => {
    refresh();
    return () => {
      stopWatch();
    };
  }, [refresh, stopWatch]);

  return {
    location,
    loading,
    error,
    refresh,
    startWatch,
    stopWatch,
  };
}
