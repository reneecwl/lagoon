import "./UserStatistics.scss";
import DaysCount from "../../utility/DaysCount";

export default function UserStatistics({ trips, tripStatus }) {
  // const upcomingTrip = trips.find((trip) => tripStatus(trip.start_date, trip.end_date) === "Upcoming");

  const getClosestUpcomingTrip = () => {
    const now = new Date();

    const upcomingTrips = trips
      .filter((trip) => {
        const startDate = new Date(trip.start_date);
        return startDate > now && tripStatus(trip.start_date, trip.end_date) === "Upcoming";
      })
      .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    return upcomingTrips.length > 0 ? upcomingTrips[0] : null;
  };

  // console.log(getClosestUpcomingTrip());

  const closestUpcomingTrip = getClosestUpcomingTrip();

  const countDown = closestUpcomingTrip ? DaysCount(new Date(), new Date(closestUpcomingTrip.start_date)) : null;
  const upcomingNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Upcoming").length;
  const completedNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Completed").length;

  return (
    <div className="user__statistics">
      <div className="statistics__left">
        <h3 className="statistics__title">Trip Statistics</h3>
        <div className="statistics__trips-count">
          <div className="statistics__trip--upcoming">{upcomingNum} Upcoming Trips</div>
          <div className="statistics__trip--completed">{completedNum} Completed Trip</div>
        </div>
      </div>
      <div className="statistics__right">
        {countDown && (
          <div className="statistics__countdown">
            Next Trip: {closestUpcomingTrip.location} in {countDown} days
          </div>
        )}
      </div>
    </div>
  );
}
