import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ setCreateItinerary }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1
        className="header__title"
        onClick={() => {
          setCreateItinerary(false);
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >
        Lagoon
      </h1>
      <Link to="/itineraries">
        <p className="header__mytrip">My Trip</p>
      </Link>
    </header>
  );
}
