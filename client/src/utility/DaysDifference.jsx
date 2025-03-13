const DaysDifference = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const differenceInTime = date2.getTime() - date1.getTime();
  return Math.round(differenceInTime / (1000 * 3600 * 24));
};

export default DaysDifference;
