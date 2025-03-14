import "./ItineraryPlanningPage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItineraryOutline from "../../components/ItineraryOutline/ItineraryOutline";

export default function ItineraryPlanningPage({}) {
  const [itinerary, setItinerary] = useState(null);
  const { itineraryId } = useParams();

  const baseUrl = import.meta.env.VITE_API_URL;
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

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
      <h3 className="itineraryplanningpage__title">
        This is the Itinerary Planning Page for itinerary ID {itinerary.id}{" "}
      </h3>
      <main>
        <ItineraryOutline itinerary={itinerary} />
      </main>
    </>
  );
}
