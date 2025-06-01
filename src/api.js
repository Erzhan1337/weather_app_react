const API_KEY = '1d34e6921aa2450796e103557250106';

export const fetchWeatherAPI = async (city) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=2&aqi=no&alerts=no`);
    const data = await response.json();
    return data;
}