import "./deleteModal.scss";
import axios from "axios";

export default function DeleteModal({ deleteModal, attractionData, setDeleteModal, itineraryId, fetchItinerary }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  // console.log(attractionData);

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

  return (
    <div className="delete">
      <h3 className="delete__title">
        Are you sure you want to remove {attractionData.attraction_name} from your itinerary on Day {attractionData.day}
        ?{" "}
      </h3>
      <div className="delete__button-container">
        <button type="button" className="delete__buttons delete__button--cancel" onClick={() => setDeleteModal(false)}>
          Cancel
        </button>
        <button
          type="submit"
          className="delete__buttons delete__button--delete"
          onClick={() => handleDelete(attractionData)}
        >
          Yes please
        </button>
      </div>
    </div>
  );
}
