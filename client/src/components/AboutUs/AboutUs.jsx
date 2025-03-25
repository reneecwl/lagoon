import { useState } from "react";
import "./AboutUs.scss";
import petraImage from "../../assets/images/Petra.jpg";
import brugesImage from "../../assets/images/bruges.jpeg";
import hongkongImage from "../../assets/images/hongkong.jpg";

export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageData = [
    {
      src: petraImage,
      location: "Petra, Jordan",
      caption: "Where history meets adventure",
    },
    {
      src: hongkongImage,
      location: "Hong Kong",
      caption: "City of lights and harbor nights",
    },
    {
      src: brugesImage,
      location: "Bruges, Belgium",
      caption: "Medieval charm along cobblestone canals",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imageData.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageData.length - 1 : prevIndex - 1));
  };

  return (
    <section className="about-us">
      <div className="about-us__container">
        <div className="about-us__content">
          <div className="about-us__text">
            <div className="about-us__heading-container about-us__heading-container--left">
              <h2 className="about-us__title">
                about <span className="about-us__title--highlight">Lagoon</span>
              </h2>
              <div className="about-us__title-decoration"></div>
            </div>

            <p className="about-us__description">
              Born from a <span className="about-us__description--bold">passion for travel</span> and a love for
              planning, Lagoon was built on a simple belief- the most rewarding part of any journey is an itinerary that
              truly <span className="about-us__description--bold">resonates with the traveller.</span>
            </p>

            <p className="about-us__description">
              In a world flooded with generic recommendations, Lagoon emerged as a platform to help travellers to{" "}
              <span className="about-us__description--bold">design their own personalized adventures</span>
              —whether for themselves or their loved one—while taking into account{" "}
              <span className="about-us__description--bold">seasonal trends </span>and local insights.
            </p>

            <p className="about-us__description">
              Beyond planning, Lagoon also serves as a{" "}
              <span className="about-us__description--bold">digital companion</span> to store all your trip itineraries
              and <span className="about-us__description--bold">map out the cities you've explored</span>, creating a
              visual diary of your personal travel journey.{" "}
              <span className="about-us__description--bold">Your story, your way.</span>
            </p>

            <div className="about-us__buttons">
              <a href="/philosophy" className="about-us__button about-us__button--primary">
                Our Philosophy
              </a>

              <a
                href="mailto:lagoon.planner@gmail.com"
                target="_blank"
                className="about-us__button about-us__button--secondary"
                rel="noopener noreferrer"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className="about-us__hero">
            <div className="about-us__hero-image-container">
              <img
                src={imageData[currentImageIndex].src}
                alt={imageData[currentImageIndex].location}
                className="about-us__hero-image"
              />
              <div className="about-us__hero-caption">
                <span className="about-us__hero-location">{imageData[currentImageIndex].location}</span>
                <span className="about-us__hero-tagline">{imageData[currentImageIndex].caption}</span>
              </div>
            </div>

            <div className="about-us__hero-nav">
              <button
                className="about-us__hero-nav-btn about-us__hero-nav-btn--prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <span className="about-us__hero-nav-arrow">&lsaquo;</span>
              </button>

              <div className="about-us__hero-indicators">
                {imageData.map((_, index) => (
                  <button
                    key={index}
                    className={`about-us__hero-indicator ${
                      index === currentImageIndex ? "about-us__hero-indicator--active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="about-us__hero-nav-btn about-us__hero-nav-btn--next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <span className="about-us__hero-nav-arrow">&rsaquo;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
