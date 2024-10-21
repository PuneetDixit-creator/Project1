import React from 'react';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts">
      {alerts.map((alert, index) => (
        <div key={index} className="alert">
          <h3>{alert.event}</h3>
          <p>{alert.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
