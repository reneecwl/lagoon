import "./AddAttractionForm.scss";

export default function AddAttractionForm({ attraction, submitHandler, setSelectedDay, selectedDay }) {
  return (
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
        <div className="form__attraction-button-container">
          <button type="submit" className="form__addToDay">
            Add to Day {selectedDay}
          </button>
          <button type="button" className="form__attraction-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
