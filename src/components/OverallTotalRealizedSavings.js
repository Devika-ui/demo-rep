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
import iIcon from "../images/Iicon.png";
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
      }
    };
    fetchSimulatedSavingsData();
  }, []);

  // Data for the chart
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

  // Trend line data
  const trendlineData = {
    labels,
    datasets: [
      {
        label: "Simulated PAYGO",
        borderColor: "#0079B9",
        data: simulatedSavings.map((entry) => parseFloat(entry.toFixed(2))), // Using simulatedSavings data for the trendline
        fill: false,
        type: "line",
        pointRadius: 0, // Hide points
        showLine: true, // Show line
        borderWidth: 1, // Adjust line width
      },
    ],
  };

  // Combined data
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
            return legendItem.datasetIndex !== chartData.datasets.length - 1; // Exclude trendline from legend
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
          // Ensure "Simulated PAYGO" appears above "Reservations"
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
      intersect: false, // Ensure the tooltip is shown when hovering anywhere on the line
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove the x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Remove the y-axis grid lines
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "579px",
        height: "453px",
        borderRadius: "5px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        position: "relative",
        border: " 1px solid #ccc",
        marginRight: "5px",
      }}
    >
      <div
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "10px",
          borderBottom: "2px solid #98989893",
          paddingBottom: "2px",
        }}
      >
        <h4 style={{ margin: "0", lineHeight: "1", color: "#5f249f" }}>
          Overall Total Realized Savings
        </h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "17px", width: "18px" }}
            src={iIcon}
            alt="I-icon"
          />
        </div>
      </div>
      <div
        style={{
          height: "calc(100% - 51px)",
          overflow: "hidden",
          paddingTop: "40px",
        }}
      >
        <Bar data={combinedData} options={options} />
      </div>
    </div>
  );
};

export default OverallTotalRealizedSavings;
