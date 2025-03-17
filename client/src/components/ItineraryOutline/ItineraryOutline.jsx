import "./ItineraryOutline.scss";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({ itinerary, formattedStartDate, formattedEndDate, daysCount }) {
  console.log(itinerary);
  const [isEditing, setIsEditing] = useState(false);
  const [tripName, setTripName] = useState(
    itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setTripName = event.target.value;
  };

  // const handleBlur= async () =>

  return (
    <>
      <div className="outline">
        <div className="outline__header outline__header--image">
          <div className="outline__titles">
            <div className="outline__name-container">
              {isEditing ? (
                <input
                  type="text"
                  calssName="outline_name-input"
                  value={tripName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                />
              ) : (
                <h3 className="outline__name">
                  {itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`}
                </h3>
              )}

              <svg className="outline__edit" viewBox="0 -960 960 960" onClick={handleEditClick}>
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </div>
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
