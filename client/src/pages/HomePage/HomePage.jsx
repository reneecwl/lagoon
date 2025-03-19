import "./HomePage.scss";
import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import { Link } from "react-router-dom";

export default function HomePage({ isOpen, setIsOpen }) {
  return (
    <div className="homepage">
      <div className="homepage__background"></div>
      {!isOpen && (
        <div className="homepage__content">
          <h3 className="homepage__title">Time for your next adventure?</h3>
          <Link to="/users/1/itineraries" className="homepage__button">
            {" "}
            My Journey{" "}
          </Link>{" "}
          <button

          // onClick={() => setIsOpen(true)}
          ></button>
        </div>
      )}
      {/* {isOpen && <CreateItinerary setIsOpen={setIsOpen} />} */}
    </div>
  );
}
