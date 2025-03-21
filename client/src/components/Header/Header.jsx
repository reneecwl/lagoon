import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/lagoon-white-logo.png";

export default function Header() {
  const location = useLocation();

  const isItineraryPage = location.pathname.includes("/itineraries");

  return (
    <header id="hearder" className={isItineraryPage ? "header header--itinerary" : "header"}>
      <Link to="/">
        <div className="header__logo-container">
          <img src={logo} alt="logo" className="header__logo" />
          <h1 className={isItineraryPage ? "header__title header__title--itinerary" : "header__title"}>Lagoon</h1>
        </div>{" "}
      </Link>

      <div className="header__right">
        <nav className="navbar">
          <ul className="navbar__list">
            {isItineraryPage && (
              <li className={isItineraryPage ? "navbar__subtitle navbar__itinerary" : "navbar__subtitle"}>
                <Link className="navbar__nav-link" to="/users/1/itineraries">
                  My Journey
                </Link>
              </li>
            )}
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link className="navbar__nav-link" to="/about">
                Discover
              </Link>
            </li>
            <li className={isItineraryPage ? "navbar__subtitle navbar__subtitle--itinerary" : "navbar__subtitle"}>
              <Link to="/#about" className="navbar__nav-link">
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
