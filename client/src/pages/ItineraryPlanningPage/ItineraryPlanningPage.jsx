import "./ItineraryPlanningPage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItineraryOutline from "../../components/ItineraryOutline/ItineraryOutline";
import AttractionList from "../../components/AttractionList/AttractionList";

export default function ItineraryPlanningPage({}) {
  const [itinerary, setItinerary] = useState(null);
  const { itineraryId } = useParams();

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`${baseUrl}/itineraries/${itineraryId}`);
        setItinerary(response.data);
      } catch (error) {
        console.error("There is an error loading the itinerary", error);
      }
    };
    fetchItinerary();
  }, [itineraryId]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="planning">
        <h3 className="planning__header">This is the Itinerary Planning Page for itinerary ID {itinerary.id} </h3>
        <main className="planning__main">
          <ItineraryOutline itinerary={itinerary} />
          <div className="planning__content">
            <div className="planning__days">Itinerary by day session</div>
            <AttractionList itinerary={itinerary} />
          </div>
        </main>
      </div>
    </>
  );
}
