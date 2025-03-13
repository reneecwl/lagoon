import "./CreateItinerary.scss";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateItinerary({ setIsOpen }) {
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
      console.log(newItinerary);
      try {
        await axios.post(`${baseUrl}/itineraries`, newItinerary);
        setIsClicked(false);
        setFormData({
          username: "",
          location: "",
          startDate: null,
          endDate: null,
        });
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
            className="form__input--username"
            value={formData.username}
            // className={`form__inputname ${!name && isTouched ? "form__input--invalid" : ""}`}
            onChange={(event) => {
              setFormData({ ...formData, username: event.target.value });
            }}
            // onBlur={() => {
            //   setIsTouched(true);
            // }}
            // value={name}
          ></input>

          <label htmlFor="location" className="form__label">
            Where to next?
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="form__input--location"
            value={formData.location}
            onChange={(event) => {
              setFormData({ ...formData, location: event.target.value });
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
