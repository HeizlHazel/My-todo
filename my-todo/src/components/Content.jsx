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
  // ------------------------------------------------------------------
  // useEffect: 컴포넌트 마운트 시(처음 렌더링될 때) 날씨 API를 호출합니다.
  // 중요 포인트 — API 호출 과정 상세 설명:
  // 1) 엔드포인트: https://api.openweathermap.org/data/2.5/weather
  // - 이 엔드포인트는 현재(실시간) 날씨를 반환합니다.
  // 2) 쿼리 파라미터:
  // - q: 도시 이름 (예: Seoul)
  // - appid: API 키 (OpenWeather에서 발급받은 키)
  // - units: 단위 (metric -> 섭씨, imperial -> 화씨, 기본은 켈빈)
  // - lang: 응답 메시지/설명에 사용할 언어 (kr 또는 ko는 한국어로 반환)
  // 3) fetch 사용 시 주의사항:
  // - 네트워크 에러와 HTTP 에러를 구분해야 합니다. fetch는 네트워크 에러만 throw 하므로
  // HTTP 상태코드(예: 401, 404, 500 등)를 직접 확인(res.ok)하는 로직가 필요합니다.
  // - 응답이 JSON이 아닐 경우 예외가 발생할 수 있으므로 try/catch로 감싸 안전하게 처리합니다.
  // - API 키가 유효하지 않거나 누락되면 401 Unauthorized가 반환됩니다. 개발 중에는 콘솔에
  // 에러를 찍어 원인을 확인하세요.
  // - CORS: 브라우저에서 직접 외부 API를 호출할 때 CORS 설정(서버 측)이 필요합니다.
  // OpenWeather는 일반적으로 브라우저 호출을 허용하지만, 만약 CORS 오류가 발생하면
  // 프록시 서버를 두고 서버 사이드에서 호출하는 방법을 고려해야 합니다.
  // - 호출 빈도: 무료 API 키는 호출 제한(예: 분당/일별 제한)이 있으니 과도한 폴링을 피하세요.
  // - 보안: API 키는 클라이언트에 노출되므로 민감한 권한이 있는 경우 서버에서 프록시 처리하세요.
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchWeather = async () => {
      // API 키가 없으면 바로 종료(개발 중 착오 방지)
      if (!API_KEY) {
        console.error(
          "OpenWeather API key is missing. set VITE_OPENWEATHER_API_KEY in .env"
        );
        return;
      }

      try {
        // OpenWeather API 호출(도시, API키, 섭씨단위, 한국어 설정)
        // fetch로 GET 요청
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`
        );

        // HTTP 상태 코드 체크
        if (!res.ok) {
          // 예: 401 (Unauthorized - API 키 문제), 404 (도시명 오타), 429(Too Many Requests)
          // 필요하면 상태 코드별로 분기하여 사용자에게 더 친절한 메시지를 보여줄 수 있습니다.
          console.error(
            `Weather API returned HTTP ${res.status}: ${res.statusText}`
          );
          // 에러 응답을 파싱해서 상세 메시지 확인 가능
          const errBody = await res.text();
          console.debug("Error body:", errBody);
          return;
        }

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
  // 로딩 스피너 or 에러 메시지 표시
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
