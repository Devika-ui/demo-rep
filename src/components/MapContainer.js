import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fallbackMarkerIcon from "../images/location.png";
import "../css/MapContainer.scss";
import api from "../api.js";
import { CircularProgress } from "@mui/material";

const MapContainer = ({ selectedCSP, inputData }) => {
  const mapRef = useRef(null);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapLocations = async () => {
      setLoading(true);
      try {
        const data = await api.getMapData(inputData);

        setMapData(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMapLocations();
  }, [selectedCSP, inputData]);

  useEffect(() => {
    if (!mapRef.current || !mapData.length) return;

    const map = L.map(mapRef.current, {
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

    const markers = mapData
      .filter((location) => location.LT && location.LN)
      .map((location) =>
        L.marker([parseFloat(location.LT), parseFloat(location.LN)], {
          icon: L.icon({
            iconUrl: fallbackMarkerIcon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        }).bindPopup(location.locations)
      );

    const markerGroup = L.featureGroup(markers).addTo(map);

    if (markers.length > 0) {
      map.fitBounds(markerGroup.getBounds(), { padding: [50, 50] });
    } else {
      map.setView([28.6139, 77.209], 11); // Default view if no markers
    }

    return () => {
      map.remove();
    };
  }, [mapData, inputData, selectedCSP]);

  return (
    <div className="map-container">
      <div className="map-heading">
        <strong>Resource Location</strong>
      </div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="map-content" ref={mapRef}></div>
      )}
    </div>
  );
};

export default MapContainer;
