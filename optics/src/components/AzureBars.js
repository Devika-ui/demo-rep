import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#000", // Adjust color as needed
        font: {
          family: "Roboto",
          size: 12, // Adjust size as needed
        },
        filter: function (legendItem, chartData) {
          // Filter out duplicate legend items and remove the label for the line dataset
          if (legendItem.text === "Total") {
            return false;
          }
          const index = chartData.datasets.findIndex(
            (dataset) => dataset.label === legendItem.text
          );
          return index === legendItem.datasetIndex;
        },
      },
    },
    title: {
      display: true,
      text: "Azure Total Bill Cost",
      align: "start", // Move title to the left
      font: {
        family: "Roboto",
        size: 25, // Adjust size as needed
        weight: "bold",
      },
      color: "#000", // Adjust color as needed
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 50,
        max: 150,
      },
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const payAsYouGoData = [20, 30, 40, 50, 60, 70, 80];
const reservationsData = [10, 20, 30, 40, 50, 60, 70];

const additionalPayAsYouGoData = [
  [15, 25, 35, 45, 55, 65, 75],
  [18, 28, 38, 48, 58, 68, 78],
  [22, 32, 42, 52, 62, 72, 82],
  [12, 22, 32, 42, 52, 62, 72],
  [25, 35, 45, 55, 65, 75, 85],
  [30, 40, 50, 60, 70, 80, 90],
  [28, 38, 48, 58, 68, 78, 88],
];

const additionalReservationsData = [
  [5, 15, 25, 35, 45, 55, 65],
  [8, 18, 28, 38, 48, 58, 68],
  [12, 22, 32, 42, 52, 62, 72],
  [2, 12, 22, 32, 42, 52, 62],
  [15, 25, 35, 45, 55, 65, 75],
  [20, 30, 40, 50, 60, 70, 80],
  [18, 28, 38, 48, 58, 68, 78],
];

const lineData = [160, 40, 60, 80, 100, 120, 140];

// Create dataset arrays
const payAsYouGoDatasets = labels.map((label, i) => ({
  type: "bar",
  label: "Pay-as-you-go",
  backgroundColor: "#00A3E1",
  data: [payAsYouGoData[i], ...additionalPayAsYouGoData[i]],
  stack: `Stack ${i + 1}`,
}));

const reservationsDatasets = labels.map((label, i) => ({
  type: "bar",
  label: "Reservations",
  backgroundColor: "#ED9B33",
  data: [reservationsData[i], ...additionalReservationsData[i]],
  stack: `Stack ${i + 1}`,
}));

const datasets = [
  ...payAsYouGoDatasets,
  ...reservationsDatasets,
  {
    type: "line",
    label: "Total",
    borderColor: "#5F249F",
    borderWidth: 1,
    fill: false,
    data: lineData,
    pointRadius: 0,
    pointHitRadius: 0,
    tension: 0.4,
  },
];

const data = {
  labels,
  datasets,
};

const GroupedStackedBarLineChart = () => {
  return <Bar options={options} data={data} />;
};

export default GroupedStackedBarLineChart;
