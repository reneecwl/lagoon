import { format } from "date-fns";

export default function FormatDate(date) {
  const date = new Date("Thu Mar 13 2025 00:00:00 GMT-0400 (Eastern Daylight Time)");
  const formattedDate = format(date, "yyyy/MM/dd");
}
