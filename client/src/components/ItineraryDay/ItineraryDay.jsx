import "./ItineraryDay.scss";

export default function ItineraryDay({ itinerary }) {
  const itineraryAttractions = itinerary.attractions;

  return (
    // <div className="itinerary-day">
    // <h4 className="planner__day"></h4></div>
    <div className="itinerary-day">
      <h4 className="itienrary-day__header">Day 1</h4>
      <ul className="itinerary-day__attractions"></ul>
    </div>
  );
}
