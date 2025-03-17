import "./ItineraryOutline.scss";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({ itinerary, formattedStartDate, formattedEndDate, daysCount }) {
  return (
    <>
      <div className="outline">
        <div className="outline__header outline__header--image">
          <div className="outline__titles">
            <h3 className="outline__name">
              {itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`}
            </h3>
            <div className="outline__dates">
              {formattedStartDate} to {formattedEndDate}
            </div>
          </div>
          <div className="outline__location">
            <span>{itinerary.location}</span>
          </div>
        </div>
        <Weather itinerary={itinerary} />
        <PublicHoliday itinerary={itinerary} />
      </div>
    </>
  );
}
