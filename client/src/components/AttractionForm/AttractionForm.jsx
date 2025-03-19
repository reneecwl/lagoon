import { useState } from "react";
import axios from "axios";
import "./AttractionForm.scss";

export default function AttractionForm({ attraction, itineraryId, fetchItinerary, setSelectedAttraction, daysCount }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;
  const dayOptions = Array.from({ length: daysCount }, (_, i) => i + 1);

  const submitHandler = async (event) => {
    event.preventDefault();

    const newItineraryAttraction = {
      attraction_id: attraction.id,
      user_notes: notes,
      day: selectedDay,
    };
    try {
      await axios.post(`${baseUrl}/itineraries/${itineraryId}`, newItineraryAttraction);
      fetchItinerary();
      setSelectedAttraction(null);
    } catch (error) {
      console.error("Error adding the attraction", error);
    }
  };

  const handleCancel = () => {
    setSelectedAttraction(null);
  };

  return (
    <div className="attraction-form">
      <h4 className="attraction-form__title">
        Add <span className="attraction-form__title--attraction-name">{attraction.attraction_name}</span> to itinerary
      </h4>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="day" className="attraction-form__day">
            Day:
          </label>
          <select
            className="attraction-form__day-select"
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
          <label htmlFor="notes" className="attraction-form__notes">
            Notes:
          </label>
          <textarea
            className="attraction-form__notes-input"
            placeholder="Add your notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="attraction-form__attraction-button-container">
          <button type="submit" className="attraction-form__addToDay">
            Add to Day
            {/* {selectedDay} */}
          </button>
          <button type="button" className="attraction-form__attraction-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
