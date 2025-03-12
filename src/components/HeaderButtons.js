import React, { useState, useEffect } from "react";
import "../css/HeaderButtons.scss";
import NewAzurelogo from "../images/azure-logo-svg.svg";
import Awslogo from "../images/aws logo1.png";
import componentUtil from "../componentUtil";
import api from "../api.js";

const HeaderButtons = ({ onButtonClick, removeAwsIcon }) => {
  const [currentCSP, setCurrentCSP] = useState(null);
  const [cloudProviders, setCloudProviders] = useState([]);

  const handleClick = (value) => {
    setCurrentCSP(value);
    onButtonClick(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getCloudProviderList();
        const selectedCSP = componentUtil.getSelectedCSP();
        setCurrentCSP(selectedCSP);
        setCloudProviders(data);
      } catch (error) {
        console.error("Error fetching cloud providers:", error);
      }
    };
    fetchData();
  }, []);

  // return (
  //   <div className="button-container">
  //     <div className="button-box">
  //       {cloudProviders.map((provider) => {
  //         return (
  //           <button
  //             key={provider.csp_id}
  //             onClick={() => handleClick(provider.csp_id)}
  //             className={`logo-button ${
  //               currentCSP === provider.csp_id ? "selected" : ""
  //             }`}
  //           >
  //             <img
  //               src={provider.logo_img}
  //               alt={`${provider.short_name} Logo`}
  //               style={{ height: "40px", width: "35px" }}
  //             />
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="button-container">
      <div className="button-box">
        {cloudProviders
          .filter((provider) => !(removeAwsIcon && provider.csp_id === 110)) // Exclude AWS if removeAwsIcon is true
          .map((provider) => (
            <button
              key={provider.csp_id}
              onClick={() => handleClick(provider.csp_id)}
              className={`logo-button ${
                currentCSP === provider.csp_id ? "selected" : ""
              }`}
              style={removeAwsIcon ? { marginRight: "55px" } : {}}
            >
              <img
                src={provider.logo_img}
                alt={`${provider.short_name} Logo`}
                style={{ height: "40px", width: "35px" }}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default HeaderButtons;
