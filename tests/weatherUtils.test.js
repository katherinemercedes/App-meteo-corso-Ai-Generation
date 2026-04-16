import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTemperature,
  sanitizeCityName,
  weatherCodeToText
} from '../src/weatherUtils.js';

test('sanitizeCityName rimuove spazi iniziali, finali e multipli', () => {
  assert.equal(sanitizeCityName('   New   York   '), 'New York');
});

test('weatherCodeToText restituisce una descrizione leggibile', () => {
  assert.equal(weatherCodeToText(63), 'Pioggia moderata');
});

test('formatTemperature aggiunge l unità di misura', () => {
  assert.equal(formatTemperature(22.5), '22.5 °C');
});
