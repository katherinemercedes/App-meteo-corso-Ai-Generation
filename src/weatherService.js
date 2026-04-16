import { sanitizeCityName } from './weatherUtils.js';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export function buildGeocodingUrl(cityName) {
  const cleanName = sanitizeCityName(cityName);
  const params = new URLSearchParams({
    name: cleanName,
    count: '1',
    language: 'it',
    format: 'json'
  });

  return `${GEOCODING_BASE_URL}?${params.toString()}`;
}

export function buildForecastUrl(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,wind_speed_10m,weather_code',
    wind_speed_unit: 'kmh',
    timezone: 'auto'
  });

  return `${FORECAST_BASE_URL}?${params.toString()}`;
}

export async function fetchCoordinates(cityName) {
  const response = await fetch(buildGeocodingUrl(cityName));

  if (!response.ok) {
    throw new Error('Errore durante la ricerca della città.');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Città non trovata. Prova con un altro nome.');
  }

  const firstResult = data.results[0];

  return {
    name: firstResult.name,
    country: firstResult.country,
    latitude: firstResult.latitude,
    longitude: firstResult.longitude
  };
}

export async function fetchWeatherByCity(cityName) {
  const location = await fetchCoordinates(cityName);
  const response = await fetch(buildForecastUrl(location.latitude, location.longitude));

  if (!response.ok) {
    throw new Error('Errore durante il recupero del meteo.');
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error('Dati meteo non disponibili al momento.');
  }

  return {
    cityLabel: `${location.name}, ${location.country}`,
    time: data.current.time,
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code
  };
}
