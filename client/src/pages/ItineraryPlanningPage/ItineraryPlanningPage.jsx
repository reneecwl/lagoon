import "./ItineraryPlanningPage.scss";
import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ItineraryPlanningPage({}) {
  const [itinerary, setItinerary] = useState([]);
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
  }, []);

  // const formattedStartDate = format(itinerary.start_date, "yyyy/MM/dd");
  // const formattedEndDate = format(itinerary.end_date, "yyyy/MM/dd");

  return (
    <>
      <h3 className="itineraryplanningpage__title">
        This is the Itinerary Planning Page for itinerary ID {itinerary.id}{" "}
      </h3>
      <p> Trip Name: </p>
      {/* <p>
        {" "}
        Date: {formattedStartDate} -{formattedEndDate}{" "}
      </p> */}
    </>
  );
}
