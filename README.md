🌤️ WeatherVerse (Weather App)
A modern and interactive weather application built using React that provides real-time weather information based on the user’s current location, searched cities, and selected countries. WeatherVerse delivers a visually appealing glassmorphism UI with live time updates, nearby place distances, and country-level weather insights for an enhanced user experience.

---

🌟 Live Features

📍 Automatic Location Detection  
- Detects user’s current location using browser geolocation  
- Displays real-time weather with a “You are here” indicator  

🔍 City Search  
- Search for any city worldwide  
- View temperature, humidity, wind speed, and weather conditions  
- Option to return back to current location weather  

🌍 Country Weather Explorer  
- Select a country to view weather in famous cities  
- Displays live running local time for the selected country  
- Country cards rendered using reusable components  

🌆 Nearby Places  
- Shows nearby locations based on your current position  
- Calculates and displays real distance (km) using the Haversine formula  

🕒 Live Time Updates  
- Live running local time for current location  
- Live running time for selected countries (timezone-aware)  

🌞🌙 Dynamic Favicon  
- Sun icon during daytime  
- Moon icon during nighttime  
- Uses real sunrise & sunset data from Weather API  

🎨 Glassmorphism UI  
- Frosted glass effect cards  
- Subtle glowing edges  
- Smooth animations & transitions  
- Light/Dark mode toggle  

---

⚙️ Tech Stack

Frontend  
⚛️ React.js  
🎨 Bootstrap 5  
🎭 Custom Glassmorphism CSS  

APIs  
🌦 OpenWeatherMap API  
📍 Browser Geolocation API  

Utilities  
📏 Haversine Formula (Distance Calculation)  
🌐 Timezone-based time handling  

---

🚀 Commands to Run the App

📦 Install Dependencies  
```bash
npm install
