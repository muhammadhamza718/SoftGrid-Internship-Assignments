# Developer Quickstart: Weather App

## Prerequisites
- A modern web browser.
- A local development server (e.g., VSCode Live Server, `python -m http.server`, or `npx serve`).

## Setup Instructions
1. Clone or open the repository.
2. The code is located in the `src/` directory.
3. Open `src/index.html` using a local web server to avoid CORS issues or file:// protocol restrictions when fetching API data.

## Configuration
- The OpenWeatherMap API key is currently hardcoded in `src/js/api.js` or configured via a constant. No `.env` setup is required for this purely client-side static build.

## Architecture
- `src/js/api.js`: Responsible for all `fetch` calls to OpenWeatherMap.
- `src/js/ui.js`: Responsible for updating the DOM (rendering weather data, handling errors, managing loading states).
- `src/js/app.js`: Connects the UI events (form submission) to the API logic.
