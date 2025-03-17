import "./PublicHoliday.scss";
import FormatDate from "../../utility/FormatDate";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PublicHoliday({ itinerary }) {
  const [holidays, setHolidays] = useState([]);
  const baseUrlPH = import.meta.env.VITE_NAGER_DATE_API_URL;

  useEffect(() => {
    const fetchPublicHoliday = async () => {
      try {
        const response = await axios.get(`${baseUrlPH}/GB`);
        setHolidays(response.data);
        // console.log(response.data);
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
  const holidayMatched = filteredHoliday;
  return (
    <div className="public-holiday">
      <h3 className="public-holiday__title"> Public Holiday:</h3>
      {filteredHoliday.length > 0 ? (
        filteredHoliday.map((holiday) => (
          <p key={holiday.date} className="public-holiday__date">
            {holiday.name} - {holiday.date}
          </p>
        ))
      ) : (
        <p className="public-holiday__empty">No public holidays during your time of travel.</p>
      )}
    </div>
  );
}
