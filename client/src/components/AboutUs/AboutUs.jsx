import "./AboutUs.scss";
import petraImage from "../../assets/images/Petra.jpg";
// Import additional images - you'll need to add these to your assets
import copenhagenImage from "../../assets/images/copenhagen.jpg";
import hongkongImage from "../../assets/images/hongkong.jpg";

export default function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us__container">
        {/* Decorative heading inspired by Belmond */}
        <div className="about-us__heading-container">
          <h2 className="about-us__title">
            Our <span className="about-us__title--highlight">Story</span>
          </h2>
          <div className="about-us__title-decoration"></div>
        </div>

        <div className="about-us__content">
          <div className="about-us__text">
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
              <a href="/contact" className="about-us__button about-us__button--secondary">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Updated image gallery layout inspired by Belmond */}
          <div className="about-us__images">
            <div className="about-us__image-container about-us__image-container--main">
              <img src={petraImage} alt="Travel experience" className="about-us__image" />
              <div className="about-us__image-overlay">
                <span className="about-us__image-text">Discover</span>
              </div>
            </div>
            <div className="about-us__image-row">
              <div className="about-us__image-container about-us__image-container--small">
                <img src={hongkongImage} alt="Travel moment" className="about-us__image" />
                <div className="about-us__image-overlay">
                  <span className="about-us__image-text">Explore</span>
                </div>
              </div>
              <div className="about-us__image-container about-us__image-container--small">
                <img src={copenhagenImage} alt="Travel destination" className="about-us__image" />
                <div className="about-us__image-overlay">
                  <span className="about-us__image-text">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
