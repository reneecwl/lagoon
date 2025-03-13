import "./ItineraryOutline.scss";
import FormatDate from "../../utility/FormatDate";
import DaysDifference from "../../utility/DaysDifference";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ItineraryOutline({ itinerary }) {
  const [weather, setWeather] = useState(null);
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const formattedStartDate = FormatDate(itinerary.start_date);
  const formattedEndDate = FormatDate(itinerary.end_date);

  // const date1 = new Date(formattedStartDate);
  // const date2 = new Date(formattedEndDate);
  // const differenceInTime = date2.getTime() - date1.getTime();
  const diferenceInDays = DaysDifference(formattedStartDate, formattedEndDate);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${baseUrlWeather}${apiKey}&q=${itinerary.location}&days=1}`);
        setWeather(response.data);
      } catch (error) {
        console.error("There is an error loading the weather", error);
      }
    };
    fetchWeather();
  });
  if (!weather) {
    return <div>Loading...</div>;
  }
  console.log(weather);

  return (
    <>
      <h5> This is the itinerary outline component</h5>

      <p> {itinerary.itinerary_name || `${diferenceInDays} Days trip in ${itinerary.location}`}</p>
      <p>
        {formattedStartDate} -{formattedEndDate}{" "}
      </p>
    </>
  );
}
