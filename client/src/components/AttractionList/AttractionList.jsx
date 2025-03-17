import "./AttractionList.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AttractionList({ itinerary, itineraryId, daysCount, fetchItinerary }) {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState("");

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
  }, [itinerary]);

  if (attractions.length === 0) {
    return <div>Loading...</div>;
  }

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
    console.log(`${baseUrl}/itineraries/${itineraryId}`);
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

  return (
    <div className="attraction">
      <h4 className="attraction__title">Things To Do</h4>

      {selectedAttraction ? (
        <div className="attraction_form">
          <h4 className="form__title">Add "{selectedAttraction.attraction_name}" to your itinerary</h4>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="day" className="form__day">
                {" "}
                Select Day:{" "}
              </label>
              <select
                className="form__day-select"
                name="day-select"
                id="day-select"
                value={selectedDay}
                onChange={(event) => setSelectedDay(Number(event.target.value))}
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
                {" "}
                Notes:{" "}
              </label>
              <textarea
                className="form__notes-input"
                placeholder="Add your notes..."
                type="text"
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                // onClick={handleAddToDay}
              >
                {" "}
                Add to Day {selectedDay}
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="attraction__list">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="attraction__card">
              <p className="attraction__name">{attraction.attraction_name}</p>
              <p className="attraction__description">{attraction.description}</p>
              <p className="attraction__tags">{attraction.tags}</p>
              <img className="attraction__image" src={attraction.image} alt={attraction.attraction_name}></img>
              <button className="attraction_add" onClick={() => handleAddClick(attraction)}>
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
