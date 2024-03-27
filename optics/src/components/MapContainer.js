import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map', {
      center: [0, 0],
      zoom: 2,
      maxBounds: [[-90, -180], [90, 180]], // Prevent panning beyond the world bounds
      minZoom: 2 // Set the minimum zoom level to prevent repeating tiles
    });

    // Add the base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for New Delhi
    L.marker([28.6139, 77.209]).addTo(map)
      .bindPopup('New Delhi');

    // Clean up when component unmounts
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div style={{ width: '450px', height: '450px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>Resource Location</div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <select>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div id="map" style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
    </div>
  );
};

export default MapContainer;