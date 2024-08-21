// src/components/WeatherCard.tsx

import { useEffect, useState } from "react";
import { City, WeatherData } from "@/utils/types";
import { getCurrentWeather } from "@/utils/currentWeather";

interface WeatherCardProps {
  city: City | null; // Asegúrate de que `city` sea del tipo `City` o `null`
}

export function WeatherCard({ city }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      if (city && city.coordinates) {
        try {
          const data = await getCurrentWeather(city.coordinates);
          setWeatherData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    }

    fetchWeather();
  }, [city]);

  return (
      <div className="weatherCard">
        {weatherData ? (
         <>
            <div className="upper">
              <div className="menu">
                <div className="punto"></div>
                <div className="punto"></div>
                <div className="punto"></div>
              </div>
            </div>
            <div className="lower">
              <p>{weatherData.name}</p>
              <p>{`${weatherData.main.temp}°C`}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
         </> 
        ) : error ? (
          <>Error: {error}</>
        ) : (
          <>Loading weather information...</>
        )}
      </div>
  );
}
