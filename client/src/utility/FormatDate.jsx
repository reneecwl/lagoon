import { format } from "date-fns";

export default function FormatDate(dateString) {
  return format(new Date(dateString), "yyyy/MM/dd");
}
