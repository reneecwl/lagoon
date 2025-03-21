import "./AboutUs.scss";
import petraImage from "../../assets/images/Petra.jpg";

export default function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us__container">
        <div className="about-us__content">
          <div className="about-us__text">
            <h2 className="about-us__title">
              <span className="about-us__about">about</span> Lagoon
            </h2>
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
          <div className="about-us__image-container">
            <img src={petraImage} alt="Travel experience" className="about-us__image" />
          </div>
        </div>
      </div>
    </section>
  );
}
