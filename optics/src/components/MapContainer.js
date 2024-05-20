
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fallbackMarkerIcon from "../images/location.png";
import api from "../api.js";

const MapContainer = () => {
  const mapRef = useRef(null);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const fetchMapLocations = async () => {
      const data = await api.getMapData();
      setMapData(data);
    };

    fetchMapLocations();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapData.length) return;

    const map = L.map(mapRef.current, {
      center: [28.6139, 77.209],
      zoom: 11, 
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

    mapData.forEach(location => {
      if (location.LT && location.LN) {
        L.marker([parseFloat(location.LT), parseFloat(location.LN)], {
          icon: L.icon({
            iconUrl: fallbackMarkerIcon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        })
          .addTo(map)
          .bindPopup(location.locations);
      }
    });

    return () => {
      map.remove();
    };
  }, [mapData]);

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
          paddingLeft: "20px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          width: "535px",
          borderRadius: "5px",
        }}
      >
        Resource Location
      </h2>
      <div
        id="map-container"
        style={{
          width: "554px",
          height: "399px",
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
          border: "1px solid #ccc",
          margin: "0 auto",
          marginBottom: "-1px",
        }}
        ref={mapRef}
      ></div>
    </div>
  );
};

export default MapContainer;
