import { useEffect, useState } from "react";



const formatTime = (unix) =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const windDir = (deg) =>
  ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(deg / 45) % 8];

const advisory = (desc) => {
  if (desc.includes("rain")) return "☔ Carry an umbrella";
  if (desc.includes("clear")) return "😎 Great weather outside";
  if (desc.includes("snow")) return "❄ Drive carefully";
  return "🌤 Have a great day!";
};


function CurrentWeather({ weather, isCurrentLocation }) {
  const [localTime, setLocalTime] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const utcNow =
        Date.now() + new Date().getTimezoneOffset() * 60000;

      setLocalTime(
        new Date(utcNow + weather.timezone * 1000)
      );
    };

    updateTime(); // run immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup
  }, [weather.timezone]);


  return (
    <div className="glass-card fade-in current-location text-center">




      {isCurrentLocation && (
        <div className="location-badge">
          📍 You are here
        </div>
      )}



      <h3>{weather.name}</h3>
      {localTime && (
        <p>🕒 Local time: {localTime.toLocaleTimeString()}</p>
      )}


      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p className="text-muted text-capitalize">
        {weather.weather[0].description}
      </p>

      <h1>{weather.main.temp}°C</h1>
      <p>🤗 Feels like: {weather.main.feels_like}°C</p>

      <div className="row justify-content-center mt-2">
        <div className="col-6">
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
        <div className="col-6">
          <p>
            🌬 Wind: {weather.wind.speed} m/s ({windDir(weather.wind.deg)})
          </p>
        </div>
      </div>




      <div className="row justify-content-center mt-2">
        <div className="col-6">
          <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
        </div>
        <div className="col-6">
          <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
        </div>
      </div>

      <p className="advisory">
        {advisory(weather.weather[0].description.toLowerCase())}
      </p>


    </div>
  );
}

export default CurrentWeather;
