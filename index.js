import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import WeatherAlerts from './components/WeatherAlerts';
import ForecastGraph from './components/ForecastGraph.js';
import axios from 'axios';
import './App.css';

const API_KEY = 'YOUR_API_KEY_HERE'; // Get this from OpenWeatherMap

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData([...weatherData, weatherResponse.data]);

      // Fetch forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data.list);

      // Fetch weather alerts (from One Call API if available)
      const lat = weatherResponse.data.coord.lat;
      const lon = weatherResponse.data.coord.lon;
      const alertResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${API_KEY}`
      );
      if (alertResponse.data.alerts) {
        setAlerts(alertResponse.data.alerts);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <button className="toggle-mode" onClick={toggleDarkMode}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <SearchBar onSearch={fetchWeather} />

      {weatherData.map((data, index) => (
        <WeatherDetails key={index} data={data} />
      ))}

      {forecastData && <ForecastGraph forecastData={forecastData} />}

      <WeatherAlerts alerts={alerts} />
    </div>
  );
};

export default App;
