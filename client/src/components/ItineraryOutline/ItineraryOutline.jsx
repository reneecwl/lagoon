import "./ItineraryOutline.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({ itinerary, formattedStartDate, formattedEndDate, diferenceInDays }) {
  return (
    <>
      <div className="outline">
        <p> {itinerary.itinerary_name || `${diferenceInDays} Days trip in ${itinerary.location}`}</p>
        <h4>
          {" "}
          {formattedStartDate} to {formattedEndDate}
        </h4>
        <Weather itinerary={itinerary} />
        <PublicHoliday itinerary={itinerary} />
      </div>
    </>
  );
}
