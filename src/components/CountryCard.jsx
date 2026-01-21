function CountryCard({ city }) {
  return (
    <div className="glass-card fade-in text-center country-card">
      <h5>{city.name}</h5>

      <img
        className="mx-auto d-block weather-icon"
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p className="text-capitalize">
        {city.weather[0].description}
      </p>

      <p>🌡 {city.main.temp}°C</p>
      <p>💧 {city.main.humidity}%</p>
      <p>🌬 {city.wind.speed} m/s</p>
    </div>
  );
}

export default CountryCard;
