import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Typography } from '@mui/material';
import '../css/Ondemand.scss';

const Ondemand = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: '',
            data: [200, 300, 600, 0, 600, 200],
            borderColor: 'rgba(0, 128, 128, 1)',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(0, 128, 128, 0.1)',
            tension: 0.4,
            pointRadius: 0,
            cubicInterpolationMode: 'monotone'
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 30,
              bottom: 20
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: ''
              }
            },
            y: {
              title: {
                display: true,
                text: ''
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false
            },
            crosshair: {
              line: {
                color: 'rgba(0, 0, 0, 0.5)',
                width: 1,
                dashPattern: [5, 5]
              }
            }
          },
          elements: {
            point: {
              radius: 0
            }
          }
        },
        plugins: [{
          id: 'customCrosshair',
          afterDraw: (chart, _) => {
            const ctx = chart.ctx;
            const xScale = chart.scales['x'];
            const yScale = chart.scales['y'];

            if (chart.tooltip._active && chart.tooltip._active.length) {
              const activePoint = chart.tooltip._active[0];
              const x = activePoint.element.x;
              const y = activePoint.element.y;

              // Draw vertical line
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, yScale.top);
              ctx.lineTo(x, yScale.bottom);
              ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.lineWidth = 1;
              ctx.setLineDash([5, 5]);
              ctx.stroke();
              ctx.restore();
            }
          }
        }]
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="ondemand-container">
      <Typography
        variant="subtitle1"
        className="ondemand-title"
        style={{ color: "#63666A", fontSize: "16px", fontWeight: "bold" }}
      >
        Anomalies Detection for On-Demand Cost
      </Typography>

      <div className="chart" style={{ width: "500px", height: "320px", marginBottom : "10px", marginTop: "-20px" }}>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default Ondemand;
