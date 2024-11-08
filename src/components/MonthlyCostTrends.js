import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import api from "../api.js";
import "../css/components/MonthlyCostTrends.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const MonthlyCostTrends = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Consumption Cost",
        data: [],
        borderColor: "#00bfa5",
        borderWidth: 2,
        pointBackgroundColor: "#00bfa5",
        pointBorderColor: "#fff",
        pointRadius: 4,
        tension: 0,
        fill: false,
      },
      {
        label: "Projected Cost",
        data: [],
        borderColor: "#9c27b0",
        borderWidth: 2,
        pointBackgroundColor: "#9c27b0",
        pointBorderColor: "#fff",
        pointRadius: 4,
        fill: {
          target: "origin",
          above: "rgba(156, 39, 176, 0.1)",
          below: "rgba(156, 39, 176, 0.1)",
        },
        tension: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getMonthlyForecastSpend();
        const { pastCosts, futureCosts } = response[0];

        const labels = [
          ...pastCosts.map((cost) => cost.month),
          ...futureCosts.map((cost) => cost.month),
        ];

        // Prepare data for consumption cost
        const consumptionCostData = pastCosts.map((cost) => cost.pastCost);

        // Get the last known consumption cost
        const lastConsumptionCost =
          consumptionCostData[consumptionCostData.length - 1];

        // Prepare data for projected cost
        const projectedCostData = [
          ...new Array(pastCosts.length - 1).fill(null), // No projected cost for months with consumption cost
          lastConsumptionCost, // This ensures the line joins from the last consumption cost
          ...futureCosts.map((cost) => cost.futureCost), // Only future projected costs
        ];

        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: consumptionCostData, // Only consumption costs here
            },
            {
              ...chartData.datasets[1],
              data: projectedCostData, // Projected costs start after consumption costs end
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching forecast spend data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    layout: {
      padding: {
        bottom: -8, // Add padding below the chart to make room for the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#666",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="title">Monthly Cost Trends & Evolution</div>
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyCostTrends;
