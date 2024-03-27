import React from "react";
import { Bar } from "react-chartjs-2";
import iIcon from '../images/Iicon.png';

const OverallTotalRealizedSavings = () => {
  // Data for the chart
  const data = {
    labels: ["June", "Jul", "Aug"],
    datasets: [
      {
        label: "Recommendations",
        backgroundColor: "rgba(0, 128, 0, 1)",
        data: [40, 70, 30],
      },
      {
        label: "Reservations",
        backgroundColor: "rgba(255, 140, 0, 1)",
        data: [30, 50, 20],
      },
      {
        label: "Savings Plan",
        backgroundColor: "rgba(205, 205, 0, 1)",
        data: [60, 60, 50],
      },
    ],
  };

  // Trend line data
  const trendlineData = {
    labels: ["June Start", "June End", "Mid July", "Aug Start", "Aug End"],
    datasets: [
      {
        borderColor: "#0079B9",
        data: [55, 90, 65, 95, 100],
        fill: false,
        type: "line",
        pointRadius: 0, // Hide points
        showLine: true, // Show line
        borderWidth: 1, // Adjust line width
        label: "", // No legend for trend line
      },
    ],
  };

  // Combined data
  const combinedData = {
    labels: data.labels,
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
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div
      style={{
        width: "550px", // Increased width
        height: "375px", // Decreased height
        border: "1px solid #ccc",
        overflow: "hidden",
        fontFamily: "sans-serif",
        display: "inline-block",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        position: "relative", // Added position relative
      }}
    >
      <div
        style={{
          height: "40px", // Increased height for heading section
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Added to align icon and heading
          paddingLeft: "20px", // Adjusted padding
          paddingRight: "10px", // Adjusted padding
          borderBottom: "1px solid #ccc", // Add separating line
        }}
      >
        <h3 style={{ margin: "0", lineHeight: "1" }}>Overall Total Realized Savings</h3>
        <div style={{ position: "absolute", top: "10px", right: "10px" }}> {/* Position icon */}
          <img style={{ height: '20px', width: '20px' }} src={iIcon} alt="I-icon" />
        </div>
      </div>
      <div style={{ height: "calc(100% - 41px)", overflow: "hidden" }}> {/* Adjusted height */}
        <Bar data={combinedData} options={options} />
      </div>
    </div>
  );
};

export default OverallTotalRealizedSavings;