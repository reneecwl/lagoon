import "./CreateItinerary.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateItinerary({ setIsOpen, fetchItinerary, itinerary, itineraryId }) {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    startDate: null,
    endDate: null,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const addUser = async () => {
    try {
      const response = await axios.post(`${baseUrl}/users`, { user_name: formData.username });
      console.log("User created", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error adding user", error);
      return null;
    }
  };

  const isFormValid = () => {
    if (!formData.username || !formData.location || !startDate || !endDate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsClicked(true);

    if (!isFormValid()) {
      alert("Please fill in all fields");
      return;
    }

    const formattedStartDate = format(startDate, "yyyy/MM/dd");
    const formattedEndDate = format(endDate, "yyyy/MM/dd");

    const userId = await addUser();
    if (!userId) {
      alert("Failed to create user. Please try again.");
      return;
    }

    if (formData.username) {
      const newItinerary = {
        user_id: userId,
        location: formData.location,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };

      try {
        const response = await axios.post(`${baseUrl}/itineraries`, newItinerary);
        const newItineraryId = response.data[0].id;
        console.log(response.data);
        setIsClicked(false);
        setFormData({
          username: "",
          location: "",
          startDate: null,
          endDate: null,
        });
        navigate(`/itineraries/${newItineraryId}`);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  return (
    <>
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="form__label">
            What should we call you, explorer?
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            className={`form__input-name ${!formData.username && isClicked ? "form__input--invalid" : ""}`}
            onChange={(event) => {
              setFormData({ ...formData, username: event.target.value });
            }}
            onBlur={() => {
              setIsClicked(true);
            }}
          ></input>

          <label htmlFor="location" className="form__label">
            Where to next?
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            className={`form__input-location ${!formData.location && isClicked ? "form__input--invalid" : ""}`}
            onChange={(event) => {
              setFormData({ ...formData, location: event.target.value });
            }}
            onBlur={() => {
              setIsClicked(true);
            }}
          ></input>

          <label htmlFor="date">When are you going? </label>
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
          />
          <button className="form__cancel" onClick={() => setIsOpen(false)}>
            {" "}
            Cancel{" "}
          </button>

          <button type="submit" className="form__submit">
            Start My Journey!
          </button>
        </form>
      </div>
    </>
  );
}
