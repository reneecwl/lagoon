import "./ItineraryMap.scss";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GetGeocode from "../../utility/GetGeocode";
import CustomMapStyle from "../../utility/CustomMapStyle";

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
        styles: CustomMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      setMap(newMap);

      markerData.forEach((attraction) => {
        const marker = new google.maps.Marker({
          position: { lat: attraction.lat, lng: attraction.lng },
          map: newMap,
          title: attraction.name,
          label: attraction.day.toString(),
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
      if (!acc[marker.day]) {
        acc[marker.day] = [];
      }
      acc[marker.day].push(marker);
      return acc;
    }, {});

    Object.keys(markersByDay).forEach((day) => {
      const dayMarkers = markersByDay[day];
      if (dayMarkers.length < 2) return;

      const colors = [
        "rgba(66, 133, 244, 0.6)",
        "rgba(219, 68, 55, 0.6)",
        "rgba(244, 180, 0, 0.6)",
        "rgba(15, 157, 88, 0.6)",
        "rgba(171, 71, 188, 0.6)",
        "rgba(255, 112, 67, 0.6)",
        "rgba(0, 172, 193, 0.6)",
        "rgba(124, 179, 66, 0.6)",
        "rgba(63, 81, 181, 0.6)",
        "rgba(141, 110, 99, 0.6)",
      ];

      const path = dayMarkers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));

      const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: colors[day - 1],
        strokeOpacity: 0.9,
        strokeWeight: 4,
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
