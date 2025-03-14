import "./ItineraryOutline.scss";
import FormatDate from "../../utility/FormatDate";
import DaysDifference from "../../utility/DaysDifference";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ItineraryOutline({ itinerary }) {
  const [weatherData, setWeatherData] = useState(null);
  const [filteredWeatherData, setFilteredWeatherData] = useState([]);
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const formattedStartDate = FormatDate(itinerary.start_date);
  const formattedEndDate = FormatDate(itinerary.end_date);
  const diferenceInDays = DaysDifference(formattedStartDate, formattedEndDate);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${baseUrlWeather}${apiKey}&q=${itinerary.location}&days=14`);
        setWeatherData(response.data.forecast);

        const startDateObj = new Date(itinerary.start_date);
        const endDateObj = new Date(itinerary.end_date);

        // startDateObj.setHours(0, 0, 0, 0);
        // endDateObj.setHours(23, 59, 59, 999);

        console.log(response.data.forecast.forecastday);
        const filteredData = response.data.forecast.forecastday.filter((day) => {
          const dayDateObj = new Date(day.date + "T00:00:00");
          console.log("Day Date:", day.date, dayDateObj);

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

  const extractedData = filteredWeatherData.map((day) => ({
    date: day.date,
    mintemp_c: Math.round(day.day.mintemp_c),
    maxtemp_c: Math.round(day.day.maxtemp_c),
    daily_chance_of_rain: day.day.daily_chance_of_rain,
    icon: day.day.condition.icon,
  }));

  return (
    <>
      <h5> This is the itinerary outline component</h5>

      <p> {itinerary.itinerary_name || `${diferenceInDays} Days trip in ${itinerary.location}`}</p>
      <h4>
        {" "}
        {formattedStartDate} to {formattedEndDate}
      </h4>
      <ul>
        {extractedData.map((day, index) => (
          <li key={index}>
            <h4>{day.date}</h4>
            <p>
              {day.mintemp_c} - {day.maxtemp_c} °C
            </p>
            <p>Chance of Rain: {day.daily_chance_of_rain}%</p>
            <img src={`https:${day.icon}`} alt="Weather Icon" />
          </li>
        ))}
      </ul>
    </>
  );
}
