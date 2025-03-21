import "./UserItinerariesPage.scss";
import { format } from "date-fns";
import DaysCount from "../../utility/DaysCount";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import londonImage from "../../assets/images/destinations/london.jpg";
import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import JourneyMap from "../../components/JourneyMap/JourneyMap";
import parisImage from "../../assets/images/destinations/paris.jpg";
import aarhusImage from "../../assets/images/destinations/aarhus.jpg";
import romeImage from "../../assets/images/destinations/rome.jpg";
import sevilleImage from "../../assets/images/destinations/seville.jpg";
import tokyoImage from "../../assets/images/destinations/tokyo.jpg";
import sydneyImage from "../../assets/images/destinations/sydney.jpg";
import hkImage from "../../assets/images/destinations/hongkong.jpg";
import UserStatistics from "../../components/UserStatistics/UserStatistics.jsx";

export default function UserItinerariesPage({ isOpen, setIsOpen }) {
  const [userItineraries, setUserItineraries] = useState(null);
  const { userId } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserItineraries = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${userId}/itineraries`);
        setUserItineraries(response.data);
        // console.log(response.data);
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
  const userName = userItineraries.username || "Traveler";

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

  const locationImages = {
    London: londonImage,
    Paris: parisImage,
    Aarhus: aarhusImage,
    Seville: sevilleImage,
    Rome: romeImage,
    Tokyo: tokyoImage,
    Sydney: sydneyImage,
    HongKong: hkImage,
  };

  const getDestinationImage = (location) => {
    if (location && locationImages[location]) {
      return locationImages[location];
    }
    return locationImages["HongKong"];
  };

  return (
    <div className="user">
      <main className="user__main">
        <div className="user__header-container">
          <div className="user__header">
            <div className="user__title-banner">
              <div className="user__header-content">
                <div className="user__title-container">
                  <h1 className="user__title">My Journeys</h1>
                  <p className="user__welcome">Welcome back, {userName}!</p>
                </div>
                {/* <div className="user__action-area">
                  <button
                    className="user__add-button"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <svg viewBox="0 -960 960 960">
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <span>Plan a New Trip</span>
                  </button>
                </div> */}
              </div>
            </div>
            <UserStatistics trips={trips} tripStatus={tripStatus} />{" "}
          </div>
          <div className="user__map-container">
            <JourneyMap trips={trips} tripStatus={tripStatus} />{" "}
          </div>
        </div>
        <div className="trips">
          <div className="trips__header">
            <h3 className="trips__title">All Trips</h3>
            <button
              className="trips__add-container"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <svg className="trips__add-icon" viewBox="0 -960 960 960">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              <span className="trips__add-trip">Add a Trip</span>
            </button>
          </div>
          <div className="trips__container">
            {isOpen && (
              <div className="create-itinerary__overlay">
                <CreateItinerary setIsOpen={setIsOpen} />
              </div>
            )}
            {trips.map((trip, index) => (
              <div
                className={`trip ${
                  tripStatus(trip.start_date, trip.end_date) === "Completed" ? "trip--completed" : "trip--upcoming"
                }`}
                key={index}
              >
                <div className="trip__image-container">
                  <h4 className="trip__status">{tripStatus(trip.start_date, trip.end_date)}</h4>
                  <img className="trip__image" src={getDestinationImage(trip.location)} alt={trip.location}></img>
                </div>
                <div className="trip__summary">
                  <Link to={`/itineraries/${trip.id}`} className="trip__name">
                    {trip.itinerary_name ||
                      `${DaysCount(trip.start_date, trip.end_date)} Days trip in ${trip.location}`}
                  </Link>
                  <div className="trip__date-container">
                    <span className="trip__date">
                      {`${formattedDate(trip.start_date)} - ${formattedDate(trip.end_date)}, 2025`}
                    </span>
                    <span className="trip__days-count"> {` (${DaysCount(trip.start_date, trip.end_date)} days)`}</span>
                  </div>
                  <p className="trip__attractions">{trip.attraction_count} Attractions planned</p>
                  <p className="trip__type">City Trip</p>
                </div>
                <div className="trip__button-container">
                  <Link to={`/itineraries/${trip.id}`} className="trip__name">
                    {" "}
                    <button
                      className={
                        tripStatus(trip.start_date, trip.end_date) === "Completed" ? "trip__view" : "trip__edit"
                      }
                    >
                      {tripStatus(trip.start_date, trip.end_date) === "Completed" ? (
                        "View"
                      ) : (
                        <>
                          <svg className="trip__edit-icon" viewBox="0 -960 960 960">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                          </svg>
                          <span> Edit</span>
                        </>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
