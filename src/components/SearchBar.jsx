import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="glass-input form-control"
        placeholder="Search city (e.g., London, Delhi)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="glass-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
