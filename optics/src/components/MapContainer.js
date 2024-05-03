import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fallbackMarkerIcon from "../images/location.png";

const MapContainer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [28.6139, 77.209], // Delhi coordinates
      zoom: 11, // Decreased initial zoom level
      layers: [
        L.tileLayer(
          "https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=h45ALe3FWSTc6f08j9daEyl98fINF4L8",
          {
            attribution:
              '&copy; <a href="https://www.tomtom.com/">TomTom</a> contributors',
          }
        ),
      ],
    });

    // Add marker for Delhi using fallback marker icon
    L.marker([28.6139, 77.209], {
      icon: L.icon({
        iconUrl: fallbackMarkerIcon,
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      })
    }).addTo(map).bindPopup("Delhi");

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h2
        style={{
          textAlign: "left",
          backgroundColor: "white",
          color: "rgb(95, 36, 159)",
          fontFamily: "sans-serif",
          fontSize: "16px",
          borderBottom: "2px solid rgba(152, 152, 152, 0.576)",
          margin: "0",
          padding: "10px 0",
          paddingLeft: "20px", // Added padding-left
          height: "32px", // Set height to 50px
          display: "flex", // Display as flex
          alignItems: "center", // Center vertically
          width: "535px", // Set width to match map container
          borderRadius: "5px"
        }}
      >
        Resource Location
      </h2>
      <div
        id="map-container"
        style={{
          width: "554px", // Adjusted width
          height: "399px", // Adjusted height to fit with heading
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
          border: "1px solid #ccc",
          margin: "0 auto", // Center the map container
          marginBottom: "-1px", // Remove extra space below the map container
        }}
        ref={mapRef}
      ></div>
    </div>
  );
};

export default MapContainer;