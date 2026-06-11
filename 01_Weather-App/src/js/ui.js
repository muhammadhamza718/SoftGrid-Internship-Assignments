/**
 * ui.js — DOM manipulation and rendering logic
 *
 * Sole responsibility: update the DOM to reflect loading, error,
 * and weather-data states. No API calls or event wiring here.
 */

/* --- DOM References --- */
const weatherCard = document.getElementById('weather-card');
const loadingEl = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const cityNameEl = document.getElementById('city-name');
const countryEl = document.getElementById('country');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIconContainer = document.getElementById('weather-icon-container');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');

/**
 * Show the loading spinner and hide other states.
 */
export function showLoading() {
  weatherCard.classList.add('hidden');
  errorContainer.classList.add('hidden');
  loadingEl.classList.remove('hidden');
}

/**
 * Display weather data in the card and animate it into view.
 *
 * @param {Object} data — normalized WeatherData from api.js
 */
export function showWeather(data) {
  loadingEl.classList.add('hidden');
  errorContainer.classList.add('hidden');

  cityNameEl.textContent = data.cityName;
  countryEl.textContent = data.country;
  temperatureEl.textContent = `${data.temperature}°C`;
  descriptionEl.textContent = data.description;
  humidityEl.textContent = `${data.humidity}%`;
  windSpeedEl.textContent = `${data.windSpeed} m/s`;

  weatherIconContainer.innerHTML = getWeatherIconSVG(data.iconCode, data.description);

  /* Trigger entrance animation by removing then re-adding the card */
  weatherCard.classList.remove('hidden', 'visible');

  /* Force a reflow so the browser registers the removal before re-add */
  void weatherCard.offsetHeight;

  weatherCard.classList.add('visible');
  weatherCard.classList.remove('hidden');
}

/**
 * Show an error message in a styled container with a shake animation.
 *
 * @param {string} message — user-friendly error text
 */
export function showError(message) {
  loadingEl.classList.add('hidden');
  weatherCard.classList.add('hidden');

  errorMessage.textContent = message;

  /* Re-trigger shake animation */
  errorContainer.classList.remove('glass-card--error');
  void errorContainer.offsetHeight;
  errorContainer.classList.add('glass-card--error');

  errorContainer.classList.remove('hidden');
}

/**
 * Clear all result states — hide card, error, and loading.
 */
export function clearResults() {
  weatherCard.classList.add('hidden');
  weatherCard.classList.remove('visible');
  errorContainer.classList.add('hidden');
  loadingEl.classList.add('hidden');
}

/**
 * Wrap inline SVG content with boilerplate defs and outer tag.
 */
function createSVGWrapper(content) {
  return `
    <svg viewBox="0 0 100 100" class="weather-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--clr-sun-start)" />
          <stop offset="100%" stop-color="var(--clr-sun-end)" />
        </radialGradient>
        <radialGradient id="moonGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="var(--clr-moon-start)" />
          <stop offset="100%" stop-color="var(--clr-moon-end)" />
        </radialGradient>
        <linearGradient id="cloudDayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--clr-cloud-day-start)" />
          <stop offset="100%" stop-color="var(--clr-cloud-day-end)" />
        </linearGradient>
        <linearGradient id="cloudNightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--clr-cloud-night-start)" />
          <stop offset="100%" stop-color="var(--clr-cloud-night-end)" />
        </linearGradient>
        <linearGradient id="rainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--clr-rain-start)" />
          <stop offset="100%" stop-color="var(--clr-rain-end)" />
        </linearGradient>
      </defs>
      ${content}
    </svg>
  `;
}

/**
 * Map OpenWeatherMap icon code to a high-quality, animated CSS-based SVG string.
 */
