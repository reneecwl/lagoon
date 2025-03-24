import "./AttractionList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import AttractionForm from "../AttractionForm/AttractionForm.jsx";

export default function AttractionList({ itinerary, itineraryId, daysCount, fetchItinerary }) {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL;
  const baseUrlImg = import.meta.env.VITE_API_URL_IMG;

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/attractions/?location=${itinerary.location}`);
        setAttractions(response.data);
      } catch (error) {
        console.error("Error loading Things To Do", error);
      }
    };
    fetchAttractions();
  }, [itinerary]);

  const handleAddClick = (attraction) => {
    setSelectedAttraction(attraction);
  };

  if (attractions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="attraction">
      <h4 className="attraction__title">Things To Do</h4>
      <div className="attraction__list-container">
        <div className="attraction__list">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="attraction__card">
              <div className="attraction__image-container">
                <img
                  className="attraction__image"
                  src={`${baseUrlImg}/images/${attraction.image}`}
                  alt={attraction.attraction_name}
                />
              </div>
              <div className="attraction__content">
                <p className="attraction__name">{attraction.attraction_name}</p>
                <p className="attraction__description">{attraction.description}</p>
                <p className="attraction__tags">
                  {attraction.tags.split(",").map((tag, idx) => (
                    <span key={idx} className="attraction__tag">
                      {tag.trim()}
                    </span>
                  ))}
                </p>
                <button className="attraction__add" onClick={() => handleAddClick(attraction)}>
                  Add to Itinerary
                </button>
                {selectedAttraction?.id === attraction.id && (
                  <AttractionForm
                    attraction={attraction}
                    itineraryId={itineraryId}
                    fetchItinerary={fetchItinerary}
                    setSelectedAttraction={setSelectedAttraction}
                    daysCount={daysCount}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
