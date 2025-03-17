import "./Weather.scss";
import { format } from "date-fns";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Weather({ itinerary }) {
  const [weatherData, setWeatherData] = useState(null);
  const [filteredWeatherData, setFilteredWeatherData] = useState([]);
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${baseUrlWeather}${apiKey}&q=${itinerary.location}&days=14`);
        setWeatherData(response.data.forecast);

        const startDateObj = new Date(itinerary.start_date);
        const endDateObj = new Date(itinerary.end_date);

        const filteredData = response.data.forecast.forecastday.filter((day) => {
          const dayDateObj = new Date(day.date + "T00:00:00");

          return dayDateObj >= startDateObj && dayDateObj <= endDateObj;
        });

        setFilteredWeatherData(filteredData);
      } catch (error) {
        console.error("There is an error loading the weather", error);
      }
    };
    fetchWeather();
  }, [itinerary.location, itinerary.start_date, itinerary.end_date]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  console.log(filteredWeatherData);

  const extractedData = filteredWeatherData.map((day) => ({
    date: format(new Date(day.date + "T00:00:00"), "dd MMM"),
    mintemp_c: Math.round(day.day.mintemp_c),
    maxtemp_c: Math.round(day.day.maxtemp_c),
    daily_chance_of_rain: day.day.daily_chance_of_rain,
    icon: day.day.condition.icon,
  }));

  console.log(extractedData);

  return (
    <div className="weather">
      <h3 className="weather__title">Weather</h3>
      <div className="weather__container">
        {extractedData.map((day, index) => (
          <div key={index} className="card">
            <p className="card__date">{day.date}</p>
            <img className="card__image" src={`https:${day.icon}`} alt="Weather Icon" />
            <p className="card__temp">
              {day.mintemp_c} - {day.maxtemp_c} °C
            </p>
            <p className="card__rain"> Chance of Rain: {day.daily_chance_of_rain}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
