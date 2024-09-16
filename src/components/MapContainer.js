import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fallbackMarkerIcon from "../images/location.png";
import "../css/MapContainer.scss";
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
  }, [mapData]);

  return (
    <div className="container" >
      <div className="map-heading">
        <strong>Resource Location</strong>
      </div>
      <div className="map-container" ref={mapRef}></div>
    </div>
  );
};

export default MapContainer;