import "./App.scss";
import "./styles/partials/_global.scss";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ItinerariesPage from "./pages/ItinerariesPage/ItinerariesPage";
import ItineraryPlanningPage from "./pages/ItineraryPlanningPage/ItineraryPlanningPage";
import UserItinerariesPage from "./pages/UserItinerariesPage/UserItinerariesPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: section } });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <>
      <Header handleNavigation={handleNavigation} />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/itineraries" element={<ItinerariesPage />} />
          <Route path="/itineraries/:itineraryId" element={<ItineraryPlanningPage />} />
          <Route path="/users/:userId/itineraries" element={<UserItinerariesPage />} />
        </Routes>
      </main>
      <Footer handleNavigation={handleNavigation} />
    </>
  );
}

export default App;
