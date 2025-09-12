import React, { useState } from "react";
import "./styles.css";
export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("null");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    61: "Rain",
    71: "Snow fall",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  const getWeather = async () => {
    if (!city.trim()) {
      setError("please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        setLoading(false);
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      setWeather({
        ...weatherData.current_weather,
        place: `${name},${country}`,
      });
    } catch (err) {
      setError("Something went wrong.try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1 className="title">🌤️Weather Now</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <button onClick={getWeather} className="btn" disabled={loading}>
        {loading ? "loading..." : "Get Weather"}
      </button>
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.place}</h2>
          <p>🌡️{weather.temperature}°C</p>
          <p>💨{weather.windspeed}km/h</p>
          <p>⛅{weatherCodes[weather.weathercode] || "Unknown condition"}</p>
        </div>
      )}
    </div>
  );
}
``;
