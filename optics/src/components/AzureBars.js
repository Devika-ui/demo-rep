import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import Chart from 'chart.js/auto';
import api from '../api.js';

const AzureBars = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [azureData, setAzureData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getBillingCostEachDay();
        const azureData = {};

        subscriptionsData.forEach(({ date, provider }) => {
          const day = date.split('-')[2];

          if (!azureData[day]) {
            azureData[day] = 0;
          }

          if (provider.Azure) {
            azureData[day] += provider.Azure;
          }
        });

        setAzureData(azureData);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(azureData).length === 0) return; // Wait until data is fetched

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(azureData),
        datasets: [
          {
            label: "Azure",
            data: Object.values(azureData),
            backgroundColor: "rgba(10, 163, 225, 0.7)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        plugins: {
        //   title: {
        //     display: true,
        //     text: 'Total Bill Cost by Azure Provider',
        //     position: 'top',
        //     align: 'start',
        //     font: {
        //       size: '16px',
        //       weight: 'bold'
        //     },
        //     color: 'black', // Set title color to black
        //   },
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              usePointStyle: true,
              padding: 35,
              font: {
                size: 12,
              },
            },
            onClick: () => {},
          },
          layout: {
            padding: {
              top: 10,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [azureData]);

  return (
    <div style={{ position: "relative" }}>
         <div style={{ position: "absolute", top: 0, left: 0 }}>
        <Typography
          variant="subtitle1"
          style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
        >
          Total Bill Cost by Providers:
        </Typography>
      </div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default AzureBars;