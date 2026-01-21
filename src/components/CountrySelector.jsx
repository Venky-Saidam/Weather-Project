function CountrySelector({ countries, onSelect, selectedCountry }) {
  return (
    <div className="mb-4">
      {/* Dropdown */}
      <select
        className="form-select mb-3"
        value={selectedCountry || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>
          🌍 Select a country
        </option>

        {Object.keys(countries).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* Flag Grid */}
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {Object.entries(countries).map(([country, data]) => (
          <div
            key={country}
            className="text-center"
            onClick={() => onSelect(country)}
            style={{
              cursor: "pointer",
              padding: "6px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              border:
                selectedCountry === country
                  ? "2px solid #0d6efd"
                  : "2px solid transparent",
              transform:
                selectedCountry === country ? "scale(1.1)" : "scale(1)",
              backgroundColor:
                selectedCountry === country ? "rgba(13,110,253,0.1)" : "transparent",
            }}
          >
            <img
              src={`https://flagcdn.com/w40/${data.code}.png`}
              alt={`${country} flag`}
              loading="lazy"
            />
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
              {country}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySelector;
