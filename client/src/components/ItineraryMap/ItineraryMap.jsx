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
             <div className="map__info-box">
              <h4 className="map__info">Day ${attraction.day}: ${attraction.name}</h4>
             </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(newMap, marker);
        });
      });

      drawDailyRoutes(newMap, markerData);
    });
  };

  const drawDailyRoutes = (map, markerData) => {
    const markersByDay = markerData.reduce((acc, marker) => {
      // console.log("Current marker:", marker);
      // console.log("Accumulator so far:", acc);
      if (!acc[marker.day]) {
        acc[marker.day] = [];
      }
      acc[marker.day].push(marker);
      // console.log(acc);
      return acc;
    }, {});

    Object.keys(markersByDay).forEach((day) => {
      const dayMarkers = markersByDay[day];
      if (dayMarkers.length < 2) return;

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

      const path = dayMarkers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));

      const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: colors[day - 1],
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
