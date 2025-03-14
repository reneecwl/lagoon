import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ setIsOpen }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1
        className="header__title"
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
          <li className="navbar__item">
            <Link to="/itineraries">My Journey</Link>
          </li>
          <li className="navbar__item">
            <Link to="/about">Discover</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
