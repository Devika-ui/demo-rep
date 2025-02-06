import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Typography, CircularProgress } from "@mui/material";
import "../css/Ondemand.scss";
import api from "../api";

const Ondemand = ({
  selectedFilters,
  currencySymbol,
  currencyPreference,
  billingMonth,
}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (billingMonth.length == 0) {
          return;
        }
        setLoading(true);
        const data = await api.getDataForAnomaly(selectedFilters, billingMonth);

        // Parse the date and sort the data by month
        const sortedData = data.sort(
          (a, b) => new Date(a.Month) - new Date(b.Month)
        );

        const labels = sortedData.map((item) =>
          new Date(item.Month).toLocaleString("default", { month: "short" })
        );
        const datasetData = sortedData.map((item) => item.TotalCost);

        setChartData({
          labels,
          datasets: [
            {
              label: "",
              data: datasetData,
              borderColor: "rgba(0, 128, 128, 1)",
              borderWidth: 2,
              fill: true,
              backgroundColor: "rgba(0, 128, 128, 0.1)",
              tension: 0.4,
              pointRadius: 0,
              cubicInterpolationMode: "monotone",
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedFilters]);

  useEffect(() => {
    if (chartContainer.current && chartData.labels.length) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 30,
              bottom: 20,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "",
              },
            },
            y: {
              title: {
                display: true,
                text: "",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
              callbacks: {
                label: (context) => {
                  const value = context.raw;

                  return currencyPreference === "start"
                    ? `${currencySymbol}${value.toFixed(2)}`
                    : `${value.toFixed(2)}${currencySymbol}`;
                },
              },
            },
            crosshair: {
              line: {
                color: "rgba(0, 0, 0, 0.5)",
                width: 1,
                dashPattern: [5, 5],
              },
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
        plugins: [
          {
            id: "customCrosshair",
            afterDraw: (chart) => {
              const ctx = chart.ctx;
              const xScale = chart.scales["x"];
              const yScale = chart.scales["y"];

              if (
                chart.tooltip &&
                chart.tooltip._active &&
                chart.tooltip._active.length
              ) {
                const activePoint = chart.tooltip._active[0];
                const x = activePoint.element.x;
                const y = activePoint.element.y;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yScale.top);
                ctx.lineTo(x, yScale.bottom);
                ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.restore();
              }
            },
          },
        ],
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, currencySymbol]);

  return (
    <div className="ondemand-container">
      <Typography
        variant="subtitle1"
        className="ondemand-title"
        style={{ color: "#63666A", fontSize: "16px", fontWeight: "bold" }}
      >
        Anomalies Detection for On-Demand Cost
      </Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="chart">
          <canvas ref={chartContainer} />
        </div>
      )}
    </div>
  );
};

export default Ondemand;
