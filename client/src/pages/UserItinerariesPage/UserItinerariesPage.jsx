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

  // console.log(userItineraries);

  const trips = userItineraries.itineraries;

  console.log(trips);

  return (
    <div className="user">
      <h3 className="user_header">{userItineraries.username} Upcoming Trips</h3>
      <div className="trips">
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
