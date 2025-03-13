import "./ItineraryOutline.scss";
import FormatDate from "../../utility/FormatDate";
import DaysDifference from "../../utility/DaysDifference";
import axios from "axios";
import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";

export default function ItineraryOutline({ itinerary }) {
  const [weatherData, setWeatherData] = useState(null);
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const formattedStartDate = FormatDate(itinerary.start_date);
  const formattedEndDate = FormatDate(itinerary.end_date);
  const diferenceInDays = DaysDifference(formattedStartDate, formattedEndDate);

  console.log(`start date: ${formattedStartDate}`);
  console.log(differenceInDays);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${baseUrlWeather}${apiKey}&q=${itinerary.location}&days=5`);
        setWeatherData(response.data.forecast);
      } catch (error) {
        console.error("There is an error loading the weather", error);
      }
    };
    fetchWeather();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  console.log(weatherData);

  const extractedData = weatherData.forecastday.map((day) => ({
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
      <p>
        {" "}
        {formattedStartDate} -{formattedEndDate}
      </p>
      <ul>
        {extractedData.map((day, index) => (
          <li key={index}>
            <p>{day.date}</p>
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
