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
import { Typography } from '@mui/material';
import api from '../api.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
  responsive: true,
  plugins: {
      legend: {
          display: true,
          labels: {
              color: "#000",
              font: {
                  family: "Roboto",
                  size: 16, // Increased font size for legend labels
                  weight: 'bold', // Added bold weight for better visibility
              },
          },
      },
      tooltip: {
          enabled: true,
          callbacks: {
              label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                      label += ': ';
                  }
                  label += context.raw.toFixed(2); // Ensure two decimal places
                  return label;
              }
          }
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
                  const midMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() / 2;
  
                  // Display month label in the middle of the month
                  if (date.getDate() === Math.ceil(midMonthDay)) {
                      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                  }
                  return '';
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
              max: 6000, // Adjust max to fit the data
          },
      },
  },
  layout: {
      padding: {
          top: 0, // Add padding to the top to give more space for the title
      },
  },
};

const AzureBars = () => {
  const [data, setData] = useState({
      labels: [],
      datasets: [],
  });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await api.getBillingCostEachDay();
              const labelsSet = new Set();
              const payAsYouGoData = {};
              const reservationsData = {};

              response.forEach(({ dailydate, totalcost, RIDTYPE }) => {
                  const date = new Date(dailydate);
                  const dateString = date.toISOString().split('T')[0];
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
              const payAsYouGo = labels.map(date => payAsYouGoData[date] || 0);
              const reservations = labels.map(date => reservationsData[date] || 0);

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
          } catch (error) {
              console.error("Failed to fetch data", error);
          }
      };
      fetchData();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Typography
        variant="h4"
        style={{ color: "black", fontWeight: "bold", fontSize: "20px", marginTop: "10px" }}
      >
        Azure Total Bill Cost
      </Typography>
      <Bar options={options} data={data} />
    </div>
  );
};

export default AzureBars;