// MapContainer.js
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";

const MapContainer = () => {
  const worldMap = "https://unpkg.com/world-atlas@1/world/110m.json";

  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      style={{
        width: "550px",
        height: "450px",
        position: "relative",
        borderRadius: "5px",
        overflow: "hidden",
        border: "1px solid #ccc",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          borderBottom: "2px  solid #98989893",
        }}
      >
        <div
          style={{
            color: "#5f249f",
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "sans-serif",
          }}
        >
          {" "}
          Resource Location
        </div>
        <div>
          <FormControl>
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{
                height: "24px",
                minWidth: "140px",
                backgroundColor: "rgb(95, 36, 159,0.9)",
                fontSize: "14px",
                color: "white",
              }}
            >
              <MenuItem value="Select an option">Select an option</MenuItem>
              <MenuItem value="AWS">AWS</MenuItem>
              <MenuItem value="Azure">Azure</MenuItem>
            </Select>
          </FormControl>
          {/* <select style={{ height:'25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)', fontSize: '14px', color: 'white' }} >
            <option value="AWS">AWS</option>
            <option value="Azure">Azure</option>
          </select> */}
        </div>
      </div>
      <div
        style={{
          width: "98%",
          height: "calc(100% - 40px)",
          position: "relative",
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Geographies geography={worldMap}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[77.209, 28.6139]}>
            <circle r={6} fill="#F00" />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              New Delhi
            </text>
          </Marker>
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapContainer;