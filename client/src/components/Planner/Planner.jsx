import DeleteModal from "../DeleteModal/DeleteModal";
import "./Planner.scss";
import axios from "axios";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ItineraryPlanner({ dailyAttractions, itineraryId, fetchItinerary, baseUrl }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [attractionData, setAttractionData] = useState(null);
  const [editingAttractionId, setEditingAttractionId] = useState(null);
  const [notes, setNotes] = useState("");
  const baseUrlImg = import.meta.env.VITE_API_URL_IMG;

  const handleDeleteClick = (attraction) => {
    setDeleteModal(true);
    setAttractionData(attraction);
    console.log("Delete Clicked");
  };

  const handleEditClick = (id, currentNotes) => {
    setEditingAttractionId(id);
    setNotes(currentNotes);
  };

  //for user_notes
  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const handleBlur = async (attraction) => {
    setEditingAttractionId(null);
    try {
      await axios.patch(`${baseUrl}/itineraries/${itineraryId}`, {
        attraction_id: attraction.id,
        user_notes: notes,
      });
      fetchItinerary();
      console.log("Trip notes updated");
    } catch (error) {
      console.error("Error updating trip notes:", error);
    }
  };

  const handlePdfDownload = () => {
    const input = document.getElementById("itinerary-download");

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("itinerary.pdf");
    });
  };

  return (
    <div id="itinerary-download">
      <div className="planner">
        <div className="planner__header">
          <div className="planner__header-content">
            <h2 className="planner__header-title">Itinerary</h2>
          </div>
        </div>
        <div className="planner__content">
          {dailyAttractions.map((attractionByDay, index) => (
            <div key={index} className="planner__byday">
              <div className="planner__day">
                <h3
                  className={`planner__day-index ${
                    attractionByDay.attractions.length === 0 ? "planner__day-index--empty" : ""
                  }`}
                >
                  Day {attractionByDay.day}
                </h3>
              </div>
              {attractionByDay.attractions.map((attraction) => (
                <div key={attraction.id} className="planner__attraction">
                  <div className="planner__attraction-content">
                    <div className="planner__attraction-thumbnail">
                      <img src={`${baseUrlImg}/images/${attraction.image}`} alt={attraction.attraction_name} />
                    </div>
                    <div className="planner__attraction-details">
                      <p className="planner__attraction-name">{attraction.attraction_name}</p>
                      <p className="planner__duration">Suggested visit: {attraction.suggested_duration}</p>
                    </div>
                  </div>

                  <div className="planner__notes-container">
                    {editingAttractionId === attraction.id ? (
                      <input
                        type="text"
                        className="planner__notes-input"
                        value={notes}
                        onChange={handleChange}
                        onBlur={() => handleBlur(attraction)}
                        autoFocus
                      />
                    ) : (
                      <p className="planner__notes">Notes: {attraction.user_notes}</p>
                    )}
                    <svg
                      className="planner__edit"
                      viewBox="0 -960 960 960"
                      onClick={() => handleEditClick(attraction.id, attraction.user_notes)}
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </div>

                  <button className="planner__delete" onClick={() => handleDeleteClick(attraction)}>
                    <svg className="planner__delete-icon" viewBox="0 -960 960 960">
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                </div>
              ))}
              {attractionByDay.attractions.length === 0 && (
                <div className="planner__empty-day">No attractions planned for this day. Add some from the list.</div>
              )}
            </div>
          ))}
          {deleteModal && (
            <DeleteModal
              itineraryId={itineraryId}
              attractionData={attractionData}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              fetchItinerary={fetchItinerary}
            />
          )}
        </div>
      </div>
      <button onClick={handlePdfDownload}>Download as PDF</button>
    </div>
  );
}
