const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the src directory
app.use(express.static('src'));

// Weather API proxy route
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    
    // Dynamically import node-fetch as it's an ESM module in recent versions
    // If running an older version, a regular require('node-fetch') might be needed or use built-in fetch if Node 18+
    // Since Node 18+, fetch is available globally. Let's try global fetch first.
    let fetchFn = global.fetch;
    if (!fetchFn) {
        try {
           const fetchModule = await import('node-fetch');
           fetchFn = fetchModule.default;
        } catch (err) {
            console.error('Fetch is not available. Please ensure you are running Node 18+ or install node-fetch.');
            return res.status(500).json({ error: 'Internal Server Error: Fetch not available' });
        }
    }

    const response = await fetchFn(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the app at http://localhost:${PORT}`);
});
