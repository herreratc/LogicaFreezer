// Centralized geolocation helper
export async function getCurrentLocation() {
  if (!('geolocation' in navigator)) {
    const err = new Error('Geolocation not supported');
    err.code = 'GEOLOCATION_NOT_SUPPORTED';
    err.message = 'Geolocalizacao nao suportada neste dispositivo.';
    throw err;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 5000,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        const err = new Error();
        err.code = error.code;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            err.message = 'Permissao de localizacao negada.';
            err.code = 'PERMISSION_DENIED';
            break;
          case error.POSITION_UNAVAILABLE:
            err.message = 'Localizacao indisponivel no momento.';
            err.code = 'POSITION_UNAVAILABLE';
            break;
          case error.TIMEOUT:
            err.message = 'Tempo esgotado ao obter localizacao.';
            err.code = 'TIMEOUT';
            break;
          default:
            err.message = 'Erro ao obter localizacao.';
            err.code = 'UNKNOWN_ERROR';
            break;
        }
        reject(err);
      },
      options
    );
  });
}
