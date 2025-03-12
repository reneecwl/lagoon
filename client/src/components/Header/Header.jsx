import { useNavigate } from "react-router-dom";

export default function Header({ setCreateItinerary }) {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header__container">
        <h1
          onClick={() => {
            setCreateItinerary(false);
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          🏕️ Lagoon
        </h1>
        <p className="header__mytrip"></p>
      </div>
    </header>
  );
}
