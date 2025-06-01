import { TfiSearch } from "react-icons/tfi";
import "./Search.css";
import geoIcon from "../../assets/geoloc.svg";
import { useState } from "react";
import { fetchWeatherAPI } from "../../api.js";

function SearchCity({ setWeather }) {
  const [city, setCity] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    const data = await fetchWeatherAPI(city);
    setWeather(data);
    setCity("");
  };

  return (
    <div className="search_part">
      <div className="search">
        <TfiSearch
          style={{ width: "20px", height: "20px" }}
          className="search__icon"
          onClick={handleSearch}
        />
        <input
          value={city}
          placeholder="Your city"
          className="search__input"
          onChange={handleInputChange}
        />
      </div>
      <div className="location">
        <img
          src={geoIcon}
          alt="My geolocation"
          style={{ width: "30px", height: "30px", color: "white" }}
        />
      </div>
    </div>
  );
}

export default SearchCity;
