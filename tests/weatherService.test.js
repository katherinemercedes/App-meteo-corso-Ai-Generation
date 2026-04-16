import test from 'node:test';
import assert from 'node:assert/strict';
import { buildForecastUrl, buildGeocodingUrl } from '../src/weatherService.js';

test('buildGeocodingUrl costruisce una URL valida per una città', () => {
  const url = buildGeocodingUrl('Roma');

  assert.equal(
    url,
    'https://geocoding-api.open-meteo.com/v1/search?name=Roma&count=1&language=it&format=json'
  );
});

test('buildForecastUrl costruisce una URL valida con coordinate e dati correnti', () => {
  const url = buildForecastUrl(41.9, 12.5);

  assert.equal(
    url,
    'https://api.open-meteo.com/v1/forecast?latitude=41.9&longitude=12.5&current=temperature_2m%2Cwind_speed_10m%2Cweather_code&wind_speed_unit=kmh&timezone=auto'
  );
});
