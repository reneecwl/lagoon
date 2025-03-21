import "./App.scss";
import "./styles/partials/_global.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ItinerariesPage from "./pages/ItinerariesPage/ItinerariesPage";
import ItineraryPlanningPage from "./pages/ItineraryPlanningPage/ItineraryPlanningPage";
import UserItinerariesPage from "./pages/UserItinerariesPage/UserItinerariesPage";
import AboutUsPage from "./components/AboutUs/AboutUs";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/itineraries" element={<ItinerariesPage />} />
          <Route path="/itineraries/:itineraryId" element={<ItineraryPlanningPage />} />
          <Route
            path="/users/:userId/itineraries"
            element={<UserItinerariesPage isOpen={isOpen} setIsOpen={setIsOpen} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
