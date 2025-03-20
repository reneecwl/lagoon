import "./ItineraryPlanningPage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FormatDate from "../../utility/FormatDate";
import DaysCount from "../../utility/DaysCount";
import ItineraryOutline from "../../components/ItineraryOutline/ItineraryOutline";
import AttractionList from "../../components/AttractionList/AttractionList";
import Planner from "../../components/Planner/Planner";

export default function ItineraryPlanningPage({}) {
  const [itinerary, setItinerary] = useState(null);
  const [dailyAttractions, setDailyAttractions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [filteredWeatherData, setFilteredWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { itineraryId } = useParams();
  const [dates, setDates] = useState({
    formattedStartDate: "",
    formattedEndDate: "",
    daysCount: 0,
  });

  const baseUrl = import.meta.env.VITE_API_URL;
  const baseUrlWeather = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchItinerary = async () => {
    try {
      const response = await axios.get(`${baseUrl}/itineraries/${itineraryId}`);
      setItinerary(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("There is an error loading the itinerary", error);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [itineraryId]);

  useEffect(() => {
    if (!itinerary) return;

    const fetchWeather = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${baseUrlWeather}${apiKey}&q=${itinerary.location}&days=14`);
        setWeatherData(response.data.forecast);

        const startDateObj = new Date(itinerary.start_date);
        const endDateObj = new Date(itinerary.end_date);

        const filteredData = response.data.forecast.forecastday.filter((day) => {
          const dayDateObj = new Date(day.date + "T00:00:00");
          return dayDateObj >= startDateObj && dayDateObj <= endDateObj;
        });

        setFilteredWeatherData(filteredData);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("There is an error loading the weather", error);
        setLoading(false);
      }
    };

    fetchWeather();

    const formattedStartDate = FormatDate(itinerary.start_date);
    const formattedEndDate = FormatDate(itinerary.end_date);
    const daysCount = DaysCount(formattedStartDate, formattedEndDate);

    setDates({
      formattedStartDate,
      formattedEndDate,
      daysCount,
    });

    const initialDailyAttractions = Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      attractions: [],
    }));

    if (itinerary.attractions && itinerary.attractions.length > 0) {
      itinerary.attractions.forEach((attraction) => {
        const dayArrayIndex = attraction.day - 1;

        if (dayArrayIndex < daysCount) {
          initialDailyAttractions[dayArrayIndex].attractions.push(attraction);
        }
      });
    }
    setDailyAttractions(initialDailyAttractions);
  }, [itinerary]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  // console.log(dailyAttractions);

  // const handlePdfDownload = () => {
  //   const input = document.getElementById("itinerary-download");

  //   html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "px",
  //       format: [canvas.width, canvas.height],
  //     });

  //     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  //     pdf.save("itinerary.pdf");
  //   });
  // };
  return (
    <>
      <div className="planning">
        <main className="planning__main">
          <ItineraryOutline
            itinerary={itinerary}
            formattedStartDate={dates.formattedStartDate}
            formattedEndDate={dates.formattedEndDate}
            daysCount={dates.daysCount}
            fetchItinerary={fetchItinerary}
            filteredWeatherData={filteredWeatherData}
          />
          <div className="planning__content">
            <Planner
              dailyAttractions={dailyAttractions}
              itineraryId={itineraryId}
              fetchItinerary={fetchItinerary}
              baseUrl={baseUrl}
              loading={loading}
              filteredWeatherData={filteredWeatherData}
            />
            <AttractionList
              itinerary={itinerary}
              itineraryId={itineraryId}
              daysCount={dates.daysCount}
              fetchItinerary={fetchItinerary}
            />
          </div>
        </main>
      </div>
    </>
  );
}
