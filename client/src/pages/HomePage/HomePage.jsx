import "./HomePage.scss";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import Discover from "../../components/Discover/Discover.jsx";
import CreateItineraryForm from "../../components/CreateItineraryForm/CreateItineraryForm.jsx";

export default function HomePage({ handleNavigation, isOpen, setIsOpen }) {
  const aboutRef = useRef(null);
  const discoverRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = location.state.scrollTo;
      const element = section === "about" ? aboutRef.current : discoverRef.current;
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div id="homepage" className="homepage">
      <div className="homepage__hero">
        <div className="homepage__background"></div>
        <div className="homepage__content">
          <h1 className="homepage__title">Time for your next adventure ?</h1>
          <Link to="/users/1/itineraries" className="homepage__button">
            My Journey
          </Link>
        </div>
        <div className="homepage__scroll-container" onClick={() => handleNavigation("discover")}>
          <span className="homepage__scroll">Discover More</span>
          <svg className="homepage__scroll-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
          </svg>
        </div>
      </div>
      <div id="discover" ref={discoverRef}>
        <Discover isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {isOpen && (
        <div className="create-itinerary__overlay">
          <CreateItineraryForm setIsOpen={setIsOpen} />
        </div>
      )}
      <div id="about" ref={aboutRef}>
        <AboutUs />
      </div>
    </div>
  );
}
