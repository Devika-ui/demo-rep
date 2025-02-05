import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Dialog,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api.js";
import componentUtil from "../componentUtil.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const options = (currencySymbol, currencyPreference) => ({
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
          let formattedValue = context.raw.toFixed(2);
          if (currencyPreference === "start") {
            label += `${currencySymbol}${formattedValue}`;
          } else {
            label += `${formattedValue}${currencySymbol}`;
          }
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
        callback: function (value) {
          const label = this.getLabelForValue(value);
          const date = new Date(label);
          if (date.getDate() === 1) {
            let month = date.toLocaleString("default", { month: "short" });
            if (month === "Sep") month = "Sept";
            const year = date.getFullYear().toString().slice(-2);
            return `${month}'${year}`;
          }
          return "";
        },
        padding: 6,
        font: {
          size: 12,
          family: "Roboto",
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
});

const DetailedCSPBars = ({
  inputData,
  selectedCSP,
  billingMonth,
  startDate,
  endDate,
}) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (billingMonth.length == 0 || !startDate || !endDate) {
          return;
        }
        // Construct input data based on selected filters or subscriptionsData
        const response = await api.getBillingCostEachDay(
          inputData,
          startDate,
          endDate
        );
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const labelsSet = new Set();

        const ridTypeData = {};
        const lastValidRidTypeByMonth = {};

        response.forEach(({ dailydate, totalcost, RIDTYPE }) => {
          const date = new Date(dailydate);
          const dateString = date.toISOString().split("T")[0];
          const monthKey = dateString.substring(0, 7);
          labelsSet.add(dateString);

          // Use last known valid RIDTYPE if current is empty
          const ridTypeToUse = RIDTYPE.trim()
            ? RIDTYPE
            : lastValidRidTypeByMonth[monthKey];

          if (ridTypeToUse) {
            lastValidRidTypeByMonth[monthKey] = ridTypeToUse;

            if (!ridTypeData[ridTypeToUse]) {
              ridTypeData[ridTypeToUse] = {};
            }

            ridTypeData[ridTypeToUse][dateString] =
              (ridTypeData[ridTypeToUse][dateString] || 0) + totalcost;
          }
        });

        const labels = Array.from(labelsSet).sort();
        const ridTypes = Object.keys(ridTypeData); // Extract unique RIDTYPEs

        const getColorForRIDType = (index) => {
          const predefinedColors = ["#00A3E1", "#ED9B33"];
          return predefinedColors[index] || `hsl(${index * 60}, 70%, 50%)`;
        };

        const datasets = ridTypes.map((ridType, index) => ({
          type: "bar",
          label: ridType,
          backgroundColor: getColorForRIDType(index),
          data: labels.map((date) => ridTypeData[ridType][date] || 0),
          stack: "total",
        }));

        setData({ labels, datasets });

        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false);
      }
    };

    const fetchForecastData = async () => {
      try {
        // Construct input data for the forecast API
        if (billingMonth.length == 0) {
          return;
        }
        const forecastResponse = await api.getMonthlyForecastSpend(
          inputData,
          billingMonth
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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          barThickness: 25,
          borderColor: "#00A3E1",
          borderWidth: 2,
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
  }, [selectedCSP, inputData, billingMonth, startDate, endDate]);

  const handleToggleChange = () => {
    setShowForecast(!showForecast);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", padding: "10px" }}>
      <Dialog
        open={isExpanded}
        onClose={handleExpandClick}
        maxWidth="lg"
        fullWidth={false}
        PaperProps={{
          style: {
            width: "60%",
            maxWidth: "80%",
            margin: "auto",
          },
        }}
      >
        <div style={{ padding: "10px", height: "60vh" }}>
          <IconButton
            onClick={handleExpandClick}
            style={{ color: "#000", position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Bar
            style={{ paddingTop: "5px" }}
            options={options(currencySymbol, currencyPreference)}
            data={showForecast && forecastData ? forecastData : data}
          />
        </div>
      </Dialog>
      {!isExpanded && (
        <div
          style={{
            position: "relative",
            margin: "0px 10px 0 5px",
            height: "210px",
          }}
        >
          <Bar
            style={{ paddingTop: "5px" }}
            options={options(currencySymbol, currencyPreference)}
            data={showForecast && forecastData ? forecastData : data}
          />
        </div>
      )}
      <div style={{ position: "absolute", top: "13px", right: "-5px" }}>
        <Tooltip
          title={
            <span style={{ color: "white", fontSize: "16px" }}>Forecast</span>
          }
          arrow
        >
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
        </Tooltip>
      </div>
      {!isExpanded && (
        <div style={{ position: "absolute", top: "13px", left: "-5px" }}>
          <IconButton onClick={handleExpandClick} style={{ color: "#000" }}>
            <FullscreenIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default DetailedCSPBars;
