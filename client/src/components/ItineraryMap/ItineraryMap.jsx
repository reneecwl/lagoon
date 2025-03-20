import "./ItineraryMap.scss";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GetGeocode from "../../utility/GetGeocode";

export default function ItineraryMap({ attractions, location }) {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY_GOOGLE;
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchGeocodes = async () => {
      if (!attractions || attractions.length === 0) return;

      const markerData = [];

      const cityLocation = await GetGeocode(location);

      for (const attraction of attractions) {
        const coords = await GetGeocode(attraction.attraction_name);
        if (coords) {
          markerData.push({
            id: attraction.id,
            name: attraction.attraction_name,
            day: attraction.day,
            lat: coords.lat,
            lng: coords.lng,
          });
        }
      }

      setMarkers(markerData);

      if (cityLocation) {
        initMap(cityLocation, markerData);
      } else if (markerData.length > 0) {
        initMap({ lat: markerData[0].lat, lng: markerData[0].lng }, markerData);
      }
    };

    fetchGeocodes();
  }, [attractions, location]);

  const initMap = (center, markerData) => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      const newMap = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: 13,
      });

      setMap(newMap);

      markerData.forEach((attraction) => {
        const marker = new google.maps.Marker({
          position: { lat: attraction.lat, lng: attraction.lng },
          map: newMap,
          title: attraction.name,
          label: attraction.day.toString(), // Show the day number on the marker
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h4>Day ${attraction.day}: ${attraction.name}</h4>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(newMap, marker);
        });
      });

      // Draw route lines between attractions of the same day
      drawDailyRoutes(newMap, markerData);
    });
  };

  // Function to draw routes between attractions of the same day
  const drawDailyRoutes = (map, markerData) => {
    // Group markers by day
    const markersByDay = {};

    markerData.forEach((marker) => {
      if (!markersByDay[marker.day]) {
        markersByDay[marker.day] = [];
      }
      markersByDay[marker.day].push(marker);
    });

    // For each day, draw a route connecting the attractions in order
    Object.keys(markersByDay).forEach((day) => {
      const dayMarkers = markersByDay[day];
      if (dayMarkers.length < 2) return; // Need at least 2 points for a route

      // Define a unique color for each day
      const colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#F033FF",
        "#33FFF0",
        "#FFF033",
        "#FF33A8",
        "#A833FF",
        "#33FFA8",
        "#FF8C33",
      ];
      const colorIndex = (parseInt(day) - 1) % colors.length;

      // Create a polyline connecting attractions for this day
      const path = dayMarkers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));

      const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: colors[colorIndex],
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });

      polyline.setMap(map);
    });
  };

  return (
    <div className="itinerary-map">
      <div className="itinerary-map__container" ref={mapRef}></div>
    </div>
  );
}
