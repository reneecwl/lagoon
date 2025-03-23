import "./App.scss";
import "./styles/partials/_global.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ItineraryPlanningPage from "./pages/ItineraryPlanningPage/ItineraryPlanningPage";
import UserItinerariesPage from "./pages/UserItinerariesPage/UserItinerariesPage";

function App() {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <>
      <Header handleNavigation={handleNavigation} />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage handleNavigation={handleNavigation} />} />
          <Route path="/itineraries/:itineraryId" element={<ItineraryPlanningPage />} />
          <Route path="/users/:userId/itineraries" element={<UserItinerariesPage />} />
        </Routes>
      </main>
      <Footer handleNavigation={handleNavigation} />
    </>
  );
}

export default App;
