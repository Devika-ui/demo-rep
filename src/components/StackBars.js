import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import Chart from "chart.js/auto";
import api from "../api.js";

const StackBars = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getBillingCostEachDay();
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

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
          },
          {
            label: "Azure",
            data: sortedDates.map((date) => azureData[date].toFixed(2)),
            backgroundColor: "rgba(10, 163, 225, 0.7)",
            stack: "01",
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
          title: {
            display: false, // Disable Chart.js title
          },
          legend: {
            position: "top",
            align: "end",
            labels: {
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
          layout: {
            padding: {
              top: 50,
              bottom: 10,
              right: 100,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [subscriptions]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* <Typography variant="h6" align="center" sx={{ color: "#5f249f", mb: 2 }}>
        Total Bill Cost by Providers
      </Typography> */}
      <canvas ref={chartContainer} style={{ flexGrow: 1 }}></canvas>
    </Box>
  );
};

export default StackBars;