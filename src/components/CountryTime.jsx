import { useEffect, useState } from "react";

function CountryTime({ timezone, country }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (!timezone) return;

    const updateTime = () => {
      const utcNow =
        Date.now() + new Date().getTimezoneOffset() * 60000;

      setTime(new Date(utcNow + timezone * 1000));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!time) return null;

  return (
    <div className="glass-card fade-in text-center mb-4 country-time">
      <h4>🕒 {country} Time</h4>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default CountryTime;
