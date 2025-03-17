import "./ItineraryOutline.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({ itinerary, formattedStartDate, formattedEndDate, daysCount }) {
  return (
    <>
      <div className="outline">
        <h3> Trip: {itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`}</h3>
        <h3>
          {" "}
          {formattedStartDate} to {formattedEndDate}
        </h3>
        <Weather itinerary={itinerary} />
        <PublicHoliday itinerary={itinerary} />
      </div>
    </>
  );
}
