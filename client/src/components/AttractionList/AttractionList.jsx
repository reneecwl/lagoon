import "./AttractionList.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AttractionList({ itinerary, itineraryId, daysCount, fetchItinerary }) {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL;
  const baseUrlImg = import.meta.env.VITE_API_URL_IMG;

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
  }, [itinerary]);

  const handleAddClick = (attraction) => {
    setSelectedAttraction(attraction);
    setSelectedDay(1);
    setNotes("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newItineraryAttraction = {
      attraction_id: selectedAttraction.id,
      user_notes: notes,
      day: selectedDay,
    };
    try {
      await axios.post(`${baseUrl}/itineraries/${itineraryId}`, newItineraryAttraction);
      fetchItinerary();
      setSelectedAttraction(null);
      setNotes("");
    } catch (error) {
      console.error("There is error adding the attraction", error);
    }
  };

  const handleCancel = () => {
    setSelectedAttraction(null);
    setNotes("");
  };

  const dayOptions = Array.from({ length: daysCount }, (_, i) => i + 1);

  const AddAttractionForm = ({ attraction }) => (
    <div className="form">
      <h4 className="form__title">Add "{attraction.attraction_name}" to your itinerary</h4>
      <form onSubmit={submitHandler} key={attraction.id}>
        <div>
          <label htmlFor="day" className="form__day">
            Select Day:
          </label>
          <select
            className="form__day-select"
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                Day {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="form__notes">
            Notes:
          </label>
          <textarea
            className="form__notes-input"
            placeholder="Add your notes..."
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="form__addToDay">
            Add to Day {selectedDay}
          </button>
          <button type="button" className="form__cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  if (attractions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="attraction">
      <h4 className="attraction__title">Things To Do</h4>
      {selectedAttraction && <AddAttractionForm attraction={selectedAttraction} />}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
