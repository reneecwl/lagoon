import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header({ setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isItineraryPage = location.pathname.includes("/itineraries");

  return (
    <header className={isItineraryPage ? "header header--itinerary" : "header"}>
      <h1
        className={isItineraryPage ? "header__title header__title--itinerary" : "header__title"}
        onClick={() => {
          setIsOpen(false);
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >
        Lagoon
      </h1>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className={isItineraryPage ? "navbar__item navbar__itinerary" : "navbar__item"}>
            <Link to="/itineraries">My Journey</Link>
          </li>
          <li className={isItineraryPage ? "navbar__item navbar__item--itinerary" : "navbar__item"}>
            <Link to="/about">Discover</Link>
          </li>
          <li className={isItineraryPage ? "navbar__item navbar__item--itinerary" : "navbar__item"}>
            <Link to="/contact">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
