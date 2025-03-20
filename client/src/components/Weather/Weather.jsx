import "./Weather.scss";
import { format } from "date-fns";

export default function Weather({ filteredWeatherData, loading }) {
  const generateSkeletonCards = () => {
    return Array(5).fill(null);
  };

  if (loading) {
    return (
      <div className="weather">
        <h3 className="weather__title">Weather</h3>
        <div className="weather__container">
          {generateSkeletonCards().map((_, index) => (
            <div key={index} className="card card--skeleton">
              <div className="card__date--skeleton"></div>
              <div className="card__image--skeleton"></div>
              <div className="card__temp--skeleton"></div>
              <div className="card__rain--skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!filteredWeatherData || filteredWeatherData.length === 0) {
    return (
      <div className="weather">
        <h3 className="weather__title">Weather</h3>
        <p>No weather data available yet.</p>
      </div>
    );
  }

  const extractedData = filteredWeatherData.map((day) => ({
    date: format(new Date(day.date + "T00:00:00"), "dd MMM"),
    mintemp_c: Math.round(day.day.mintemp_c),
    maxtemp_c: Math.round(day.day.maxtemp_c),
    daily_chance_of_rain: day.day.daily_chance_of_rain,
    icon: day.day.condition.icon,
  }));

  return (
    <div className="weather">
      <h3 className="weather__title">Weather</h3>
      <div className="weather__container">
        {extractedData.map((day, index) => (
          <div key={index} className="card">
            <p className="card__date">{day.date}</p>
            <img className="card__image" src={`https:${day.icon}`} alt="Weather Icon" />
            <p className="card__temp">
              {day.mintemp_c} - {day.maxtemp_c} °C
            </p>
            <p className="card__rain"> Chance of Rain: {day.daily_chance_of_rain}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
