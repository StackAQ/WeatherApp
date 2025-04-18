import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const API_URL = import.meta.env.VITE_APP_BASE_URL;

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      setError("");
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        } else {
          throw new Error("Failed to fetch weather data");
        }
      }
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
      });
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="weather-layout">
        <h1>ABDULQUDUS WEATHER APP</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City Name"
        />
        <button className="get-btn" onClick={fetchWeather}>
          Get Weather
        </button>

        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="result">
            <h2>{weather.city}</h2>
            <p>{weather.temp}°C</p>
            <p>{weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}