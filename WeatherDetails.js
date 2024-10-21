import React from 'react';

const WeatherDetails = ({ data }) => {
  const weatherCondition = data.weather[0].main.toLowerCase();
  const getThemeClass = (condition) => {
    if (condition.includes('rain')) return 'rainy';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('sun')) return 'sunny';
    return 'default';
  };

  return (
    <div className={`weather-card ${getThemeClass(weatherCondition)}`}>
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <p>Weather: {data.weather[0].description}</p>
    </div>
  );
};

export default WeatherDetails;
