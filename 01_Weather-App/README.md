# SkyCast — Live Weather Search

SkyCast is a beautiful, modern weather application that provides real-time weather conditions for any city worldwide. Built with clean architecture in mind, it utilizes a "Glassmorphism in Dark Mode" design system featuring custom animated SVG icons, responsive layouts, and robust error handling. 

To keep secrets secure, the application uses a lightweight local Node.js/Express proxy server to fetch data from the OpenWeatherMap API, ensuring the API key is never exposed to the frontend browser.

## Features

- **Real-Time Data**: Get up-to-date temperature, humidity, wind speed, and weather descriptions.
- **Premium Glassmorphism UI**: A sleek dark mode design with frosted glass panels and ambient background animations.
- **Custom Animated SVG Icons**: Weather conditions are paired with fully custom, CSS-animated SVG icons that match the current weather (sun, moon, rain, snow, lightning, clouds).
- **Secure Architecture**: API keys are securely hidden behind a local Express proxy.
- **Robust Error Handling**: Gracefully handles network issues or invalid city searches with user-friendly error states and animations.

## Technologies Used

- **Frontend**: HTML5, CSS3 (Custom Properties, BEM-lite methodology, Flexbox/Grid), Vanilla JavaScript (ES6+ Modules, async/await).
- **Backend / Proxy**: Node.js, Express, `cors`, `dotenv`, `node-fetch`.
- **API**: OpenWeatherMap API.

## Prerequisites

Before running this project, you must have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- npm (comes with Node.js)

You will also need a free API key from [OpenWeatherMap](https://openweathermap.org/api).

## How to Start the Project

Follow these steps to run the SkyCast application locally:

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd 01_Weather-App
```

### 2. Set up Environment Variables
Create a file named `.env` in the root of the `01_Weather-App` directory and add your OpenWeatherMap API key:
```env
WEATHER_API_KEY=your_actual_api_key_here
PORT=3000
```
*(Note: The `.env` file is included in `.gitignore` and will never be pushed to your repository to keep your key safe).*

### 3. Install Dependencies
Install the required Node packages (Express, dotenv, cors, etc.) for the backend server:
```bash
npm install
```

### 4. Run the Development Server
Start the local Express server using the provided npm script:
```bash
npm run dev
```
*(Alternatively, you can run `npm start` for the production Node server).*

### 5. Open the Application
Once the server is running, open your web browser and navigate to:
```
http://localhost:3000
```

## Project Structure

- **`src/`**: Contains all frontend assets (HTML, CSS, JS).
  - **`css/styles.css`**: All styling, animations, and design tokens.
  - **`js/api.js`**: Fetches weather data from our local proxy.
  - **`js/ui.js`**: Handles all DOM manipulation and UI states.
  - **`js/app.js`**: The main entry point that wires events to API and UI functions.
- **`server.js`**: The Node/Express proxy server that securely requests data from OpenWeatherMap.
- **`.env`**: (Created by you) Secure environment variables.
