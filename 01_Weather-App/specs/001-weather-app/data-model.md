# Data Model: Weather App

## Entities

### `WeatherData`
Represents the core data structure returned by the API mapping function and used by the UI components.

- `cityName` (String): Name of the city queried.
- `country` (String): ISO country code of the city.
- `temperature` (Number): Current temperature in Celsius.
- `humidity` (Number): Current humidity percentage.
- `windSpeed` (Number): Current wind speed in meters/second.
- `description` (String): Textual description of the weather (e.g., "clear sky").
- `iconCode` (String): Icon code provided by OpenWeatherMap to map to weather icons.

## Validation Rules
- `cityName` cannot be empty.
- If the API returns a 404 (city not found), the data model must resolve to an error state.
