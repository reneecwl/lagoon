import "./ItineraryPlanningPage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormatDate from "../../utility/FormatDate";
import DaysCount from "../../utility/DaysCount";
import ItineraryOutline from "../../components/ItineraryOutline/ItineraryOutline";
import AttractionList from "../../components/AttractionList/AttractionList";
import ItineraryPlanner from "../../components/ItineraryPlanner/ItineraryPlanner";

export default function ItineraryPlanningPage({}) {
  const [itinerary, setItinerary] = useState(null);
  const [dailyAttractions, setDailyAttractions] = useState([]);
  const { itineraryId } = useParams();
  const [dates, setDates] = useState({
    formattedStartDate: "",
    formattedEndDate: "",
    daysCount: 0,
  });

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchItinerary = async () => {
    try {
      const response = await axios.get(`${baseUrl}/itineraries/${itineraryId}`);
      setItinerary(response.data);
    } catch (error) {
      console.error("There is an error loading the itinerary", error);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [itineraryId]);

  // console.log(itinerary.attractions);

  useEffect(() => {
    if (itinerary) {
      const formattedStartDate = FormatDate(itinerary.start_date);
      const formattedEndDate = FormatDate(itinerary.end_date);
      const daysCount = DaysCount(formattedStartDate, formattedEndDate);

      setDates({
        formattedStartDate,
        formattedEndDate,
        daysCount,
      });

      const initialDailyAttractions = Array.from({ length: daysCount }, (_, i) => ({
        day: i + 1,
        attractions: [],
      }));

      if (itinerary.attractions && itinerary.attractions.length > 0) {
        itinerary.attractions.forEach((attraction) => {
          const dayArrayIndex = attraction.day - 1;

          if (dayArrayIndex < daysCount) {
            initialDailyAttractions[dayArrayIndex].attractions.push(attraction);
          }
        });
      }
      setDailyAttractions(initialDailyAttractions);
    }
  }, [itinerary]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="planning">
        <main className="planning__main">
          <ItineraryOutline
            itinerary={itinerary}
            formattedStartDate={dates.formattedStartDate}
            formattedEndDate={dates.formattedEndDate}
            daysCount={dates.daysCount}
            fetchItinerary={fetchItinerary}
          />
          <div className="planning__content">
            <ItineraryPlanner dailyAttractions={dailyAttractions} />
            <AttractionList
              itinerary={itinerary}
              itineraryId={itineraryId}
              daysCount={dates.daysCount}
              fetchItinerary={fetchItinerary}
            />
          </div>
        </main>
      </div>
    </>
  );
}
