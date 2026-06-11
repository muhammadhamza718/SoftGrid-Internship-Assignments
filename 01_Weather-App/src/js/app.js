// app.js — Application entry point and event wiring
// Sole responsibility: connect DOM events to API calls and UI updates.
// No direct DOM manipulation or API logic lives here.

import { fetchWeather } from './api.js';
import { showLoading, showWeather, showError, clearResults } from './ui.js';

async function handleSearch(event) {
  event.preventDefault();

  const cityInput = document.getElementById('city-input');
  const cityName = cityInput.value.trim();

  if (!cityName) {
    return;
  }

  clearResults();
  showLoading();

  try {
    const weatherData = await fetchWeather(cityName);
    showWeather(weatherData);
  } catch (error) {
    showError(error.message);
  }
}

function init() {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);
}

document.addEventListener('DOMContentLoaded', init);
