import "./App.scss";
import "./styles/partials/_global.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ItinerariesPage from "./pages/ItinerariesPage/ItinerariesPage";
import ItineraryPlanningPage from "./pages/ItineraryPlanningPage/ItineraryPlanningPage";

function App() {
  const [createItinerary, setCreateItinerary] = useState(false);

  return (
    <BrowserRouter>
      <Header setCreateItinerary={setCreateItinerary} />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={<HomePage createItinerary={createItinerary} setCreateItinerary={setCreateItinerary} />}
          />
          <Route path="/itineraries" element={<ItinerariesPage />} />
          <Route path="/itineraries/:id" element={<ItineraryPlanningPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
