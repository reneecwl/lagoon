import "./ItineraryDay.scss";

export default function ItineraryDay({ dailyAttractions }) {
  console.log(`Daily Attractions:`, dailyAttractions);

  return (
    <div className="planner">
      {dailyAttractions.map((attractionByDay, index) => (
        <div key={index} className="planner__byday">
          <h3 className="planner_day"> Day {attractionByDay.day}:</h3>
          {attractionByDay.attractions.map((attraction) => (
            <div key={attraction.id} className="planner__attraction">
              <p className="">{attraction.attraction_name}</p>
              <p className="">Suggested Duration: {attraction.suggested_duration}</p>
              <p className="">User Notes: {attraction.user_notes}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
