import "./UserItinerariesPage.scss";
import FormatDate from "../../utility/FormatDate";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserItinerariesPage() {
  const [userItineraries, setUserItineraries] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserItineraries = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/1/itineraries`);
        setUserItineraries(response.data);
      } catch (error) {
        console.error("There is an error loading the user's itineraries", error);
      }
    };
    fetchUserItineraries();
  }, []);

  if (!userItineraries) {
    return <div>Loading...</div>;
  }

  const trips = userItineraries.itineraries;

  console.log(trips);

  return (
    <div className="user">
      <h3 className="user_header">{userItineraries.username} My Journeys</h3>
      <div className="user__statistics">
        <div className="statistics__left">
          <h3 className="statistics__title">Trip Statistics</h3>
          <div className="statistics__trip--upcoming">3 Upcoming Trips</div>
          <div className="statistics__trip--completed">3 Completed Trips</div>
        </div>
        <div className="statistics__right">
          <div className="statistics__countdown">Next Trip: London in 15 days</div>
        </div>
      </div>
      <div className="trips">
        <h3 className="trips__header">All Trips</h3>
        {trips.map((trip, index) => (
          <div className="trips__trip" key={index}>
            <Link to={`/itineraries/${trip.id}`} className="trips__trip-name">
              {trip.itinerary_name}
            </Link>
            <p className="trips__trip-date"> {`${FormatDate(trip.start_date)} to ${FormatDate(trip.end_date)}`} </p>
            <p className="trips__trip-location">{trip.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
