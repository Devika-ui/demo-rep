import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
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
    if (subscriptions.length === 0) return; // Wait until data is fetched

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    const awsData = {};
    const azureData = {};

    subscriptions.forEach(({ dailydate, totalcost, RIDTYPE }) => {
      const date = new Date(dailydate).toISOString().split("T")[0];

      if (!awsData[date]) {
        awsData[date] = Math.random() * 10000; // Random data for AWS
      }
      if (!azureData[date]) {
        azureData[date] = 0;
      }

      azureData[date] += totalcost; // Sum up the total cost for Azure for both PAY GO and RI
    });

    // Sorting dates in ascending order
    const sortedDates = Object.keys(azureData).sort();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedDates,
        datasets: [
          {
            label: "AWS",
            data: sortedDates.map((date) => awsData[date].toFixed(2)), // Fixed to 2 decimal places
            backgroundColor: "rgba(255, 153, 10, 0.7)",
            stack: "01",
          },
          {
            label: "Azure",
            data: sortedDates.map((date) => azureData[date].toFixed(2)), // Fixed to 2 decimal places
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
              callback: function (value, index, values) {
                const date = new Date(this.getLabelForValue(value));
                const midMonthDay =
                  new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  ).getDate() / 2;
                // Display month label in the middle of the month
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
              stepSize: 4000,
              max: 6000, // Adjust max to fit the data
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "",
            position: "top",
            align: "start",
            font: {
              size: 16,
              weight: "bold",
            },
            padding: {
              bottom: 10, // Padding between the title and the legend
              top: 10,
              left: 10,
            },
          },
          legend: {
            position: "top",
            align: "between",
            labels: {
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
          layout: {
            padding: {
              top: 100, // Increased padding at the top of the chart area
              bottom: 20, // Padding at the bottom of the chart area
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
    <div
      style={{
        position: "relative",
        marginBottom: "0px",
        height: "400px",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <Typography
          variant="subtitle1"
          style={{
            color: "#5f249f",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "16px",
            paddingLeft: "20px",
            paddingTop: "10px",
          }}
        >
          Total Bill Cost by Providers
        </Typography>
      </div>
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          height: "calc(100% - 40px)", // Adjust height to ensure chart fits within the container
          marginTop: "40px", // Adjust margin to ensure chart fits within the container
        }}
      >
        <canvas style={{ paddingTop: "5px" }} ref={chartContainer}></canvas>
      </div>
    </div>
  );
};

export default StackBars;
