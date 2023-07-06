import React from 'react';
import './ForecastBox.css';

interface ForecastBoxProps {
  day: string;
  temperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: string;
}

const ForecastBox: React.FC<ForecastBoxProps> = ({ day, temperature, precipitation, humidity, windSpeed }) => {
  return (
    <div className="forecastBox">
      <div className="day">{day}</div>
      <div className="temperature">Temperature: {temperature}°F</div>
      <div className="precipitation">Precipitation: {precipitation}%</div>
      <div className="humidity">Humidity: {humidity}</div>
      <div className="windSpeed">Wind Speed: {windSpeed}</div>
    </div>
  );
};

export default ForecastBox;
