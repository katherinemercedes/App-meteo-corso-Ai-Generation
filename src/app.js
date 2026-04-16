import { fetchWeatherByCity } from './weatherService.js';
import {
  formatTemperature,
  formatWindSpeed,
  sanitizeCityName,
  weatherCodeToText
} from './weatherUtils.js';

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const statusMessage = document.getElementById('status-message');
const weatherResult = document.getElementById('weather-result');
const resultCity = document.getElementById('result-city');
const resultTemp = document.getElementById('result-temp');
const resultWind = document.getElementById('result-wind');
const resultDescription = document.getElementById('result-description');
const resultTime = document.getElementById('result-time');
const recentSearchesList = document.getElementById('recent-searches-list');

const RECENT_SEARCHES_KEY = 'weather_recent_searches';
const MAX_RECENT_SEARCHES = 5;

function setStatusMessage(message, isError = true) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? '#b91c1c' : '#166534';
}

function hideResult() {
  weatherResult.classList.add('hidden');
}

function showResult(weatherData) {
  resultCity.textContent = weatherData.cityLabel;
  resultTemp.textContent = formatTemperature(weatherData.temperature);
  resultWind.textContent = formatWindSpeed(weatherData.windSpeed);
  resultDescription.textContent = weatherCodeToText(weatherData.weatherCode);
  resultTime.textContent = weatherData.time;
  weatherResult.classList.remove('hidden');
}

function getRecentSearches() {
  const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
  return savedSearches ? JSON.parse(savedSearches) : [];
}

function saveRecentSearch(cityName) {
  const currentSearches = getRecentSearches().filter((item) => item !== cityName);
  currentSearches.unshift(cityName);
  const trimmedSearches = currentSearches.slice(0, MAX_RECENT_SEARCHES);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(trimmedSearches));
}

function renderRecentSearches() {
  const searches = getRecentSearches();
  recentSearchesList.innerHTML = '';

  if (searches.length === 0) {
    recentSearchesList.textContent = 'Nessuna ricerca recente.';
    return;
  }

  searches.forEach((cityName) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'recent-button';
    button.textContent = cityName;
    button.addEventListener('click', () => {
      cityInput.value = cityName;
      handleSearch(cityName);
    });
    recentSearchesList.appendChild(button);
  });
}

async function handleSearch(rawCityName) {
  const cityName = sanitizeCityName(rawCityName);

  if (!cityName) {
    hideResult();
    setStatusMessage('Inserisci una città valida.');
    return;
  }

  setStatusMessage('Caricamento dati meteo...', false);
  hideResult();

  try {
    const weatherData = await fetchWeatherByCity(cityName);
    showResult(weatherData);
    saveRecentSearch(cityName);
    renderRecentSearches();
    setStatusMessage('Meteo caricato con successo.', false);
  } catch (error) {
    hideResult();
    setStatusMessage(error.message || 'Si è verificato un errore imprevisto.');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await handleSearch(cityInput.value);
});

renderRecentSearches();
