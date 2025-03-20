import "./ItineraryOutline.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import ItineraryMap from "../ItineraryMap/ItineraryMap";
import PublicHoliday from "../PublicHoliday/PublicHoliday";

export default function ItineraryOutline({
  itinerary,
  formattedStartDate,
  formattedEndDate,
  daysCount,
  fetchItinerary,
  filteredWeatherData,
  loading,
  backgroundImage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripName, setTripName] = useState(
    itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`
  );

  const [activeTab, setActiveTab] = useState("weather");

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setTripName(event.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);

    const editTripDetails = {
      ...itinerary,
      itinerary_name: tripName,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    console.log(editTripDetails);

    try {
      await axios.put(`${baseUrl}/itineraries/${itinerary.id}`, editTripDetails);
      fetchItinerary();
      console.log("Trip name updated");
    } catch (error) {
      console.error("Error updating trip name:", error);
    }
  };

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
      <div className="outline">
        <div className="outline__header outline__header--image" style={{ "--header-image": `url(${backgroundImage})` }}>
          <div className="outline__titles">
            <div className="outline__name-container">
              {isEditing ? (
                <input
                  type="text"
                  className="outline__name-input"
                  value={tripName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                />
              ) : (
                <h3 className="outline__name">
                  {itinerary.itinerary_name || `${daysCount} Days trip in ${itinerary.location}`}
                </h3>
              )}

              <svg className="outline__edit" viewBox="0 -960 960 960" onClick={handleEditClick}>
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </div>
            <div className="outline__dates">
              {formattedStartDate} to {formattedEndDate}
            </div>
          </div>

          <div className="outline__location">
            <span>{itinerary.location}</span>
          </div>
        </div>
        <Weather loading={loading} filteredWeatherData={filteredWeatherData} />
        <div className="outline__tabs">
          <button
            className={`outline__tab ${activeTab === "holidays" ? "outline__tab--active" : ""}`}
            onClick={() => setActiveTab("holidays")}
          >
            Public Holidays
          </button>
          <button
            className={`outline__tab ${activeTab === "map" ? "outline__tab--active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            Map View
          </button>
        </div>

        <div className="outline__tab-content">
          {activeTab === "holidays" ? (
            <PublicHoliday itinerary={itinerary} />
          ) : (
            <ItineraryMap attractions={itinerary.attractions || []} location={itinerary.location} />
          )}
        </div>
      </div>
    </>
  );
}
