import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api.js";
import { Typography } from "@mui/material";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const OverallTotalRealizedSavings = ({
  subscriptionsData,
  selectedFilters,reservations,simulatedSavings,labels
}) => {
  // const [reservations, setReservations] = useState([]);
  // const [simulatedSavings, setSimulatedSavings] = useState([]);
  // const [labels, setLabels] = useState([]);

  // useEffect(() => {
  //   const hasFilters =
  //     selectedFilters &&
  //     (selectedFilters.subscriptions?.length > 0 ||
  //       selectedFilters.businessUnits?.length > 0 ||
  //       selectedFilters.locations?.length > 0 ||
  //       selectedFilters.applications?.length > 0 ||
  //       selectedFilters.projects?.length > 0 ||
  //       selectedFilters.environments?.length > 0);

  //   if (hasFilters || subscriptionsData.length > 0) {
  //     const fetchReservationsData = async () => {
  //       try {
  //         const inputData = hasFilters
  //           ? {
  //               Subscriptions: selectedFilters.subscriptions.map(
  //                 (sub) => sub.value
  //               ),
  //               BusinessUnits:
  //                 selectedFilters.businessUnits?.map((bu) => bu.value) || [],
  //               Locations:
  //                 selectedFilters.locations?.map((loc) => loc.value) || [],
  //               Applications:
  //                 selectedFilters.applications?.map((app) => app.value) || [],
  //               Projects:
  //                 selectedFilters.projects?.map((proj) => proj.value) || [],
  //               Environments:
  //                 selectedFilters.environments?.map((env) => env.value) || [],
  //             }
  //           : subscriptionsData;

  //         const reservationsData = await api.getOverallSavingsRI(inputData);
  //         setReservations(reservationsData.map((entry) => entry.savings));
  //         setLabels(
  //           reservationsData.map((entry) =>
  //             new Date(entry.modifieddate).toLocaleDateString("en-US", {
  //               month: "long",
  //               year: "numeric",
  //             })
  //           )
  //         );
  //       } catch (error) {
  //         console.error("Error fetching reservations data:", error);
  //       }
  //     };

  //     fetchReservationsData();
  //   }
  // }, [subscriptionsData, selectedFilters]);

  // useEffect(() => {
  //   const hasFilters =
  //     selectedFilters &&
  //     (selectedFilters.subscriptions?.length > 0 ||
  //       selectedFilters.businessUnits?.length > 0 ||
  //       selectedFilters.locations?.length > 0 ||
  //       selectedFilters.applications?.length > 0 ||
  //       selectedFilters.projects?.length > 0 ||
  //       selectedFilters.environments?.length > 0);

  //   if (hasFilters || subscriptionsData.length > 0) {
  //     const fetchSimulatedSavingsData = async () => {
  //       try {
  //         const inputData = hasFilters
  //           ? {
  //               Subscriptions: selectedFilters.subscriptions.map(
  //                 (sub) => sub.value
  //               ),
  //               BusinessUnits:
  //                 selectedFilters.businessUnits?.map((bu) => bu.value) || [],
  //               Locations:
  //                 selectedFilters.locations?.map((loc) => loc.value) || [],
  //               Applications:
  //                 selectedFilters.applications?.map((app) => app.value) || [],
  //               Projects:
  //                 selectedFilters.projects?.map((proj) => proj.value) || [],
  //               Environments:
  //                 selectedFilters.environments?.map((env) => env.value) || [],
  //             }
  //           : subscriptionsData;

  //         const simulatedSavingsData = await api.getOverallSavingsStimulated(
  //           inputData
  //         );
  //         setSimulatedSavings(
  //           simulatedSavingsData.map((entry) => entry.simulated)
  //         );
  //         setLabels(
  //           simulatedSavingsData.map((entry) =>
  //             new Date(entry.Date).toLocaleDateString("en-US", {
  //               month: "long",
  //               year: "numeric",
  //             })
  //           )
  //         );
  //       } catch (error) {
  //         console.error("Error fetching simulated savings data:", error);
  //       }
  //     };

  //     fetchSimulatedSavingsData();
  //   }
  // }, [subscriptionsData, selectedFilters]);

  const data = {
    labels,
    datasets: [
      {
        label: "Reservations",
        backgroundColor: "rgba(255, 140, 0, 0.7)",
        data: reservations
        .filter((entry) => typeof entry === "number" && !isNaN(entry))
        .map((entry) => parseFloat(entry.toFixed(2))),
      },
    ],
  };

  const trendlineData = {
    labels,
    datasets: [
      {
        label: "Simulated PAYGO",
        borderColor: "#0079B9",
        data: simulatedSavings
        .filter((entry) => typeof entry === "number" && !isNaN(entry))
        .map((entry) => parseFloat(entry.toFixed(2))),
        fill: false,
        type: "line",
        pointRadius: 0,
        showLine: true,
        borderWidth: 1,
      },
    ],
  };

  const combinedData = {
    labels,
    datasets: [...data.datasets, ...trendlineData.datasets],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows responsive height and width
    plugins: {
      legend: {
        display: true,
        labels: {
          filter: (legendItem, chartData) => {
            return legendItem.datasetIndex !== chartData.datasets.length - 1;
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.datasetIndex === 1) {
              return `Simulated PAYGO: ${tooltipItem.raw}`;
            } else if (tooltipItem.datasetIndex === 0) {
              return `Reservations: ${tooltipItem.raw}`;
            }
            return null;
          },
          labelColor: function (tooltipItem) {
            if (tooltipItem.datasetIndex === 1) {
              return {
                borderColor: "#0079B9",
                backgroundColor: "#0079B9",
              };
            }
            return {
              borderColor: "rgba(255, 140, 0, 0.7)",
              backgroundColor: "rgba(255, 140, 0, 0.7)",
            };
          },
        },
        filter: function (tooltipItem) {
          if (tooltipItem.datasetIndex === 1) {
            return true;
          }
          return (
            tooltipItem.dataIndex ===
            tooltipItem.chart.tooltip.dataPoints?.[0]?.dataIndex
          );
        },
        itemSort: function (a, b) {
          if (a.datasetIndex === 1 && b.datasetIndex === 0) {
            return -1;
          }
          if (a.datasetIndex === 0 && b.datasetIndex === 1) {
            return 1;
          }
          return 0;
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    layout: {
      padding: {
        left: 10, // Adjust padding to prevent overflow
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true, // Prevents label overflow
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: "#5f249f", mb: 2 }}
        style={{
          position: "relative",
          fontSize: "16px",
          top: "-2.6rem",
          whiteSpace: "nowrap", // Ensures heading stays in one line
          overflow: "hidden",
        }}
      >
        <strong>Overall Total Realized Savings</strong>
      </Typography>
      <div
        style={{
          height: "30vh",
          position: "relative",
          marginTop: "-45px",
          width: "100%",
        }}
      >
        {" "}
        {/* Adjusted position and width */}
        <Bar data={combinedData} options={options} />
      </div>
    </>
  );
};

export default OverallTotalRealizedSavings;
