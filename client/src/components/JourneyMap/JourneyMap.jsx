import "./JourneyMap.scss";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GetGeocode from "../../utility/GetGeocode";
import CustomMapStyle from "../../utility/CustomMapStyle";

export default function JourneyMap({ trips, tripStatus }) {
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
            status: tripStatus(trip.start_date, trip.end_date),
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

      const bounds = new google.maps.LatLngBounds();

      markers.forEach((location) => {
        const pinSVGFilled =
          "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";

        const pinColor = location.status === "Completed" ? "#E63946" : "#FFB347";

        const markerImage = {
          path: pinSVGFilled,
          anchor: new google.maps.Point(12, 22),
          fillOpacity: 1,
          fillColor: pinColor,
          strokeWeight: 2,
          strokeColor: "white",
          scale: 1.5,
          labelOrigin: new google.maps.Point(12, 9),
        };

        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: markerImage,
          animation: google.maps.Animation.DROP,
        });

        // Extend bounds to include this marker
        // bounds.extend(marker.getPosition());

        // Enhanced info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; text-align: center; min-width: 120px;">
              <h3 style="margin: 0; font-size: 16px; color: #333;">${location.name}</h3>
               <p style="margin: 5px 0 0; font-size: 12px; font-style: italic; color: #666;">
                ${location.status}
               </p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      // Set minimum zoom to prevent excessive zoom on single markers
      const listener = google.maps.event.addListener(map, "idle", () => {
        // if (map.getZoom() > 10) {
        //   map.setZoom(10);
        // }
        google.maps.event.removeListener(listener);
      });
    });
  }, [markers]);
  return (
    <div className="user__map-container">
      <div className="map">
        <div className="map__header">
          <div>
            <h3 className="map__title">Your Travel Map</h3>
            <p className="map__subtitle">Every destination you've visited</p>
          </div>
          <div className="map__legend">
            <span className="map__legend-item map__legend-item--upcoming">Upcoming</span>
            <span className="map__legend-item map__legend-item--completed">Completed</span>
          </div>
        </div>
        <div className="map__journey" ref={mapRef} />
      </div>
    </div>
  );
}