function getWeatherIconSVG(iconCode, description) {
  const isDay = iconCode.endsWith('d');
  
  // Base elements
  const sunBody = '<circle class="svg-sun-body" cx="50" cy="50" r="22" fill="url(#sunGrad)" />';
  const sunBeams = `
    <g class="svg-sun-beams" stroke="var(--clr-sun-end)" stroke-width="3.5" stroke-linecap="round">
      <line x1="50" y1="16" x2="50" y2="6" />
      <line x1="50" y1="84" x2="50" y2="94" />
      <line x1="16" y1="50" x2="6" y2="50" />
      <line x1="84" y1="50" x2="94" y2="50" />
      <line x1="26" y1="26" x2="19" y2="19" />
      <line x1="74" y1="74" x2="81" y2="81" />
      <line x1="26" y1="74" x2="19" y2="81" />
      <line x1="74" y1="26" x2="81" y2="19" />
    </g>
  `;
  
  const moonBody = `
    <g class="svg-moon-body">
      <circle cx="50" cy="50" r="26" fill="url(#moonGrad)" />
      <circle class="svg-moon-crater" cx="38" cy="42" r="4.5" fill="#90a4ae" />
      <circle class="svg-moon-crater" cx="46" cy="60" r="3" fill="#90a4ae" />
      <circle class="svg-moon-crater" cx="56" cy="52" r="4" fill="#90a4ae" />
    </g>
  `;
  
  const sunBack = '<circle class="svg-sun-body" cx="62" cy="38" r="16" fill="url(#sunGrad)" />';
  
  const moonBack = `
    <g class="svg-moon-body">
      <circle cx="62" cy="38" r="18" fill="url(#moonGrad)" />
      <circle class="svg-moon-crater" cx="54" cy="34" r="2.5" fill="#90a4ae" />
      <circle class="svg-moon-crater" cx="58" cy="46" r="2" fill="#90a4ae" />
      <circle class="svg-moon-crater" cx="68" cy="40" r="2.5" fill="#90a4ae" />
    </g>
  `;
  
  const cloudDay = '<path class="svg-cloud svg-cloud-front" d="M22,64h38a13,13 0 0,0 2,-25.8a15,15 0 0,0 -29,-4.4a12,12 0 0,0 -11,14.2a12,12 0 0,0 0,16z" fill="url(#cloudDayGrad)" />';
  const cloudNight = '<path class="svg-cloud svg-cloud-front" d="M22,64h38a13,13 0 0,0 2,-25.8a15,15 0 0,0 -29,-4.4a12,12 0 0,0 -11,14.2a12,12 0 0,0 0,16z" fill="url(#cloudNightGrad)" />';
  
  const scatteredCloudDay = '<path class="svg-cloud svg-cloud-front" d="M20,62h44a15,15 0 0,0 2,-29.8a17,17 0 0,0 -32.8,-5a14,14 0 0,0 -12.2,16.2a13,13 0 0,0 -1,18.6z" fill="url(#cloudDayGrad)" />';
  const scatteredCloudNight = '<path class="svg-cloud svg-cloud-front" d="M20,62h44a15,15 0 0,0 2,-29.8a17,17 0 0,0 -32.8,-5a14,14 0 0,0 -12.2,16.2a13,13 0 0,0 -1,18.6z" fill="url(#cloudNightGrad)" />';

  const backCloudDay = '<path class="svg-cloud svg-cloud-back" d="M36,54h34a12,12 0 0,0 1.5,-23.8a14,14 0 0,0 -26.2,-4a11,11 0 0,0 -9.6,12.8a10,10 0 0,0 0.3,15z" fill="rgba(255,255,255,0.45)" />';
  const backCloudNight = '<path class="svg-cloud svg-cloud-back" d="M36,54h34a12,12 0 0,0 1.5,-23.8a14,14 0 0,0 -26.2,-4a11,11 0 0,0 -9.6,12.8a10,10 0 0,0 0.3,15z" fill="rgba(30, 41, 59, 0.7)" />';
  const frontCloudDay = '<path class="svg-cloud svg-cloud-front" d="M18,66h42a14,14 0 0,0 2,-27.8a16,16 0 0,0 -30.8,-4.7a13,13 0 0,0 -11.5,15.2a12,12 0 0,0 -1.7,17.3z" fill="url(#cloudDayGrad)" />';
  const frontCloudNight = '<path class="svg-cloud svg-cloud-front" d="M18,66h42a14,14 0 0,0 2,-27.8a16,16 0 0,0 -30.8,-4.7a13,13 0 0,0 -11.5,15.2a12,12 0 0,0 -1.7,17.3z" fill="url(#cloudNightGrad)" />';

  const rainDrops = `
    <g class="svg-rain-drops" stroke="url(#rainGrad)" stroke-width="2.5" stroke-linecap="round">
      <line class="svg-rain-drop" x1="30" y1="62" x2="28" y2="70" />
      <line class="svg-rain-drop" x1="40" y1="64" x2="38" y2="72" />
      <line class="svg-rain-drop" x1="50" y1="62" x2="48" y2="70" />
      <line class="svg-rain-drop" x1="60" y1="64" x2="58" y2="72" />
    </g>
  `;
  
  const lightningBolt = '<polygon class="svg-lightning-bolt" points="44,56 52,56 46,68 54,68 40,84 44,70 38,70" fill="var(--clr-lightning)" />';
  
  const snowflakes = `
    <g class="svg-snowflakes" fill="var(--clr-snow-start)">
      <circle class="svg-snowflake" cx="30" cy="64" r="2" />
      <circle class="svg-snowflake" cx="42" cy="66" r="2.5" />
      <circle class="svg-snowflake" cx="54" cy="63" r="2" />
      <circle class="svg-snowflake" cx="64" cy="66" r="1.5" />
    </g>
  `;
  
  const mistLines = `
    <g class="svg-mist-lines" stroke="var(--clr-text-secondary)" stroke-width="2.5" stroke-linecap="round" opacity="0.65">
      <line class="svg-mist-line" x1="20" y1="46" x2="80" y2="46" />
      <line class="svg-mist-line" x1="15" y1="54" x2="75" y2="54" />
      <line class="svg-mist-line" x1="25" y1="62" x2="85" y2="62" />
    </g>
  `;

  // Match specific OWM icon codes
  switch (iconCode) {
    // Clear Sky (Day / Night)
    case '01d':
      return createSVGWrapper(sunBeams + sunBody);
    case '01n':
      return createSVGWrapper(moonBody);
      
    // Few Clouds (Day / Night)
    case '02d':
      return createSVGWrapper(sunBack + cloudDay);
    case '02n':
      return createSVGWrapper(moonBack + cloudNight);
      
    // Scattered Clouds (Day / Night)
    case '03d':
      return createSVGWrapper(scatteredCloudDay);
    case '03n':
      return createSVGWrapper(scatteredCloudNight);
      
    // Broken / Overcast Clouds (Day / Night)
    case '04d':
      return createSVGWrapper(backCloudDay + frontCloudDay);
    case '04n':
      return createSVGWrapper(backCloudNight + frontCloudNight);
      
    // Shower Rain / Drizzle (Day / Night)
    case '09d':
      return createSVGWrapper(frontCloudDay + rainDrops);
    case '09n':
      return createSVGWrapper(frontCloudNight + rainDrops);
      
    // Rain (Day / Night)
    case '10d':
      return createSVGWrapper(sunBack + frontCloudDay + rainDrops);
    case '10n':
      return createSVGWrapper(moonBack + frontCloudNight + rainDrops);
      
    // Thunderstorm (Day / Night)
    case '11d':
    case '11n':
      const darkCloud = '<path class="svg-cloud svg-cloud-front" d="M20,50h42a14,14 0 0,0 2,-27.8a16,16 0 0,0 -30.8,-4.7a13,13 0 0,0 -11.5,15.2a12,12 0 0,0 -1.7,17.3z" fill="url(#cloudNightGrad)" />';
      return createSVGWrapper(darkCloud + rainDrops + lightningBolt);
      
    // Snow (Day / Night)
    case '13d':
    case '13n':
      const cloudGrad = isDay ? 'url(#cloudDayGrad)' : 'url(#cloudNightGrad)';
      const snowCloud = `<path class="svg-cloud svg-cloud-front" d="M20,54h42a14,14 0 0,0 2,-27.8a16,16 0 0,0 -30.8,-4.7a13,13 0 0,0 -11.5,15.2a12,12 0 0,0 -1.7,17.3z" fill="${cloudGrad}" />`;
      return createSVGWrapper(snowCloud + snowflakes);
      
    // Mist / Fog (Day / Night)
    case '50d':
      return createSVGWrapper(sunBody + mistLines);
    case '50n':
      return createSVGWrapper(moonBody + mistLines);
      
    // Fallback: Default to day or night clear sky
    default:
      return createSVGWrapper(isDay ? (sunBeams + sunBody) : moonBody);
  }
}
