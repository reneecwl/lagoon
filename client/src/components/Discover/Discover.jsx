import "./Discover.scss";
import aarhusImage from "../../assets/images/aarhus.jpg";
import maltaImage from "../../assets/images/malta.jpg";
import sintraImage from "../../assets/images/sintra.jpg";

const DiscoverSection = () => {
  const destinations = [
    {
      id: 1,
      name: "Aarhus",
      country: "Denmark",
      image: aarhusImage,
      description:
        "Experience the perfect blend of historic charm and modern Scandinavian design in Denmark's second-largest city.",
    },
    {
      id: 2,
      name: "Valletta",
      country: "Malta",
      image: maltaImage,
      description:
        "Discover crystal-clear waters, prehistoric temples, and stunning baroque architecture in this Mediterranean gem.",
    },
    {
      id: 3,
      name: "Sintra",
      country: "Portugal",
      image: sintraImage,
      description:
        "Wander through this fairytale town with colorful palaces, mystical gardens, and UNESCO World Heritage sites.",
    },
  ];

  return (
    <section id="discover" className="discover">
      <div className="discover__container">
        <h2 className="discover__title">Discover Your Next Adventure</h2>
        <p className="discover__subtitle">Explore these trending destinations for your next journey</p>

        <div className="discover__grid">
          {destinations.map((destination) => (
            <div className="discover__card" key={destination.id}>
              <div className="discover__image-container">
                <img
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  className="discover__image"
                />
              </div>
              <div className="discover__content">
                <h3 className="discover__destination">
                  <span className="discover__city">{destination.name}</span>,
                  <span className="discover__country">{destination.country}</span>
                </h3>
                <p className="discover__description">{destination.description}</p>
                <button className="discover__button">Plan Your Trip</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
