import "./AttractionList.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AttractionList({ itinerary }) {
  const [attractions, setAttractions] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/attractions/?location=${itinerary.location}`);
        setAttractions(response.data);
      } catch (error) {
        console.error("There is an error loading the Things To Do", error);
      }
    };
    fetchAttractions();
  }, []);

  if (!attractions) {
    return <div>Loading...</div>;
  }
  // console.log(attractions);

  return (
    <>
      <h4 className="attractions">This is the attraction List</h4>
      {attractions.map((attraction) => (
        <p key={attraction.id} className="attracion__name">
          {attraction.attraction_name}
        </p>
      ))}
    </>
  );
}
