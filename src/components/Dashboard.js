import React, { useState, useEffect } from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Header from "./Header.js";
import Subheader from "./SubHeader.js";
import MonthlySpendComponent from "./MonthlySpendComponent";
import MonthlyForecastComponent from "./MonthlyForecastComponent";
import TotalSubscriptionsComponent from "./TotalSubscriptionsComponent";
import StackBars from "./StackBars";
import AzureBars from "./AzureBars";
import NavigationBar from "./NavigationBar.js";
import RecommendationsComponent from "./RecommendationsComponent";
import KPISection from "./KPISection";
import ConsumptionHighlights from "./ConsumptionHighlights";
import MapContainer from "./MapContainer";
import OverallTotalRealizedSavings from "./OverallTotalRealizedSavings";
import api from "../api.js";
import componentUtil from "../componentUtil.js";

const Dashboard = () => {
  const [showStackBars, setShowStackBars] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(1);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    subscriptions: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  });

  /*Filter Changes*/
  let inputData = [];
  const invokeInputData = async() => {
    inputData =  await componentUtil.populateFilterData(selectedFilters,subscriptionsData);
  };
  invokeInputData();
  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };

  const handleSubscriptionsFetch = (data) => {
    setSubscriptionsData(data);
  };
  

  // Function to update filters
  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters); // Update selected filters
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures it takes full screen height
        paddingX: 9.5,
        paddingRight: "10px",
        maxWidth: "100%",
      }}
    >
      <Header />
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "#5f249f",
          marginTop: "-1rem", // Adjust this as needed
          fontWeight: "bold",
        }}
      >
        Overview
      </Typography>
      <Subheader
        onButtonClick={handleButtonClick}
        onSubscriptionsFetch={handleSubscriptionsFetch}
        onFiltersChange={handleFiltersChange}
      />
      <NavigationBar />

      {/* This is the main content area which should take the remaining height */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* First Row: Monthly Spend, Forecast, Subscriptions */}
          <Grid item xs={12} sm={6} md={4}>
            <MonthlySpendComponent
              selectedProvider={selectedProvider} inputData={inputData}
            />
          </Grid>
 
          <Grid item xs={12} sm={6} md={4}>
            <MonthlyForecastComponent selectedCSP={selectedProvider} inputData={inputData}
            />
          </Grid>
 
          <Grid item xs={12} sm={6} md={4}>
            <TotalSubscriptionsComponent selectedCSP={selectedProvider} />
          </Grid>
 
          {/* Second Row: StackBars (or AzureBars), Recommendations, KPI */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "-10px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-1rem", // Adjust this value to move the heading up or down
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    color: "#5f249f",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <strong>
                    {showStackBars
                      ? "Total Bill Cost by Providers"
                      : "Azure Total Bill Cost"}
                  </strong>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  {showStackBars ? (
                    <StackBars
                      inputData={inputData} selectedCSP={selectedProvider}
                    />
                  ) : (
                    <AzureBars
                      inputData={inputData} selectedCSP={selectedProvider}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                height: "30vh",
                display: "flex",
                flexDirection: "column",
                marginTop: "-10px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <RecommendationsComponent selectedCSP={selectedProvider}
               />
            </Paper>
          </Grid>

          <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ position: "relative", top: "-10px" }}
            >
              {/* <Paper sx={{ p: 2, height: '30vh', display: 'flex', flexDirection: 'column' }}> */}
              <KPISection selectedCSP={selectedProvider} inputData={inputData}/>
              {/* </Paper> */}
            </Grid>

        {/* Third Row */}
        <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <ConsumptionHighlights selectedCSP={selectedProvider} inputData={inputData} />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MapContainer
                  subscriptionsData={subscriptionsData}
                  selectedFilters={selectedFilters}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <OverallTotalRealizedSavings selectedCSP = {selectedProvider} inputData= {inputData}/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;