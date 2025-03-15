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

  return (
    <>
      <div className="attraction">
        <h4 className="attraction__title">Things To Do</h4>
        <div className="attraction__list">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="attraction__card">
              <p className="attraction__name">{attraction.attraction_name}</p>
              <p className="attraction__description">{attraction.description}</p>
              <p className="attraction__tags">{attraction.tags}</p>
              <img className="attraction__image" src={attraction.image} alt={attraction.attraction_name}></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
