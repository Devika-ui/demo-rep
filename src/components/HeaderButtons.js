import React, { useState } from "react";
import "../css/HeaderButtons.scss";
import NewAzurelogo from "../images/azure-logo-svg.svg";
import Awslogo from "../images/aws logo1.png";

const HeaderButtons = ({ onButtonClick }) => {
  const [previousState, setPreviousState] = useState(null);
  const [currentState, setCurrentState] = useState(null);

  const handleClick = (value) => {
    if (currentState === value) {
      // Reverting to previous state
      setCurrentState(previousState);
      onButtonClick(previousState);
    } else {
      // Saving the current state and setting the new state
      setPreviousState(currentState);
      setCurrentState(value);
      onButtonClick(value);
    }
  };

  return (
    <div className="button-container">
      <div className="button-box">
        <button
          id="cut-btn"
          onClick={() => handleClick("Azure")}
          className="logo-button"
        >
          <img src={NewAzurelogo} alt="Azure Logo" />
        </button>

        <button
          id="paste-btn"
          onClick={() => handleClick("AWS")}
          className="logo-button"
        >
          <img src={Awslogo} alt="AWS Logo" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;
