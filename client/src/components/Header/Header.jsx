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
      <div className="header__right">
        <nav className="navbar">
          <ul className="navbar__list">
            <li className={isItineraryPage ? "navbar__subtitle navbar__itinerary" : "navbar__subtitle"}>
              <Link className="nav-link" to="/users/1/itineraries">
                My Journey
              </Link>
            </li>
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link className="nav-link" to="/about">
                Discover
              </Link>
            </li>
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link className="nav-link" to="/contact">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user-avatar">
          <div className="user-avatar__logo">
            <Link className="user-avatar__initial" to="/users/1/itineraries">
              {" "}
              A{" "}
            </Link>
            {/* <span className="user-avatar__initial"></span> */}
          </div>
        </div>
      </div>
    </header>
  );
}
