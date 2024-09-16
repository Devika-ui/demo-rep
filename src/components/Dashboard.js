import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Header from "./Header.js";
import Subheader from "./SubHeader.js";
import StackBars from "./StackBars";
import MonthlySpendComponent from "./MonthlySpendComponent.js";
import MonthlyForecastComponent from "./MonthlyForecastComponent.js";
import TotalSubscriptionsComponent from "./TotalSubscriptionsComponent.js";
import RecommendationsComponent from "./RecommendationsComponent.js";
import NavigationBar from "./NavigationBar.js";
import MapContainer from "./MapContainer.js";
import OverallTotalRealizedSavings from "./OverallTotalRealizedSavings.js";
import KPISection from "./KPISection.js";
import ConsumptionHighlights from "./ConsumptionHighlights.js";
import CustomFilter from "./CustomFilter.js";
import AzureBars from "./AzureBars.js";
import TotalAzureSubscriptions from "./TotalAzureSubscriptions.js";
import MonthlySpendAWSComponent from "./MonthlySpendAWS.js";
import MonthlyForecastAWSComponent from "./MonthlyForecastAWS.js";
import "../css/components/dashboard.css";

const Dashboard = () => {
  const [showStackBars, setShowStackBars] = useState(true);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

  const location = {
    latitude: 37.7749, // Example latitude
    longitude: -122.4194, // Example longitude
  };

  const mapContainerStyle = {
    width: "25%",
    height: "400px", // Adjust the height as needed
  };

  const additionalDivStyle = {
    width: "400px",
    height: "220px",
    backgroundColor: "white",
    marginLeft: "35px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const additionalDivStyleKpi = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  };

  const Navigate = useNavigate();

  const handleLogoout = () => {};

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <Subheader title="Overview" />
      <NavigationBar />
      <div
        className="Dashboard"
        style={{
          marginLeft: "37px",
          padding: "2px",
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {!showStackBars ? (
          <>
            <MonthlySpendComponent />
            <MonthlyForecastComponent />
            <TotalSubscriptionsComponent style={{ flex: "1" }} />
          </>
        ) : (
          <>
            <MonthlySpendComponent />
            <MonthlyForecastComponent />
            <TotalSubscriptionsComponent style={{ flex: "1" }} />
          </>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
            margintop: "5px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div className="heading" style={{ marginBottom: "-15px" }}>
              <strong
                style={{
                  fontFamily: "sans-serif",
                  color: "#5f249f",
                  paddingBottom: "20px",
                }}
              >
                {showStackBars
                  ? "Total Bill Cost by Providers"
                  : "Azure Total Bill Cost"}
              </strong>
            </div>
            <div style={{ ...additionalDivStyle, marginRight: "9px" }}>
              {showStackBars ? <StackBars /> : <AzureBars />}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <RecommendationsComponent />
          </div>

          <div style={{ flex: 1, marginLeft: "5px" }}>
            <KPISection />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "left",
            alignItems: "center",
            paddingTop: "2px",
            paddingBottom: "5px",
            gap: "10px", // Add gap between elements
          }}
        >
          <ConsumptionHighlights style={{ flex: "1" }} />
          <MapContainer style={{ flex: "1" }} />
          <OverallTotalRealizedSavings style={{ flex: "1"  }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;