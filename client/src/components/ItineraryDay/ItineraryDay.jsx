import "./ItineraryDay.scss";

export default function ItineraryDay({ itinerary }) {
  const attractionsSelected = itinerary.attractions;
  console.log(`Attractions Selected:`, attractionsSelected);

  const attractionsByDay = attractionsSelected.reduce((acc, attraction) => {
    const day = attraction.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(attraction);
    return acc;
  }, {});

  console.log(`Attractions Grouped by Day:`, attractionsByDay);

  const dailyAttractions = Object.keys(attractionsByDay).map((day) => ({
    day: `Day ${day}`,
    attractions: attractionsByDay[day],
  }));

  console.log(`Daily Attractions:`, dailyAttractions);

  return (
    <div className="planner">
      {dailyAttractions.map((dailyAttraction, index) => (
        <div key={index} className="planner__byday">
          <h3 className="planner_day">{dailyAttraction.day}:</h3>
          {dailyAttraction.attractions.map((attraction) => (
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
