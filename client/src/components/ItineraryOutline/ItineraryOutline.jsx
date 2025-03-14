import "./ItineraryOutline.scss";
import FormatDate from "../../utility/FormatDate";
import DaysDifference from "../../utility/DaysDifference";
import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({ itinerary }) {
  const formattedStartDate = FormatDate(itinerary.start_date);
  const formattedEndDate = FormatDate(itinerary.end_date);
  const diferenceInDays = DaysDifference(formattedStartDate, formattedEndDate);

  return (
    <>
      <p> {itinerary.itinerary_name || `${diferenceInDays} Days trip in ${itinerary.location}`}</p>
      <h4>
        {" "}
        {formattedStartDate} to {formattedEndDate}
      </h4>
      <Weather itinerary={itinerary} />
      <PublicHoliday itinerary={itinerary} />
    </>
  );
}
