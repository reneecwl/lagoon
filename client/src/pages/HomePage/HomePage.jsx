import "./HomePage.scss";
import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";

export default function HomePage({ isOpen, setIsOpen }) {
  return (
    <div className="homepage">
      <div className="homepage__background"></div>
      {!isOpen && (
        <div className="homepage__content">
          <h3 className="homepage__title">Time for your next adventure?</h3>
          <button className="homepage__button" onClick={() => setIsOpen(true)}>
            Explore Now
          </button>
        </div>
      )}
      {isOpen && <CreateItinerary setIsOpen={setIsOpen} />}
    </div>
  );
}
