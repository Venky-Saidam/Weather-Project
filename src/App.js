import { useEffect, useState } from "react";
import axios from "axios";

import CurrentWeather from "./components/CurrentWeather";
import NearbyPlaces from "./components/NearbyPlaces";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import CountryTime from "./components/CountryTime";
import CountryCard from "./components/CountryCard";
import CountrySelector from "./components/CountrySelector";

import countries from "./data/countries";



function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [countryWeather, setCountryWeather] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSearchResult, setIsSearchResult] = useState(false);



  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const [loading, setLoading] = useState(true);


  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => setError("Location permission denied")
    );
  }, []);

  // Fetch current weather
  useEffect(() => {
    if (!location) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
      )
      .then((res) => {
        setWeather(res.data);
        setIsSearchResult(false);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch weather data");
        setLoading(false);
      });

  }, [location, API_KEY]);

  // Fetch nearby places
  useEffect(() => {
    if (!location) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/find?lat=${location.lat}&lon=${location.lon}&cnt=6&units=metric&appid=${API_KEY}`
      )
      .then((res) => setNearbyPlaces(res.data.list))
      .catch(() => setError("Unable to fetch nearby places"));

  }, [location, API_KEY]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // City Search
  const handleCitySearch = (cityName) => {
    setLoading(true);
    setError("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      )
      .then((res) => {
        setWeather({
          ...res.data,
          isSearchResult: true
        });
        updateFavicon(res.data.sys.sunrise, res.data.sys.sunset);
        setNearbyPlaces([]);
        setIsSearchResult(true);
        setLoading(false);
      })
      .catch(() => {
        setError("City not found. Please try again.");
        setLoading(false);
      });
  };

  //Country Selection
  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
    setLoading(true);
    setError("");
    setCountryWeather([]);

    const cities = countries[country].cities;


    try {
      const requests = cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
      );

      const responses = await Promise.all(requests);
      setCountryWeather(responses.map((res) => res.data));
    } catch {
      setError("Unable to fetch country weather data");
    } finally {
      setLoading(false);
    }
  };

  const updateFavicon = (sunrise, sunset) => {
    const favicon = document.getElementById("dynamic-favicon");
    if (!favicon) return;

    const now = Math.floor(Date.now() / 1000); // current time in seconds

    if (now >= sunrise && now < sunset) {
      favicon.href = "/sun.png";
    } else {
      favicon.href = "/moon.png";
    }
  };




  return (
    <div className={`app-glass ${darkMode ? "dark" : ""}`}>

      <div className="text-end mb-3">
        <button
          className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>


      <div className="text-center mb-4">
        <h1>🌤 Weather App</h1>
        <p className="text-muted">
          Real-time weather based on your location
        </p>
      </div>


      {!showCountries && (
        <div className="mb-4">
          <SearchBar onSearch={handleCitySearch} />
        </div>
      )}


      <div className="text-center mb-4">
        <button
          className="btn glass-btn"
          onClick={() => setShowCountries((prev) => !prev)}
        >
          {showCountries
            ? "⬅ Back to My Location Weather"
            : "🌍 Explore Weather in Other Countries"}
        </button>
      </div>



      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {loading && !error && <Loader />}

      {showCountries && (
        <>
          <CountrySelector
            countries={countries}
            onSelect={handleCountrySelect}
            selectedCountry={selectedCountry}
          />

          {countryWeather.length > 0 && (
            <>
              <CountryTime
                country={selectedCountry}
                timezone={countryWeather[0].timezone}
              />

              <div className="row">
                {countryWeather.map((city) => (
                  <div className="col-md-4 mb-3" key={city.id}>
                    <CountryCard city={city} />
                  </div>
                ))}
              </div>
            </>
          )}


        </>
      )}

      {isSearchResult && (
        <div className="text-center mb-3">
          <button
            className="btn glass-btn"
            onClick={() => {
              setIsSearchResult(false);
              setLoading(true);
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                  });
                },
                () => setError("Location permission denied")
              );
            }}
          >
            ⬅ Back to My Location Weather
          </button>
        </div>
      )}



      {!showCountries && (
        <>
          {weather && (
            <CurrentWeather
              weather={weather}
              isCurrentLocation={!isSearchResult}
            />

          )}

          {nearbyPlaces.length > 0 && location && (
            <NearbyPlaces
              places={nearbyPlaces}
              userLocation={location}
            />
          )}

        </>
      )}

    </div>
  );
}

export default App;
