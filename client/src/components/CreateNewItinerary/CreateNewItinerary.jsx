import "./createNewItinerary.scss";

export default function () {
  return (
    <>
      {/* <form className="form" onSubmit={handleFormSubmit}> */}
      <div className="form__container">
        <form className="form">
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
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" />
          <button type="submit" className="form__submit">
            Start My Journey!
          </button>
        </form>
      </div>
    </>
  );
}
