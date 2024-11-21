import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Button } from "@mui/material";
import Chart from "chart.js/auto";
import api from "../api.js";

const StackBars = ({ subscriptionsData, selectedFilters }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAWS, setShowAWS] = useState(true);
  const [showAzure, setShowAzure] = useState(true);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const hasFilters =
      selectedFilters &&
      (selectedFilters.subscriptions?.length > 0 ||
        selectedFilters.businessUnits?.length > 0 ||
        selectedFilters.locations?.length > 0 ||
        selectedFilters.applications?.length > 0 ||
        selectedFilters.projects?.length > 0 ||
        selectedFilters.environments?.length > 0);

    const fetchData = async () => {
      try {
        const inputData = hasFilters
          ? {
              Subscriptions: selectedFilters.subscriptions.map(
                (sub) => sub.value
              ),
              BusinessUnits:
                selectedFilters.businessUnits?.map((bu) => bu.value) || [],
              Locations:
                selectedFilters.locations?.map((loc) => loc.value) || [],
              Applications:
                selectedFilters.applications?.map((app) => app.value) || [],
              Projects:
                selectedFilters.projects?.map((proj) => proj.value) || [],
              Environments:
                selectedFilters.environments?.map((env) => env.value) || [],
            }
          : subscriptionsData;

        const subscriptionsData1 = await api.getBillingCostEachDay(inputData);
        console.log("API response:", subscriptionsData1);

        // Update state
        setSubscriptions(subscriptionsData1);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    // Trigger fetch if filters or subscription data are available
    if (hasFilters || (subscriptionsData && subscriptionsData.length > 0)) {
      fetchData();
    }
  }, [subscriptionsData, selectedFilters]);

  useEffect(() => {
    if (subscriptions.length === 0) return;

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    const awsData = {};
    const azureData = {};

    subscriptions.forEach(({ dailydate, totalcost }) => {
      const date = new Date(dailydate).toISOString().split("T")[0];

      if (!awsData[date]) {
        awsData[date] = Math.random() * 10000; // Random data for AWS
      }
      if (!azureData[date]) {
        azureData[date] = 0;
      }
      azureData[date] += totalcost;
    });

    const sortedDates = Object.keys(azureData).sort();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedDates,
        datasets: [
          {
            label: "AWS",
            data: sortedDates.map((date) => awsData[date].toFixed(2)),
            backgroundColor: "rgba(255, 153, 10, 0.7)",
            stack: "01",
            hidden: !showAWS, // Hide AWS data if showAWS is false
          },
          {
            label: "Azure",
            data: sortedDates.map((date) => azureData[date].toFixed(2)),
            backgroundColor: "rgba(10, 163, 225, 0.7)",
            stack: "01",
            hidden: !showAzure, // Hide Azure data if showAzure is false
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback: function (value) {
                const date = new Date(this.getLabelForValue(value));
                const midMonthDay =
                  new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  ).getDate() / 2;
                if (date.getDate() === Math.ceil(midMonthDay)) {
                  return date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                }
                return "";
              },
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          y: {
            stacked: true,
            grid: {
              display: true,
            },
            ticks: {
              stepSize: 6000,
              max: 6000,
              color: "rgba(0, 0, 0, 0.5)",
              padding: 3,
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide default legend to use custom toggle buttons
          },
        },
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [subscriptions, showAWS, showAzure]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* <Typography variant="h6" align="center" sx={{ color: "#5f249f", mb: 2 }}>
      Total Bill Cost by Providers
    </Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: showAWS
              ? "rgba(255, 153, 10, 0.7)"
              : "rgba(200, 200, 200, 0.7)",
            color: showAWS ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: showAWS
                ? "rgba(255, 153, 10, 1)"
                : "rgba(180, 180, 180, 0.7)",
            },
            fontSize: "12px",
            height: "20px",
          }}
          onClick={() => {
            setShowAWS((prev) => {
              const newState = !prev;
              setShowAzure(newState ? showAzure : true); // Ensure Azure remains visible when AWS is toggled
              return newState;
            });
          }}
        >
          AWS
        </Button>
        <Button
          variant="contained"
          sx={{
            ml: 1,
            backgroundColor: showAzure
              ? "rgba(10, 163, 225, 0.7)"
              : "rgba(200, 200, 200, 0.7)",
            color: showAzure ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: showAzure
                ? "rgba(10, 163, 225, 1)"
                : "rgba(180, 180, 180, 0.7)",
            },
            fontSize: "12px",
            height: "20px",
          }}
          onClick={() => {
            setShowAzure((prev) => {
              const newState = !prev;
              setShowAWS(newState ? showAWS : true); // Ensure AWS remains visible when Azure is toggled
              return newState;
            });
          }}
        >
          Azure
        </Button>
      </Box>
      <canvas ref={chartContainer} style={{ flexGrow: 1 }}></canvas>
    </Box>
  );
};

export default StackBars;
