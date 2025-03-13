import "./HomePage.scss";
import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";

export default function HomePage({ isOpen, setIsOpen, fetchItinerary, itinerary, itineraryId }) {
  return (
    <>
      {!isOpen && (
        <div>
          <h3 className="homepage__title">Time for your next adventure?</h3>
          <button onClick={() => setIsOpen(true)}>Let's Wander</button>
        </div>
      )}
      {isOpen && <CreateItinerary setIsOpen={setIsOpen} />}
    </>
  );
}
