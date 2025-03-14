import "./PublicHoliday.scss";
import FormatDate from "../../utility/FormatDate";
import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";

export default function PublicHoliday({ itinerary }) {
  const [holiday,setHoliday] = useState(null);

  const baseUrlPH = import.meta.env.VITE_NAGER_DATE_API_URL;

  useEffect(()=> {
const fetchPublicHoliday = async () => {
  try {
    const response= await axios.get (baseUrlPH)
    setHoliday(response)
  }
}
  })

  return (
    <>
      <p> Public Holiday</p>


    </>
  );
}
