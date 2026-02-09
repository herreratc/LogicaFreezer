import { useMemo, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

const DEV_SAMPLE = { lat: -23.55052, lng: -46.633308, accuracy: 50, timestamp: Date.now() };

export function LocationStatus() {
  const { location, loading, error, refresh } = useGeolocation();
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [manualLocation, setManualLocation] = useState(null);

  const isDev = Boolean(import.meta.env && import.meta.env.DEV);
  const isLocalhost = typeof window !== 'undefined'
    && (window.location.hostname === 'localhost'
      || window.location.hostname === '127.0.0.1'
      || window.location.hostname === '0.0.0.0');
  const isWindows = typeof navigator !== 'undefined' && /Windows/i.test(navigator.userAgent);
  const showSimButton = isDev && (isLocalhost || isWindows);

  const effectiveLocation = manualLocation || location;

  const status = useMemo(() => {
    if (loading) return 'capturando';
    if (error) return 'erro';
    if (effectiveLocation) return 'ok';
    return 'capturando';
  }, [loading, error, effectiveLocation]);

  function applyManual() {
    const lat = Number(manualLat);
    const lng = Number(manualLng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;
    setManualLocation({
      lat,
      lng,
      accuracy: 0,
      timestamp: Date.now(),
    });
  }

  return (
    <div className="location-status">
      <div><strong>Status:</strong> {status === 'capturando' ? 'Obtendo localizacao...' : status}</div>

      {effectiveLocation && (
        <div>
          <div>Lat: {effectiveLocation.lat}</div>
          <div>Lng: {effectiveLocation.lng}</div>
          <div>Precisao: {effectiveLocation.accuracy} m</div>
        </div>
      )}

      {error && (
        <div className="location-error">
          <div>Ative a localizacao</div>
          <div>Permita acesso no navegador</div>
          <div>No iPhone: Ajustes / Safari / Localizacao</div>
        </div>
      )}

      <button type="button" onClick={refresh} disabled={loading}>
        Atualizar localizacao
      </button>

      {showSimButton && (
        <button type="button" onClick={() => setManualLocation(DEV_SAMPLE)}>
          Usar localizacao simulada
        </button>
      )}

      {isDev && (
        <div className="location-manual">
          <div>
            <label htmlFor="manual-lat">Lat</label>
            <input
              id="manual-lat"
              type="number"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder="-23.55052"
            />
          </div>
          <div>
            <label htmlFor="manual-lng">Lng</label>
            <input
              id="manual-lng"
              type="number"
              value={manualLng}
              onChange={(e) => setManualLng(e.target.value)}
              placeholder="-46.633308"
            />
          </div>
          <button type="button" onClick={applyManual}>
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
