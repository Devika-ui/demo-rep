import React, { useEffect, useState } from "react";
import "../css/RecommendationsComponent.scss";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";
import api from "../api.js";
import ArrowDropDownIcon from "@mui/icons-material//ArrowDropDown";

const RecommendationsComponent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRecommendations();
        setRecommendations(response);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  const totalSavings = recommendations
    .reduce((total, rec) => total + rec.value, 0)
    .toFixed(2);

  return (
    <div style={{ marginTop: "-5px" }}>
      <div className="title1">
        <strong
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            color: " #5f249f",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "79px",
          }}
        >
          Top 3 Recommendations
        </strong>
      </div>
      <div
        className="recommendations-container"
        style={{ width: "340px ", height: "195px", marginTop: "0px" }} // Adjust marginTop for spacing
      >
        <div className="top-part"></div>
        <div
          className="subheading"
          style={{ fontSize: "15px", fontWeight: "bold" }}
        >
          {/* <div className="subheading" > */}
          Show Recommendations by
          <br />
          {/*<FormControl style={{ paddingTop: '5px' }}>
          <Select 
            value={selectedOption} 
            onChange={handleOptionChange}
            style={{ height:'25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)', fontSize: '14px', color: 'white' }} 
            IconComponent={ArrowDropDownIcon}
          >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Azure">Azure</MenuItem>
          </Select>
        </FormControl>*/}
        </div>
        {recommendations.slice(0, 3).map((rec, index) => (
          <div key={index} className="tile1">
            <div>
              <div className="titlename">{rec.name}</div>
            </div>
            <div className="content">
              <div className="price">${rec.value.toFixed(2)}</div>
              <div className="savings">Savings Potential</div>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "8px",
            fontSize: "15px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              color: "#5f249f",
              fontWeight: "bold",
              marginRight: "70px",
            }}
          >
            Total Savings Potential
          </div>
          <div
            style={{ display: "inline-block", float: "right" }}
            className="price"
          >
            ${totalSavings}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsComponent;
