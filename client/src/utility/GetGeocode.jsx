import axios from "axios";

const GetGeocode = async (location) => {
  const baseUrl = import.meta.env.VITE_API_URL_GEOCODE;
  const apiKey = import.meta.env.VITE_API_KEY_GOOGLE;

  const encodedAddress = encodeURIComponent(location);
  const url = `${baseUrl}=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      return data.results[0].geometry.location;
    } else {
      console.error("Geocoding error:", data.status);
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
  }
};

export default GetGeocode;
