import React, { useState } from 'react';
import ForecastBox from './ForecastBox';
import './App.css';
import type Result from './response';
import type ForecastResult from './ForecastResult';
import type SevenDayForecast from './SevenDayForecast';
import axios from 'axios';


const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [showForecast, setShowForecast] = useState(false);
  const [sdf, setSdf] = useState<SevenDayForecast | null>(null);


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
                setSdf(response.data as SevenDayForecast);

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
        <button className="button2">Go</button>
      </form>

      {showForecast && sdf && (
        <div className="weather-forecast">
          <ForecastBox day={sdf.properties.periods[0].name} temperature={sdf.properties.periods[0].temperature} precipitation={sdf.properties.periods[0].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[0].relativeHumidity.value} windSpeed={sdf.properties.periods[0].windSpeed} />
          <ForecastBox day={sdf.properties.periods[2].name} temperature={sdf.properties.periods[2].temperature} precipitation={sdf.properties.periods[2].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[2].relativeHumidity.value} windSpeed={sdf.properties.periods[2].windSpeed} />
          <ForecastBox day={sdf.properties.periods[4].name} temperature={sdf.properties.periods[4].temperature} precipitation={sdf.properties.periods[4].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[4].relativeHumidity.value} windSpeed={sdf.properties.periods[4].windSpeed} />
          <ForecastBox day={sdf.properties.periods[6].name} temperature={sdf.properties.periods[6].temperature} precipitation={sdf.properties.periods[6].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[6].relativeHumidity.value} windSpeed={sdf.properties.periods[6].windSpeed} />
          <ForecastBox day={sdf.properties.periods[8].name} temperature={sdf.properties.periods[8].temperature} precipitation={sdf.properties.periods[8].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[8].relativeHumidity.value} windSpeed={sdf.properties.periods[8].windSpeed} />
          <ForecastBox day={sdf.properties.periods[10].name} temperature={sdf.properties.periods[10].temperature} precipitation={sdf.properties.periods[10].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[10].relativeHumidity.value} windSpeed={sdf.properties.periods[10].windSpeed} />
          <ForecastBox day={sdf.properties.periods[12].name} temperature={sdf.properties.periods[12].temperature} precipitation={sdf.properties.periods[12].probabilityOfPrecipitation.value} humidity={sdf.properties.periods[12].relativeHumidity.value} windSpeed={sdf.properties.periods[12].windSpeed} />
        </div>
      )}
    </div>
  );
};

export default App;
