import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const StackBars = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [subOption, setSubOption] = useState("Select an option");
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }
    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "AWS",
            data: [8, 4, 2, 6, 9, 5, 7, 3, 10, 1, 8, 5],
            backgroundColor: "rgba(255, 153, 10, 0.7)", // Lighter AWS color
          },
          {
            label: "Azure",
            data: [6, 3, 7, 8, 1, 10, 4, 2, 9, 5, 7, 3],
            backgroundColor: "rgba(10, 163, 225, 0.7)", // Lighter Azure color
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false, // Hide x-axis grid lines
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)", // Set color for x-axis ticks
            },
          },
          y: {
            stacked: true,
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
              color: "rgba(0, 0, 0, 0.5)", // Set color for y-axis ticks
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
              padding: 5, // Add padding between legend and chart
              font: {
                size: 12, // Adjust legend label font size
              },
            },
            onClick: () => {}, // Override onClick to prevent default behavior
          },
          layout: {
            padding: {
              top: 10, // Add padding between top of canvas and legend
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
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSubOption("Select an option"); // Reset subOption when main option changes
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
        {selectedOption !== "Select an option" && (
          <FormControl>
            <Select
              value={subOption}
              onChange={handleSubOptionChange}
              style={{
                height: "25px",
                minWidth: "150px",
                backgroundColor: "rgb(95, 36, 159,0.9)",
                fontSize: '14px',
                color: "white",
              }}
            >
              <MenuItem value="Select an option">Select an option</MenuItem>
              {selectedOption === "AWS" ? (
                <>
                  <MenuItem value="AWS choice 1">AWS choice 1</MenuItem>
                  <MenuItem value="AWS choice 2">AWS choice 2</MenuItem>
                  <MenuItem value="AWS choice 3">AWS choice 3</MenuItem>
                </>
              ) : selectedOption === "Azure" ? (
                <>
                  <MenuItem value="Azure choice 1">Azure choice 1</MenuItem>
                  <MenuItem value="Azure choice 2">Azure choice 2</MenuItem>
                  <MenuItem value="Azure choice 3">Azure choice 3</MenuItem>
                </>
              ) : null}
            </Select>
          </FormControl>
        )}
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
                  <MenuItem value="AWS choice 1">AWS choice 1</MenuItem>
                  <MenuItem value="AWS choice 2">AWS choice 2</MenuItem>
                  <MenuItem value="AWS choice 3">AWS choice 3</MenuItem>
                </>
              ) : selectedOption === "Azure" ? (
                <>
                  <MenuItem value="Azure choice 1">Azure choice 1</MenuItem>
                  <MenuItem value="Azure choice 2">Azure choice 2</MenuItem>
                  <MenuItem value="Azure choice 3">Azure choice 3</MenuItem>
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