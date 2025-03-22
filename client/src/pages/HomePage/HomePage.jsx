import "./HomePage.scss";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import Discover from "../../components/Discover/Discover.jsx";

export default function HomePage({ handleNavigation }) {
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
          <svg viewBox="0 0 24 24" className="homepage__scroll-icon">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v14m-7-7l7 7 7-7"
            />
          </svg>
        </div>
      </div>
      <div id="discover" ref={discoverRef}>
        <Discover />
      </div>
      <div id="about" className="homepage__about" ref={aboutRef}>
        <AboutUs />
      </div>
    </div>
  );
}
