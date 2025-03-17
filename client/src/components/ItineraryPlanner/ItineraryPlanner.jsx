import "./ItineraryPlanner.scss";

export default function ItineraryPlanner({ dailyAttractions }) {
  return (
    <div className="planner">
      {dailyAttractions.map((attractionByDay, index) => (
        <div key={index} className="planner__byday">
          <h3 className="planner__dayIndex"> Day {attractionByDay.day}:</h3>
          {attractionByDay.attractions.map((attraction) => (
            <div key={attraction.id} className="planner__attraction">
              <p className="planner__attraction-name">{attraction.attraction_name}</p>
              <p className="planner__duration">Suggested Duration: {attraction.suggested_duration}</p>
              <p className="planner__notes">User Notes: {attraction.user_notes}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
