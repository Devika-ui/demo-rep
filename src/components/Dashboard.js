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

  // const [filterValue, setFilterValue] = useState('');

  // const handleFilterChange = (value) => {
  //   // Update the filter value
  //   setFilterValue(value);
  // };

  const location = {
    latitude: 37.7749, // Example latitude
    longitude: -122.4194, // Example longitude
  };

  const mapContainerStyle = {
    width: "25%",
    height: "400px", // Adjust the height as needed
  };

  const additionalDivStyle = {
    width: "744px",
    height: "405px",
    backgroundColor: "white",
    marginLeft: "35px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
          display: "flex", // Make the container a flex container
          alignItems: "flex-start", // Align items at the start of the flex container
          flexWrap: "wrap", // Allow wrapping of elements
        }}
      >
        {/* <CustomFilter/> */}
        {/* <OpenStreetMap location={location} containerStyle={mapContainerStyle} />  */}
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
        {/* <MonthlySpendComponent />
        <MonthlyForecastComponent />
        <TotalSubscriptionsComponent style={{ flex: '1' }} /> */}
        <div style={{ ...additionalDivStyle, marginRight: "9px" }}>
          {showStackBars ? <StackBars /> : <AzureBars />}
          {/* <StackBars /> */}
        </div>
        <RecommendationsComponent />
        <div
          style={{
            display: "flex",
            gap: "9px",
            width: "100%",
            justifyContent: "left",
            alignItems: "center",
            paddingTop: "7px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              additionalDivStyleKpi,
              marginLeft: "35px",
            }}
          >
            <KPISection />
          </div>
          <ConsumptionHighlights />
        </div>
        <div
          style={{
            marginLeft: "33px",
            marginTop: "-20px",
            display: "flex",
            gap: "10px",
            width: "100%",
            justifyContent: "left",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <MapContainer />
          <OverallTotalRealizedSavings />
        </div>
        {/* <MapContainer />
          <OverallTotalRealizedSavings /> */}
        {/* <div style={{ display: 'flex', gap: '9px', width: '100%', justifyContent: 'left', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={{ additionalDivStyleKpi, marginLeft:'32px' }}>
          <KPISection />
        </div>
        <ConsumptionHighlights />
        </div> */}

        {/* <div>
          <h2>Total Subscriptions/Accounts</h2>
          <ul>
            {subscriptions.map((subscription) => (
              <li key={subscription.id}>{subscription.displayName}</li>
            ))}
          </ul>
        </div> */}

        {/* <Button
          style={{ margin: '10px' }}
          variant='contained'
          onClick={handleLogoout}
        >
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default Dashboard;
