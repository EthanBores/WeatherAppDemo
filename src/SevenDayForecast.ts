interface SevenDayForecast {
    "@context": [
      "https://geojson.org/geojson-ld/geojson-context.jsonld",
      {
        "@version": string;
        wx: string;
        geo: string;
        unit: string;
        "@vocab": string;
      }
    ];
    type: string;
    geometry: {
      type: string;
      coordinates: [[number, number][]];
    };
    properties: {
      updated: string;
      units: string;
      forecastGenerator: string;
      generatedAt: string;
      updateTime: string;
      validTimes: string;
      elevation: {
        unitCode: string;
        value: number;
      };
      periods: {
        number: number;
        name: string;
        startTime: string;
        endTime: string;
        isDaytime: boolean;
        temperature: number;
        temperatureUnit: string;
        temperatureTrend: null;
        probabilityOfPrecipitation: {
          unitCode: string;
          value: number;
        };
        dewpoint: {
          unitCode: string;
          value: number;
        };
        relativeHumidity: {
          unitCode: string;
          value: number;
        };
        windSpeed: string;
        windDirection: string;
        icon: string;
        shortForecast: string;
        detailedForecast: string;
      }[];
    };
  }
  
export default SevenDayForecast;