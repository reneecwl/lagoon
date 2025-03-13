import "./ItineraryPlanningPage.scss";

export default function ItineraryPlanningPage({ itinerary }) {
  console.log(itinerary);
  return (
    <>
      <h3 className="itineraryplanningpage__title">This is the Itinerary Planning Page</h3>
      <p> This is the itinerary id {itinerary.id}</p>
    </>
  );
}
