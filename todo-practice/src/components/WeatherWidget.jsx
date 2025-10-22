import React, { useEffect, useState } from "react";
import "./WeatherWidget.css"; // ✅ CSS 파일 import

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const CITY = "Seoul";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("날씨 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchWeather();
  }, [API_KEY]);

  if (!weather) return null;

  return (
    <div className="weather-widget">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather-icon"
        className="weather-icon"
      />
      <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
    </div>
  );
};

export default WeatherWidget;
