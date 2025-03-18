import "./UserItinerariesPage.scss";
import FormatDate from "../../utility/FormatDate";
import { format } from "date-fns";
import DaysCount from "../../utility/DaysCount";
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
  console.log(trips[0].end_date);

  const formattedDate = (dateString) => {
    return format(new Date(dateString), "MMM dd");
  };

  const tripStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "Invalid date";
    }

    if (now < startDate) {
      return "Upcoming";
    } else if (now > endDate) {
      return "Completed";
    } else {
      return "Happening";
    }
  };

  const upcomingNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Upcoming").length;
  const completedNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Completed").length;

  return (
    <div className="user">
      <main className="user__main">
        <div className="user__header">
          <div className="user__title"> My Journeys</div>
          <div className="user__statistics">
            <div className="statistics__left">
              <h3 className="statistics__title">Trip Statistics</h3>
              <div className="statistics__trip--upcoming">{upcomingNum} Upcoming Trips</div>
              <div className="statistics__trip--completed">{completedNum} Completed Trips</div>
            </div>
            <div className="statistics__right">
              <div className="statistics__countdown">Next Trip: London in 15 days</div>
            </div>
          </div>
        </div>
        <div className="trips">
          <h3 className="trips__header">All Trips</h3>
          {trips.map((trip, index) => (
            <div className="trip" key={index}>
              <div className="trip__image-container">
                <h4 className="trip__status">{tripStatus(trip.start_date, trip.end_date)}</h4>
                <img className="trip__image" src="/"></img>
              </div>
              <div className="trip__summary">
                <Link to={`/itineraries/${trip.id}`} className="trip__name">
                  {trip.itinerary_name}
                </Link>
                <span className="trip__date">
                  {`${formattedDate(trip.start_date)} - ${formattedDate(trip.end_date)}, 2025`}
                </span>
                <span className="trip__days-count"> {` (${DaysCount(trip.start_date, trip.end_date)} days)`}</span>
                <p className="trip__location">5 Attractions planned</p>
                <p className="trip__type">City Trip</p>
              </div>
              <Link to={`/itineraries/${trip.id}`} className="trip__name">
                {" "}
                <button className="trip__edit">Edit</button>{" "}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
