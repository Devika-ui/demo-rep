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

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const OverallTotalRealizedSavings = () => {
  const [reservations, setReservations] = useState([]);
  const [simulatedSavings, setSimulatedSavings] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const reservationsData = await api.getOverallSavingsRI();
        setReservations(reservationsData.map((entry) => entry.savings));
        setLabels(
          reservationsData.map((entry) =>
            new Date(entry.modifieddate).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          )
        );
      } catch (error) {
        // Handle error
        console.error("Error fetching reservations data:", error);
      }
    };
    fetchReservationsData();
  }, []);

  useEffect(() => {
    const fetchSimulatedSavingsData = async () => {
      try {
        const simulatedSavingsData = await api.getOverallSavingsStimulated();
        setSimulatedSavings(
          simulatedSavingsData.map((entry) => entry.simulated)
        );
        setLabels(
          simulatedSavingsData.map((entry) =>
            new Date(entry.Date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          )
        );
      } catch (error) {
        // Handle error
        console.error("Error fetching simulated savings data:", error);
      }
    };
    fetchSimulatedSavingsData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Reservations",
        backgroundColor: "rgba(255, 140, 0, 0.7)",
        data: reservations.map((entry) => parseFloat(entry.toFixed(2))),
      },
    ],
  };

  const trendlineData = {
    labels,
    datasets: [
      {
        label: "Simulated PAYGO",
        borderColor: "#0079B9",
        data: simulatedSavings.map((entry) => parseFloat(entry.toFixed(2))),
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
        left: 25,
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
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", marginBottom: "17px", marginLeft: "-30px" }}>
      <strong
        style={{
          position: "absolute",
          top: "-30px", // Adjust this value to move the title up or down
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "sans-serif",
          color: "#5f249f",
          display: "block",
          whiteSpace: "nowrap", // Prevent line break
          overflow: "hidden", // Hide overflow text
          textOverflow: "ellipsis", // Show ellipsis if text overflows
        }}
      >
        Overall Total Realized Savings
      </strong>
      <div
        style={{
          width: "380px",
          height: "198px",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          marginBottom: "200px",
          marginRight: "4px",
          marginTop: "-10px", // Adjust marginTop to position the chart container
        }}
      >
        <div style={{ height: "100%", padding: "5px" }}>
          <Bar data={combinedData} options={options} />
        </div>
      </div>
    </div>
  );  
};

export default OverallTotalRealizedSavings;