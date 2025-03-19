import "./UserStatistics.scss";

import DaysCount from "../../utility/DaysCount";

export default function UserStatistics({ trips, tripStatus }) {
  const upcomingTrip = trips.find((trip) => tripStatus(trip.start_date, trip.end_date) === "Upcoming");
  // console.log(upcomingTrip);
  const countDown = DaysCount(new Date(), new Date(upcomingTrip.start_date));
  const upcomingNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Upcoming").length;
  const completedNum = trips.filter((trip) => tripStatus(trip.start_date, trip.end_date) === "Completed").length;

  <div className="user__statistics">
    <div className="statistics__left">
      <h3 className="statistics__title">Trip Statistics</h3>
      <div className="statistics__trips-count">
        <div className="statistics__trip--upcoming">{upcomingNum} Upcoming Trips</div>
        <div className="statistics__trip--completed">{completedNum} Completed Trip</div>
      </div>
    </div>
    <div className="statistics__right">
      <div className="statistics__countdown">
        Next Trip: {upcomingTrip.location} in {countDown} days
      </div>
    </div>
  </div>;
}
