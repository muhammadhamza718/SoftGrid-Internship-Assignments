# API Contract: OpenWeatherMap Current Weather

**Endpoint**: `GET https://api.openweathermap.org/data/2.5/weather`

## Request Parameters
- `q` (string, required): City name (e.g., "London").
- `appid` (string, required): API Key.
- `units` (string, optional): Units of measurement. Use `metric` for Celsius.

## Success Response (200 OK)
```json
{
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 25.5,
    "humidity": 60
  },
  "wind": {
    "speed": 3.5
  },
  "name": "London",
  "sys": {
    "country": "GB"
  }
}
```

## Error Response (404 Not Found)
```json
{
  "cod": "404",
  "message": "city not found"
}
```
