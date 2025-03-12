import "./createNewItinerary.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function CreateNewItinerary({ setCreateItinerary }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isFormValid = () => {
    if (!username || !location || !startDate || !endDate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all fields");
      return;
    }
    // try{

    // }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    // Add your form submission logic here
  };

  return (
    <>
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="form__label">
            What should we call you, explorer?
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form__input--name"
            // className={`form__inputname ${!name && isTouched ? "form__input--invalid" : ""}`}
            // onChange={(event) => {
            //   setName(event.target.value);
            // }}
            // onBlur={() => {
            //   setIsTouched(true);
            // }}
            // value={name}
          ></input>

          <label htmlFor="location" className="form__label">
            Where to next?
          </label>
          <input type="text" name="location" id="location" className="form__input--location"></input>

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
            dateFormat="yyyy/MM/dd"
            isClearable
            placeholderText="Select a date range"
            minDate={new Date()}
            monthsShown={2}
          />
          <button className="form__cancel" onClick={() => setCreateItinerary(false)}>
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
