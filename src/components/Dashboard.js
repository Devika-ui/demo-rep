import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Header from "./Header.js";
import Subheader from "./SubHeader.js";
import MonthlySpendComponent from "./MonthlySpendComponent";
import MonthlyForecastComponent from "./MonthlyForecastComponent";
import TotalSubscriptionsComponent from "./TotalSubscriptionsComponent";
import StackBars from "./StackBars";
import DetailedCSPBars from "./DetailedCSPBars.js";
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
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [billingMonth, setBillingMonth] = useState([]);
  const [dates, setDates] = useState(null);
  const isButtonClicked = useRef(false);
  // Run only if button click hasn't occurred
  useEffect(() => {
    if (!isButtonClicked.current) {
      sessionStorage.removeItem("cspId");

      if (!sessionStorage.getItem("cspId")) {
        sessionStorage.setItem("overviewPage", true);
      }
      setSelectedProvider(componentUtil.getSelectedCSP());
    }
  }, []);

  /*Filter Changes*/
  let inputData = selectedFilters;

  // Function to update filters
  const handleFiltersChange = async (newFilters) => {
    setSelectedFilters(newFilters); // Update selected filters
  };

  const navigate = useNavigate();

  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  function getStartAndEndDates(billingMonth) {
    if (!billingMonth || billingMonth.length === 0) return null;
    billingMonth.sort((a, b) => new Date(a) - new Date(b));

    let startDate = billingMonth[0].substring(0, 7) + "-01";

    let lastDate = new Date(billingMonth[billingMonth.length - 1]);
    let year = lastDate.getFullYear();
    let month = lastDate.getMonth() + 1;

    let lastDay = new Date(year, month, 0).getDate();
    let endDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay}`;

    return { startDate, endDate };
  }

  // console.log(getStartAndEndDates(billingMonth));

  useEffect(() => {
    if (billingMonth?.length > 0) {
      setDates(getStartAndEndDates(billingMonth));
    }
  }, [billingMonth]);

  const startDate = dates?.startDate;
  const endDate = dates?.endDate;

  //console.log("billingmonth", billingMonth);

  const handleButtonClick = async (value) => {
    setSelectedProvider(value);
    setShowStackBars(value !== 100);
    await componentUtil.setSelectedCSP(value);
  };

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
        onFiltersChange={handleFiltersChange}
        selectedCSP={selectedProvider}
        onMonthChange={handleMonthChange}
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
              selectedProvider={selectedProvider}
              inputData={inputData}
              billingMonth={billingMonth}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MonthlyForecastComponent
              selectedCSP={selectedProvider}
              inputData={inputData}
              billingMonth={billingMonth}
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
                    {selectedProvider === 0
                      ? "Total Bill Cost by Providers"
                      : selectedProvider === 110
                      ? "AWS Total Bill Cost"
                      : "Azure Total Bill Cost"}
                  </strong>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  {selectedProvider === 0 ? (
                    <StackBars
                      inputData={inputData}
                      selectedCSP={selectedProvider}
                      billingMonth={billingMonth}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  ) : (
                    <DetailedCSPBars
                      inputData={inputData}
                      selectedCSP={selectedProvider}
                      billingMonth={billingMonth}
                      startDate={startDate}
                      endDate={endDate}
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
                <RecommendationsComponent
                  selectedCSP={selectedProvider}
                  billingMonth={billingMonth}
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
              <KPISection
                selectedCSP={selectedProvider}
                inputData={inputData}
                billingMonth={billingMonth}
                startDate={startDate}
                endDate={endDate}
              />
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
                <ConsumptionHighlights
                  selectedCSP={selectedProvider}
                  inputData={inputData}
                  billingMonth={billingMonth}
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
                <MapContainer
                  selectedCSP={selectedProvider}
                  inputData={inputData}
                  billingMonth={billingMonth}
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
                <OverallTotalRealizedSavings
                  selectedCSP={selectedProvider}
                  inputData={inputData}
                  billingMonth={billingMonth}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
