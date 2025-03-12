import "./HomePage.scss";
import CreateNewItinerary from "../../components/CreateNewItinerary/CreateNewItinerary";

export default function HomePage({ createItinerary, setCreateItinerary }) {
  return (
    <>
      {!createItinerary && (
        <div>
          <h3 className="homepage__title">Time for your next adventure?</h3>
          <button onClick={() => setCreateItinerary(true)}>Let's Wander</button>
        </div>
      )}
      {createItinerary && <CreateNewItinerary />}
    </>
  );
}
