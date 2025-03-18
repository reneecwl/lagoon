import DeleteModal from "../DeleteModal/DeleteModal";
import "./Planner.scss";
import { useState } from "react";

export default function ItineraryPlanner({ dailyAttractions, itineraryId, fetchItinerary }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [attractionData, setAttractionData] = useState(null);
  // console.log(dailyAttractions[1]);

  const handleDeleteClick = (attraction) => {
    setDeleteModal(true);
    setAttractionData(attraction);
  };
  // console.log(attractionData);

  return (
    <div className="planner">
      <div className="planner__header">
        <div className="planner__header-content">
          <h2 className="planner__header-title">Itinerary</h2>
        </div>
      </div>
      <div className="planner__content">
        {dailyAttractions.map((attractionByDay, index) => (
          <div key={index} className="planner__byday">
            <h3
              className={`planner__day-index ${
                attractionByDay.attractions.length === 0 ? "planner__day-index--empty" : ""
              }`}
            >
              Day {attractionByDay.day}
            </h3>
            {attractionByDay.attractions.map((attraction) => (
              <div key={attraction.id} className="planner__attraction">
                <p className="planner__attraction-name">{attraction.attraction_name}</p>

                <p className="planner__duration">Suggested visit: {attraction.suggested_duration}</p>

                <p className="planner__notes">Notes: {attraction.user_notes}</p>
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
  );
}
