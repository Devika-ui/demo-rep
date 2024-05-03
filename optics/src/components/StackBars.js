import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';
import Chart from 'chart.js/auto';
import api from '../api.js';

const StackBars = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [subOption, setSubOption] = useState("Select an option");
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getBillingCostEachDay();
        setSubscriptions(subscriptionsData);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (subscriptions.length === 0) return; // Wait until data is fetched

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    const awsData = {};
    const azureData = {};

    subscriptions.forEach(({ date, provider }) => {
      const month = date.split('-')[1];
      const day = date.split('-')[2];

      if (!awsData[day]) {
        awsData[day] = 0;
      }
      if (!azureData[day]) {
        azureData[day] = 0;
      }

      if (provider.AWS) {
        awsData[day] += provider.AWS;
      }
      if (provider.Azure) {
        azureData[day] += provider.Azure;
      }
    });

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(awsData),
        datasets: [
          {
            label: "AWS",
            data: Object.values(awsData),
            backgroundColor: "rgba(255, 153, 10, 0.7)",
            stack: "01"
          },
          {
            label: "Azure",
            data: Object.values(azureData),
            backgroundColor: "rgba(10, 163, 225, 0.7)",
            stack: "01"
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: '',
            position: 'top',
            align: 'start',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              padding: 5,
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
  }, [subscriptions]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSubOption("Select an option");
  };

  const handleSubOptionChange = (event) => {
    setSubOption(event.target.value);
  };
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
      <div style={{ position: "absolute", top: 0, right: "10px" }}>
        <Typography
          variant="subtitle1"
          style={{
            color: "gray",
            fontWeight: "bold",
            fontSize: "12px",
            paddingTop: "6px",
            textAlignLast: "right",
          }}
        >
          Show Spend by Tags:
        </Typography>
        <FormControl>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{
              height: "25px",
              minWidth: "150px",
              backgroundColor: "rgb(95, 36, 159,0.9)",
              fontSize: "14px",
              color: "white",
            }}
          >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Azure">Azure</MenuItem>
          </Select>
        </FormControl>
        {selectedOption !== "Select an option" && (
          <FormControl>
            <Select
              value={subOption}
              onChange={handleSubOptionChange}
              style={{
                height: "28px",
                minWidth: "150px",
                backgroundColor: "rgb(95, 36, 159,0.9)",
              }}
            >
              <MenuItem value="Select an option">Select an option</MenuItem>
              {selectedOption === "AWS" ? (
                <>
                  <MenuItem value="AWS choice 1">AppID_AppName</MenuItem>
                  <MenuItem value="AWS choice 2">BU_Company</MenuItem>
                  <MenuItem value="AWS choice 3">Environment</MenuItem>
                  <MenuItem value="AWS choice 4">Owner</MenuItem>
                  <MenuItem value="AWS choice 5">ProjectName</MenuItem>
                </>
              ) : selectedOption === "Azure" ? (
                <>
                  <MenuItem value="Azure choice 1">AppID_AppName</MenuItem>
                  <MenuItem value="Azure choice 2">BU_Company</MenuItem>
                  <MenuItem value="Azure choice 3">Environment</MenuItem>
                  <MenuItem value="Azure choice 4">Owner</MenuItem>
                  <MenuItem value="Azure choice 5">ProjectName</MenuItem>
                </>
              ) : null}
            </Select>
          </FormControl>
        )}
      </div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};
 
export default StackBars;