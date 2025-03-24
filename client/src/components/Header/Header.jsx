import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/lagoon-white-logo.png";

export default function Header({ handleNavigation }) {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <header id="hearder" className={!isHomePage ? "header header--itinerary" : "header"}>
      <Link to="/">
        <div className="header__logo-container">
          <img src={logo} alt="logo" className="header__logo" />
          <h1 className="header__title">Lagoon</h1>
        </div>
      </Link>

      <div className="header__right">
        <nav className="navbar">
          <ul className="navbar__list">
            {!isHomePage && (
              <li className="navbar__subtitle">
                <Link className="navbar__nav-link" to="/users/1/itineraries">
                  My Journey
                </Link>
              </li>
            )}
            <li className="navbar__subtitle">
              <span className="navbar__nav-link" onClick={() => handleNavigation("discover")}>
                Discover
              </span>
            </li>
            <li className="navbar__subtitle">
              <span className="navbar__nav-link" onClick={() => handleNavigation("about")}>
                About
              </span>
            </li>
          </ul>
        </nav>
        <div className="user-avatar">
          <div className="user-avatar__logo">
            <Link className="user-avatar__initial" to="/users/1/itineraries">
              R
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
