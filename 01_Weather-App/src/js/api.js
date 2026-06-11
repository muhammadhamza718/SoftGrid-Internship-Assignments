// api.js — OpenWeatherMap API fetch logic
// Sole responsibility: construct requests, call the API, parse responses,
// and return a normalized WeatherData object. Throws on errors.

export async function fetchWeather(cityName) {
  // Use our local proxy server endpoint
  const url = `/api/weather?city=${encodeURIComponent(cityName)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const message = data.message || 'Something went wrong';
      throw new Error(
        response.status === 404
          ? `City "${cityName}" not found. Please check the spelling.`
          : `Weather API error: ${message}`
      );
    }

    return mapWeatherData(data);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
}

function mapWeatherData(raw) {
  return {
    cityName: raw.name,
    country: raw.sys.country,
    temperature: Math.round(raw.main.temp),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: raw.weather[0].description,
    iconCode: raw.weather[0].icon,
  };
}
