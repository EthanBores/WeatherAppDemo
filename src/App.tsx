import React, { useState } from 'react';
import ForecastBox from './ForecastBox';
import './App.css';
import type Result from './response';
import type ForecastResult from './ForecastResult';
import type SevenDayForecast from './SevenDayForecast';
import axios from 'axios';

declare global{var sdf:SevenDayForecast;}

var days:string[];
var temps:number[];
var precips:number[];
var humids:number[];
var winds:string[];

const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [showForecast, setShowForecast] = useState(false);

  // Update location as user enters text
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  // Function called when user hits 'Go' button after entering a location
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowForecast(location.trim() !== '');

    // Encode the entered address to a format where it can be placed into our URL for API call
    const formattedAddr = location.replace('/ /g', '+');
    const encodedAddr = encodeURIComponent(formattedAddr);
    const geocodedURL = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodedAddr}&benchmark=Public_AR_Census2020&format=json`;

    // Call geocoding API for coordinates
    const res = axios
      .get(geocodedURL)
      .then((response) => {
        const jsonData = response.data as Result;

        // Get coordinates, and set up the next URL to call our weather API for general forecast/info
        let lon = jsonData.result.addressMatches.at(0)?.coordinates.x;
        let lat = jsonData.result.addressMatches.at(0)?.coordinates.y;

        let forecastURL = `https://api.weather.gov/points/${lat},${lon}`;

        // Call weather API for general forecast/info
        const forecast = axios
          .get(forecastURL)
          .then((response) => {
            const forecastJsonData = response.data as ForecastResult;

            // Pull the URL for the 7 day forecast which is contained within the JSON returned from the
            // first call to the weather API
            let sevendayURL = forecastJsonData.properties.forecast;

            // Call the API again for the specific 7 day forecast
            const sevenDay = axios
              .get(sevendayURL)
              .then((response) => {
                // Store the 7 day forecast to a global variable 'sdf'
                global.sdf = response.data as SevenDayForecast;

                for(let i = 0; i < 14; i+2) {
                  days[i%7] = sdf.properties.periods[i].name;
                  temps[i%7] = sdf.properties.periods[i].temperature;
                  precips[i%7] = sdf.properties.periods[i].probabilityOfPrecipitation.value;
                  humids[i%7] = sdf.properties.periods[i].relativeHumidity.value;
                  winds[i%7] = sdf.properties.periods[i].windSpeed;
                }

// Making sure we take care of errors from all those API calls...
// Indentation removed for greater code readability
})
.catch((error) => {console.error('Error fetching 7 day forecast:', error);})})
.catch((error) => {console.error('Error fetching forecast data:', error);})})
.catch((error) => {console.error('Error fetching geocoded data:', error);});};

// Begin webpage layout
  return (
    <div className="container">
      <div className="blur-background"></div>
      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={handleInputChange}
        />
        <button className="button2" onSubmit={handleSubmit}>Go</button>
      </form>

      {showForecast && (
        <div className="weather-forecast">
          <ForecastBox day={days[0]} temperature={sdf.properties.periods[1].temperature} precipitation={sdf.properties.periods[1].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[1].relativeHumidity.value} windSpeed={sdf.properties.periods[1].windSpeed} />
          <ForecastBox day={sdf.properties.periods[3].name} temperature={sdf.properties.periods[3].temperature} precipitation={sdf.properties.periods[3].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[3].relativeHumidity.value} windSpeed={sdf.properties.periods[3].windSpeed} />
          <ForecastBox day={sdf.properties.periods[5].name} temperature={sdf.properties.periods[5].temperature} precipitation={sdf.properties.periods[5].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[5].relativeHumidity.value} windSpeed={sdf.properties.periods[5].windSpeed} />
          <ForecastBox day={sdf.properties.periods[7].name} temperature={sdf.properties.periods[7].temperature} precipitation={sdf.properties.periods[7].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[7].relativeHumidity.value} windSpeed={sdf.properties.periods[7].windSpeed} />
          <ForecastBox day={sdf.properties.periods[9].name} temperature={sdf.properties.periods[9].temperature} precipitation={sdf.properties.periods[9].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[9].relativeHumidity.value} windSpeed={sdf.properties.periods[9].windSpeed} />
          <ForecastBox day={sdf.properties.periods[11].name} temperature={sdf.properties.periods[11].temperature} precipitation={sdf.properties.periods[11].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[11].relativeHumidity.value} windSpeed={sdf.properties.periods[11].windSpeed} />
          <ForecastBox day={sdf.properties.periods[13].name} temperature={sdf.properties.periods[13].temperature} precipitation={sdf.properties.periods[13].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[13].relativeHumidity.value} windSpeed={sdf.properties.periods[13].windSpeed} />
        </div>
      )}
    </div>
  );
};

export default App;
