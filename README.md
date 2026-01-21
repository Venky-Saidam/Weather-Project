🌤 WeatherVerse (Weather App)

A modern and interactive weather application built using React. WeatherVerse provides real-time weather information based on the user’s current location, searched cities, nearby places, and selected countries. The app features a clean glassmorphism UI, live time updates, and accurate distance calculations for an enhanced user experience.

☀️ Commands for Running the App

npm install
Used for installing all required dependencies for the project.

npm start
Runs the app in development mode.
Open http://localhost:3000
 to view it in the browser.

🌟 Features

📍 Automatic Location Detection
Detects the user’s current location using the browser’s Geolocation API and displays real-time weather data.

🌤 Current Location Weather
Displays temperature, humidity, wind speed, weather conditions, sunrise & sunset timings, and live local time.

🔍 City Search
Search for any city worldwide and view real-time weather details. Includes a “Back to My Location” option.

🌆 Nearby Places Weather
Shows nearby locations along with their weather details and the real distance (in kilometers) from the user’s location using the Haversine formula.

🌍 Country Weather Explorer
Allows users to select a country and view weather information for famous cities within that country.

🕒 Live Time Display
Displays continuously running local time for:

User’s current location

Selected country (timezone-aware)

🌞🌙 Dynamic Favicon
Automatically switches between sun and moon icons based on real sunrise and sunset times from the Weather API.

🎨 Glassmorphism UI & Dark Mode
Frosted-glass cards, subtle glowing effects, smooth animations, and a dark/light mode toggle.

🛠 Tech Stack

Frontend: React.js

Styling: Bootstrap v5, Custom CSS (Glassmorphism)

Weather API: OpenWeatherMap API

Location Services: Browser Geolocation API
