# Weather App Design Specification

## Overview
A dynamic, client-side Weather Application built with HTML, CSS, and Vanilla JavaScript. The app will fetch live weather data from the OpenWeatherMap API based on user search queries and display the results in a premium, Dark Mode Glassmorphism UI.

## Features & Requirements
- **Search Input**: A text field allowing users to search for weather by city name.
- **Dynamic Weather Metrics**: Real-time display of:
  - Temperature (in Celsius)
  - Humidity
  - Wind speed
  - Weather description (e.g., "broken clouds")
- **Visuals & Status Icons**: Appropriate weather icons corresponding to the current weather condition (provided by the API or custom SVG icons mapped to API condition codes).
- **Design Aesthetic**: Glassmorphism in Dark Mode.
  - Frosted glass panels (`backdrop-filter: blur()`).
  - Vibrant but dark background gradients to provide contrast.
  - Smooth hover micro-animations for interactivity.

## Architecture & Data Flow
1. **User Input**: The user enters a city name into the search bar and submits the form.
2. **API Request**: The JavaScript fetches data from the OpenWeatherMap API:
   `GET https://api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={API_KEY}`
3. **State Management**: The app will handle loading states, success states (displaying data), and error states (e.g., "City not found").
4. **DOM Updates**: Upon a successful API response, the DOM is updated dynamically with the new weather metrics.

## Component Structure
- `index.html`: Semantic HTML structure containing the search form and a weather card container.
- `styles.css`: CSS variables for the color palette, Glassmorphism utility classes, animations, and responsive layout.
- `app.js`: JavaScript logic for fetching the API, handling errors, and updating the DOM.

## Technical Constraints & Best Practices
- **No frameworks**: Pure HTML, CSS, and JS to keep the bundle small and maintainable.
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<form>`, `<section>`.
- **CSS Architecture**: Use of CSS custom properties (variables) for theming. Avoid deep nesting and use BEM-like class naming conventions if necessary.
- **JS Best Practices**: Use `async/await` for API calls, handle errors gracefully using `try/catch`, separate concerns (API logic vs. UI logic).

## Future Scope (Not in initial version)
- Geolocation API to fetch weather for the user's current location on load.
- 5-day forecast.
