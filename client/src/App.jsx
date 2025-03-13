import "./App.scss";
import "./styles/partials/_global.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ItinerariesPage from "./pages/ItinerariesPage/ItinerariesPage";
import ItineraryPlanningPage from "./pages/ItineraryPlanningPage/ItineraryPlanningPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [itinerary, setItinerary] = useState();
  const { itineraryId } = useParams();

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchItinerary = async () => {
    try {
      const response = await axios.get(`${baseUrl}/itineraries/${itineraryId}`);
      setItinerary(response.data);
    } catch (error) {
      console.error("There is an error loading the itinerary", error);
    }
  };

  return (
    <BrowserRouter>
      <Header setIsOpen={setIsOpen} />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                fetchItinerary={fetchItinerary}
                itinerary={itinerary}
                itineraryId={itineraryId}
              />
            }
          />
          <Route path="/itineraries" element={<ItinerariesPage />} />
          <Route
            path="/itineraries/:itineraryId"
            element={
              <ItineraryPlanningPage fetchItinerary={fetchItinerary} itinerary={itinerary} itineraryId={itineraryId} />
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
