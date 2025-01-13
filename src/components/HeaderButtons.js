import React, { useState, useEffect } from "react";
import "../css/HeaderButtons.scss";
import NewAzurelogo from "../images/azure-logo-svg.svg";
import Awslogo from "../images/aws logo1.png";
import componentUtil from "../componentUtil";
import api from "../api.js";

const HeaderButtons = ({ onButtonClick }) => {
  const [currentCSP, setCurrentCSP] = useState(componentUtil.getSelectedCSP());
  const [cloudProviders, setCloudProviders] = useState([]);

  const handleClick = (value) => {
    setCurrentCSP(value);
    onButtonClick(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getCloudProviderList();
        setCloudProviders(data);
      } catch (error) {
        console.error("Error fetching cloud providers:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="button-container">
      <div className="button-box">
        {cloudProviders.map((provider, index) => {
          const img = new Image();
          img.src = provider.logo_img;

          return (
            <button
              key={provider.csp_id}
              onClick={() => handleClick(index + 1)}
              className={`logo-button ${
                currentCSP === index ? "selected" : ""
              }`}
            >
              <img
                src={provider.logo_img}
                alt={`${provider.short_name} Logo`}
                style={{ height: "40px", width: "35px" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderButtons;
