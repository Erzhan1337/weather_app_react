import "./App.css";
import CurrentData from "./components/Current Data/CurrentData.jsx";
import { useState } from "react";
import SearchCity from "./components/Search/SearchCity.jsx";
function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="container">
      <SearchCity setWeather={setWeather} />
      {weather !== null && <CurrentData weather={weather} />}
    </div>
  );
}

export default App;
