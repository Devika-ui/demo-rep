import React, { useState, useEffect } from "react";
import "../css/HeaderButtons.scss";
import NewAzurelogo from "../images/azure-logo-svg.svg";
import Awslogo from "../images/aws logo1.png";
import componentUtil from "../componentUtil";

const HeaderButtons = ({ onButtonClick }) => {
  const [currentCSP, setCurrentCSP] =  useState(componentUtil.getSelectedCSP());


  const handleClick = (value) => {
    setCurrentCSP(value);
    onButtonClick(value);
  };

  return (
    <div className="button-container">
      <div className="button-box">
        <button
          id="cut-btn"
          onClick={() => handleClick(1)}
          className={`logo-button ${currentCSP === 1 ? "selected" : ""}`}
        >
          <img src={NewAzurelogo} alt="Azure Logo" />
        </button>

        <button
          id="paste-btn"
          onClick={() => handleClick(2)}
          className={`logo-button ${currentCSP === 2 ? "selected" : ""}`}
        >
          <img src={Awslogo} alt="AWS Logo" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;
