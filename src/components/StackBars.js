import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import api from "../api.js";
import componentUtil from "../componentUtil.js";

const StackBars = ({
  inputData,
  selectedCSP,
  billingMonth,
  startDate,
  endDate,
}) => {
  const [subscriptions, setSubscriptions] = useState({ Azure: [], AWS: [] });
  const [showAWS, setShowAWS] = useState(true);
  const [showAzure, setShowAzure] = useState(true);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        const subscriptionsData = await api.getBillingCostEachDay(
          inputData,
          startDate,
          endDate
        );
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const currencyPreference = await componentUtil.getCurrencyPreference();
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);

        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCSP, inputData, startDate, endDate]);

  useEffect(() => {
    if (!subscriptions.Azure.length && !subscriptions.AWS.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    const awsData = {};
    const azureData = {};

    // Helper function to aggregate costs by date
    const aggregateCosts = (data, targetObj) => {
      data.forEach(({ dailydate, totalcost }) => {
        const date = new Date(dailydate).toISOString().split("T")[0];
        targetObj[date] = (targetObj[date] || 0) + totalcost;
      });
    };

    aggregateCosts(subscriptions.AWS, awsData);
    aggregateCosts(subscriptions.Azure, azureData);

    const sortedDates = Array.from(
      new Set([...Object.keys(awsData), ...Object.keys(azureData)])
    ).sort();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedDates,
        datasets: [
          {
            label: "AWS",
            data: sortedDates.map((date) => awsData[date] || 0),
            backgroundColor: "rgba(255, 153, 10, 0.7)",
            stack: "01",
            hidden: !showAWS,
          },
          {
            label: "Azure",
            data: sortedDates.map((date) => azureData[date] || 0),
            backgroundColor: "rgba(10, 163, 225, 0.7)",
            stack: "01",
            hidden: !showAzure,
          },
        ],
      },
      // options: {
      //   scales: {
      //     x: {
      //       stacked: true,
      //     },
      //     y: {
      //       stacked: true,
      //     },
      //   },
      //   plugins: {
      //     legend: {
      //       display: false,
      //     },
      //   },
      // },

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
              callback: function (value) {
                if (currencyPreference === "start") {
                  return `${currencySymbol}${value.toLocaleString()}`;
                } else {
                  return `${value.toLocaleString()}${currencySymbol}`;
                }
              },
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
      if (chartInstance.current) {
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
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <canvas ref={chartContainer} style={{ flexGrow: 1 }}></canvas>
      )}
    </Box>
  );
};

export default StackBars;
