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
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
          'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'AWS',
            data: [8, 4, 2, 6, 9, 5, 7, 3, 10, 1, 8, 5],
            backgroundColor: 'rgba(108, 194, 74, 0.7)' // Lighter AWS color
          },
          {
            label: 'Azure',
            data: [6, 3, 7, 8, 1, 10, 4, 2, 9, 5, 7, 3],
            backgroundColor: 'rgba(237, 155, 51, 0.7)' // Lighter Azure color
          }
        ]
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        },
        plugins: {
          title: {
            display: true,
            text: 'Total Bill Cost by Providers',
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
              padding: 5 // Add padding between legend and chart
            }
          },
          layout: {
            padding: {
              top: 10 // Add padding between top of canvas and legend
            }
          }
        }
      }
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
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: '10px' }}>
        <Typography variant="subtitle1">Show Spend by Tags:</Typography>
        <FormControl>
          <Select value={selectedOption} onChange={handleOptionChange}  style={{ height:'28px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)' }} >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Azure">Azure</MenuItem>
          </Select>
        </FormControl>
        {selectedOption !== "Select an option" && (
          <FormControl>
            <Select value={subOption} onChange={handleSubOptionChange}  style={{ height:'28px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)' }} >
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
}

export default StackBars;
