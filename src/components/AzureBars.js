import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";
import api from "../api.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#000",
        font: {
          family: "Roboto", // Set the font family to Roboto
          size: 16,
          weight: "none",
        },
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          label += context.raw.toFixed(2);
          return label;
        },
      },
    },
  },
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
            new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() / 2;
          if (date.getDate() === Math.ceil(midMonthDay)) {
            return date.toLocaleString("default", {
              month: "long",
              year: "numeric",
            });
          }
          return "";
        },
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: true,
      },
      ticks: {
        stepSize: 4000,
        max: 6000,
      },
    },
  },
  layout: {
    padding: {
      top: 5,
      //   bottom : 5,
    },
  },
};

const AzureBars = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getBillingCostEachDay();
        const labelsSet = new Set();
        const payAsYouGoData = {};
        const reservationsData = {};

        response.forEach(({ dailydate, totalcost, RIDTYPE }) => {
          const date = new Date(dailydate);
          const dateString = date.toISOString().split("T")[0];
          labelsSet.add(dateString);

          if (RIDTYPE === "PAY GO") {
            if (!payAsYouGoData[dateString]) {
              payAsYouGoData[dateString] = 0;
            }
            payAsYouGoData[dateString] += totalcost;
          } else if (RIDTYPE === "RI") {
            if (!reservationsData[dateString]) {
              reservationsData[dateString] = 0;
            }
            reservationsData[dateString] += totalcost;
          }
        });

        const labels = Array.from(labelsSet).sort();
        const payAsYouGo = labels.map((date) => payAsYouGoData[date] || 0);
        const reservations = labels.map((date) => reservationsData[date] || 0);

        const datasets = [
          {
            type: "bar",
            label: "Pay-as-you-go",
            backgroundColor: "#00A3E1",
            data: payAsYouGo,
            stack: "total",
          },
          {
            type: "bar",
            label: "Reservations",
            backgroundColor: "#ED9B33",
            data: reservations,
            stack: "total",
          },
        ];

        setData({ labels, datasets });
        setLoading(false); // Data fetching is complete
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false); // Data fetching failed
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return null; // Show nothing while loading
  }

  return (
    <div style={{ padding: "10px" }}>
      <Typography
        variant="h4"
        style={{
          color: "#5f249f",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "16px",
          marginTop: "10px",
          paddingLeft: "10px",
        }}
      >
        Azure Total Bill Cost
      </Typography>
      <div
        style={{
          position: "relative",
          width: "95%",
          height: "320px",
          margin: "20px auto",
        }}
      >
        <Bar style={{ paddingTop: "5px" }} options={options} data={data} />
      </div>
    </div>
  );
};

export default AzureBars;
