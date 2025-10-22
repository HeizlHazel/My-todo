import "./App.css";
import Calendar from "./components/Calendar";
import Content from "./components/Content";
import Header from "./components/Header";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  return (
    <div>
      <Header />
      <Calendar />
      <Content />
      <div className="weather-wrapper">
        <WeatherWidget />
      </div>
    </div>
  );
}

export default App;
