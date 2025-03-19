import "./JourneyMap.scss";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";

export default function JourneyMap({ trips }) {
  const mapRef = useRef(null);
  const baseUrl = import.meta.env.VITE_API_URL_GEOCODE;
  const apiKey = import.meta.env.VITE_API_KEY_GOOGLE;

  const getGeocode = async (location) => {
    const encodedAddress = encodeURIComponent(location);
    const url = `${baseUrl}=${encodedAddress}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log("Latitude:", location.lat);
        console.log("Longitude:", location.lng);
        return location;
      } else {
        console.error("Geocoding error:", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  // console.log(getGeocode("london"));

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyATNBOh5c31viKT8ATAs-IufhVyT1PJzdk",
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 30, lng: 0 },
        zoom: 2,
      });

      const locations = [
        { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
        { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
        { name: "Aarhus, Denmark", lat: 56.1629, lng: 10.2039 },
        { name: "London, UK", lat: 51.5074, lng: -0.1278 },
      ];

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h4>${location.name}</h4>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, []);

  return (
    <div className="map">
      <h3 className="map__title">Map View of All Destinations</h3>
      <div className="map__journey" ref={mapRef} />
    </div>
  );
}
