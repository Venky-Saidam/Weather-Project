const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function NearbyPlaces({ places, userLocation }) {
  return (
    <div className="mt-5">
      <h4 className="mb-3 text-center">Nearby Places</h4>

      <div className="row">
        {places.map((place) => {
          // ✅ Calculate distance for each place
          const distance = getDistanceKm(
            userLocation.lat,
            userLocation.lon,
            place.coord.lat,
            place.coord.lon
          );

          return (
            <div className="col-md-4 mb-3" key={place.id}>
              <div className="glass-card fade-in text-center">
                <h5>{place.name}</h5>

                <p>📍 {distance.toFixed(1)} km away</p>

                <img
                  className="mx-auto d-block"
                  src={`https://openweathermap.org/img/wn/${place.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />

                <p className="text-muted text-capitalize">
                  {place.weather[0].description}
                </p>

                <p>🌡 {place.main.temp}°C</p>
                <p>💧 {place.main.humidity}%</p>
                <p>🌬 {place.wind.speed} m/s</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NearbyPlaces;