import "./CreateItineraryForm.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import formImage from "../../assets/images/seville2.jpg";

export default function CreateItineraryForm({ setIsOpen, fetchItinerary, itinerary, itineraryId }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    startDate: null,
    endDate: null,
  });

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const isFormValid = () => {
    if (!formData.location || !startDate || !endDate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    setShouldShake(true);

    if (!isFormValid()) {
      setTimeout(() => setShouldShake(false), 300);
      return;
    }

    const formattedStartDate = format(startDate, "yyyy/MM/dd");
    const formattedEndDate = format(endDate, "yyyy/MM/dd");

    const newItinerary = {
      user_id: 1,
      location: formData.location,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    try {
      const response = await axios.post(`${baseUrl}/itineraries`, newItinerary);
      const newItineraryId = response.data.id;
      console.log(response.data);
      setIsClicked(false);
      setShouldShake(false);
      setFormData({
        location: "",
        startDate: null,
        endDate: null,
      });
      navigate(`/itineraries/${newItineraryId}`);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="form__container">
      <div className="form__image-container">
        <img src={formImage} alt="" className="form__image" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__tab">
          <label htmlFor="location" className="form__label">
            Where do you want to go?
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            placeholder="Enter your destination"
            className={`form__input ${!formData.location && isClicked ? "form__input--invalid" : ""} ${
              !formData.location && shouldShake ? "shake" : ""
            }`}
            onChange={(event) => {
              setFormData({ ...formData, location: event.target.value });
            }}
            onBlur={() => {
              setIsClicked(true);
            }}
          />
        </div>
        <div className="form__tab">
          <label htmlFor="date" className="form__label">
            When are you going?
          </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Select a date range"
            minDate={new Date()}
            monthsShown={2}
            className={`${!startDate && !endDate && isClicked ? "input--invalid" : "form__input "} ${
              !startDate && !endDate && shouldShake ? "shake" : ""
            }`}
          />
        </div>
        <div className="form__buttons">
          <button className="form__cancel" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button type="submit" className="form__submit">
            Start My Journey
          </button>
        </div>
      </form>
    </div>
  );
}
