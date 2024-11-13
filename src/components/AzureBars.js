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
import { Typography, Switch, FormControlLabel } from "@mui/material";
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
          family: "Roboto",
          size: 12,
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
        callback: function (value, index, values) {
          const label = this.getLabelForValue(value);
          // Convert label to date object
          const date = new Date(label);

          // Only show the first day of each month (e.g. 2024-09-01)
          if (date.getDate() === 1) {
            let month = date.toLocaleString("default", { month: "short" });
            if (month === "Sep") month = "Sept"; // Adjust 'Sep' to 'Sept'
            const year = date.getFullYear().toString().slice(-2);
            return `${month}'${year}`;
          }

          // Return an empty string for other days to avoid repeated month/year labels
          return "";
        },
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 4000,
        max: 6000,
      },
    },
  },
};

const AzureBars = ({ subscriptionsData }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    if (subscriptionsData && subscriptionsData.length > 0) {
      const fetchData = async () => {
        try {
          const response = await api.getBillingCostEachDay(subscriptionsData);
          const labelsSet = new Set();
          const payAsYouGoData = {};
          const reservationsData = {};

          response.forEach(({ dailydate, totalcost, RIDTYPE }) => {
            const date = new Date(dailydate);
            const dateString = date.toISOString().split("T")[0];
            labelsSet.add(dateString);

            if (RIDTYPE === "PAY GO") {
              payAsYouGoData[dateString] =
                (payAsYouGoData[dateString] || 0) + totalcost;
            } else if (RIDTYPE === "RI") {
              reservationsData[dateString] =
                (reservationsData[dateString] || 0) + totalcost;
            }
          });

          const labels = Array.from(labelsSet).sort();
          const payAsYouGo = labels.map((date) => payAsYouGoData[date] || 0);
          const reservations = labels.map(
            (date) => reservationsData[date] || 0
          );

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
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch data", error);
          setLoading(false);
        }
      };

      const fetchForecastData = async () => {
        try {
          const forecastResponse = await api.getMonthlyForecastSpend(
            subscriptionsData
          );

          const pastMonths = forecastResponse[0].pastCosts.map(
            (item) => item.month
          );
          const pastCosts = forecastResponse[0].pastCosts.map(
            (item) => item.pastCost
          );

          const futureMonths = forecastResponse[0].futureCosts.map(
            (item) => item.month
          );
          const futureCosts = forecastResponse[0].futureCosts.map(
            (item) => item.futureCost
          );

          const combinedLabels = [...pastMonths, ...futureMonths];

          const pastCostsDataset = {
            label: "Prev Months Cost",
            backgroundColor: "#00A3E1",
            barThickness: 25,
            data: pastCosts,
            stack: "total",
          };

          const futureCostsDataset = {
            label: "Future Forecast",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // White with slight transparency
            barThickness: 25,
            borderColor: "#00A3E1", // Blue outline
            borderWidth: 2, // Thickness of the blue border
            data: [...Array(pastCosts.length).fill(null), ...futureCosts],
            stack: "total",
          };

          setForecastData({
            labels: combinedLabels,
            datasets: [pastCostsDataset, futureCostsDataset],
          });
        } catch (error) {
          console.error("Failed to fetch forecast data", error);
        }
      };

      fetchData();
      fetchForecastData();
    }
  }, [subscriptionsData]);

  const handleToggleChange = () => {
    setShowForecast(!showForecast);
  };

  if (loading) {
    return null;
  }

  return (
    <div style={{ position: "relative", padding: "10px" }}>
      <div
        style={{
          position: "relative",
          margin: "0px 10px 0 5px",
          height: "210px",
        }}
      >
        <Bar
          style={{ paddingTop: "5px" }}
          options={options}
          data={showForecast && forecastData ? forecastData : data}
        />
      </div>
      <div style={{ position: "absolute", top: "13px", right: "-5px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={showForecast}
              onChange={handleToggleChange}
              color="primary"
            />
          }
          labelPlacement="start"
        />
      </div>
    </div>
  );
};

export default AzureBars;
