import React, { useState } from 'react';
import '../../../css/weather.css'; 

const WeatherWidget = () => {
  const [postcode, setPostcode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'e48e17fa5e894047ac8161125242103';
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${postcode}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-widget">
      <form onSubmit={handleSubmit}>
        <label>
          Enter your postcode to get the latest weather information:
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <p>Location: {weatherData.location.name}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
          {weatherData.current.condition.text.toLowerCase().includes('rain') && (
            <p className="rain-message">Looks like it might be raining where you are. You may not need to water your plants today.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;