import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isItineraryPage = location.pathname.includes("/itineraries");

  return (
    <header className={isItineraryPage ? "header header--itinerary" : "header"}>
      <Link className="nav-link" to="/">
        <h1 className={isItineraryPage ? "header__title header__title--itinerary" : "header__title"}>Lagoon</h1>
      </Link>

      <div className="header__right">
        <nav className="navbar">
          <ul className="navbar__list">
            {isItineraryPage && (
              <li className={isItineraryPage ? "navbar__subtitle navbar__itinerary" : "navbar__subtitle"}>
                <Link className="nav-link" to="/users/1/itineraries">
                  My Journey
                </Link>
              </li>
            )}
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link className="nav-link" to="/about">
                Discover
              </Link>
            </li>
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link to="/#about" className="nav-link">
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
          </div>
        </div>
      </div>
    </header>
  );
}
