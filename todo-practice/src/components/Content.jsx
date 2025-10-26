import React, { useEffect, useState } from "react";
import "./Content.css";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [weather, setWeather] = useState(null); // 날씨 데이터 저장할 state
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const CITY = "Seoul";
  const nav = useNavigate();

  const getWeatherMessage = (main, temp) => {
    if (main === "Rain") return "비 오는 날엔 따뜻한 차 한잔 어때요?";
    if (main === "Clear" && temp > 25)
      return "맑고 더운 하루, 시원한 음료 어때요?";
    if (main === "Clear") return "맑은 하늘이 기분을 좋게 해요!";
    if (main === "Clouds") return "구름 낀 날씨, 차분한 하루 되세요.";
    if (main === "Snow") return "눈 오는 날이에요. 따뜻하게 입으세요!";
    if (temp < 5) return "오늘은 쌀쌀해요. 따뜻하게 챙겨 입기!";
    return "좋은 하루 보내세요!";
  };

  // 컴포넌트가 처음 랜더링될 때 날씨 API 호출
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // OpenWeather API 호출(도시, API키, 섭씨단위, 한국어 설정)
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`
        );
        // 응답 데이터를 JSON 형태로 변환
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("날씨 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchWeather();
  }, [API_KEY]); // API_KEY가 바뀌면 다시 실행

  // 아직 데이터가 없을 때는 아무것도 랜더링하지 않음
  if (!weather) return null;

  return (
    <div className="Content">
      <div className="Weather">
        {/* 날씨 아이콘 */}
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather-icon"
          className="weather-icon"
        />
        {/* 현재 온도 */}
        <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
        {/* 날씨에 따른 문구 표시 */}
        <div className="weather-message">
          {getWeatherMessage(weather.weather[0].main, weather.main.temp)}
        </div>
      </div>
      <button onClick={() => nav(`/report`)}>나의 기록</button>
    </div>
  );
};

export default Content;
