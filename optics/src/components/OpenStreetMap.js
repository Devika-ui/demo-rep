// OpenStreetMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const OpenStreetMap = ({ location, containerStyle }) => {
  const defaultPosition = [location.latitude, location.longitude];

  return (
    <div style={containerStyle}>
      <MapContainer center={defaultPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={defaultPosition}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OpenStreetMap;
