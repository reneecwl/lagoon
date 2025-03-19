import "./deleteModal.scss";
import axios from "axios";

export default function DeleteModal({ attractionData, setDeleteModal, itineraryId, fetchItinerary }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  console.log(attractionData);

  const handleDelete = async (attractionData) => {
    try {
      await axios.delete(`${baseUrl}/itineraries/${itineraryId}`, {
        data: {
          attraction_id: attractionData.id,
        },
      });
      setDeleteModal(false);
      fetchItinerary();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setDeleteModal(false);
    }
  };

  return (
    <div className="delete" onClick={handleBackdropClick}>
      <div className="delete__content">
        <h3 className="delete__title">
          Remove {attractionData.attraction_name} from Day {attractionData.day}?{" "}
        </h3>
        <div className="delete__button-container">
          <button
            type="button"
            className="delete__buttons delete__button--cancel"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="delete__buttons delete__button--delete"
            onClick={() => handleDelete(attractionData)}
          >
            Yes, remove it
          </button>
        </div>
      </div>
    </div>
  );
}
