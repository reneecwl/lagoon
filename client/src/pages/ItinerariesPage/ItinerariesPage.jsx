import "./ItinerariesPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ItinerariesPage() {
  // const [itineraries, setItineraries] = useState([]);

  // const baseUrl = import.meta.env.VITE_API_URL;

  // useEffect(() => {
  //   const fetchItineraryList = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/itineraries/${itineraryId}`);
  //       setItinerary(response.data);
  //     } catch (error) {
  //       console.error("There is an error loading the itinerary", error);
  //     }
  //   };
  //   fetchItinerary();
  // }, []);
  return <h3 className="itinerariespage__title">This is the Itineraries Page</h3>;
}
