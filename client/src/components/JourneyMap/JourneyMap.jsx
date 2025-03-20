import "./JourneyMap.scss";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GetGeocode from "../../utility/GetGeocode";
import CustomMapStyle from "../../utility/CustomMapStyle";

export default function JourneyMap({ trips }) {
  const mapRef = useRef(null);
  const baseUrl = import.meta.env.VITE_API_URL_GEOCODE;
  const apiKey = import.meta.env.VITE_API_KEY_GOOGLE;
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchGeocodes = async () => {
      const markerData = [];

      for (const trip of trips) {
        const location = await GetGeocode(trip.location);
        if (location) {
          markerData.push({
            name: trip.location,
            lat: location.lat,
            lng: location.lng,
          });
        }
      }
      setMarkers(markerData);
    };
    fetchGeocodes();
  }, [trips]);

  useEffect(() => {
    if (markers.length === 0) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 30, lng: 0 },
        zoom: 2,
        styles: CustomMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      markers.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          // icon: markerIcon,
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h4>${location.name}</h4>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, [markers]);

  return (
    <div className="map">
      <h3 className="map__title">Map View of All Destinations</h3>
      <div className="map__journey" ref={mapRef} />
    </div>
  );
}
