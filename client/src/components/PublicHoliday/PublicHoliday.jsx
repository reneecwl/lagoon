import "./PublicHoliday.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function PublicHoliday({ itinerary }) {
  const [holidays, setHolidays] = useState([]);
  const baseUrlPH = import.meta.env.VITE_NAGER_DATE_API_URL;

  useEffect(() => {
    const fetchPublicHoliday = async () => {
      try {
        const response = await axios.get(`${baseUrlPH}/GB`);
        setHolidays(response.data);
      } catch (error) {
        console.error("There is an error loading public holiday", error);
      }
    };
    fetchPublicHoliday();
  }, []);

  if (holidays.length === 0) {
    return <div>Loading public holidays...</div>;
  }

  const startDateObj = new Date(itinerary.start_date);
  const endDateObj = new Date(itinerary.end_date);

  const filteredHoliday = holidays.filter((holiday) => {
    const holidayDateObj = new Date(holiday.date + "T00:00:00");
    return holidayDateObj >= startDateObj && holidayDateObj <= endDateObj;
  });

  const formatHolidayDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="public-holiday">
      {filteredHoliday.length > 0 ? (
        filteredHoliday.map((holiday) => (
          <div key={holiday.date} className="public-holiday__item">
            <div className="public-holiday__name">{holiday.name}</div>
            <div className="public-holiday__date">{formatHolidayDate(holiday.date)}</div>
          </div>
        ))
      ) : (
        <p className="public-holiday__empty">No public holidays during your time of travel.</p>
      )}
    </div>
  );
}
