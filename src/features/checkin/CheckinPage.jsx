import { LocationStatus } from '../../components/LocationStatus';
import { useGeolocation } from '../../hooks/useGeolocation';

export default function CheckinPage() {
  const { location, loading, error } = useGeolocation();

  if (loading) {
    return (
      <div>
        <h1>Check-in</h1>
        <p>capturando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Check-in</h1>
        <LocationStatus />
      </div>
    );
  }

  if (!location) {
    return (
      <div>
        <h1>Check-in</h1>
        <LocationStatus />
      </div>
    );
  }

  return (
    <div>
      <h1>Check-in</h1>
      <p>Localizacao confirmada. Acoes liberadas.</p>
      <button type="button">Fazer check-in</button>
    </div>
  );
}
