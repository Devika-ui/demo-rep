// ConsumptionHighlights.js
import React from 'react';
import Chart from 'react-apexcharts';
import '../css/consumptionHighlights.scss';

const ConsumptionHighlights = () => {
  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -10,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '14px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '24px',
            show: true,
            offsetY: 16
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1', '#FFD24D', '#FF9F43', '#FF5959'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    labels: ['Application', 'Owner', 'Project', 'Business Unit']
  };

  const series = [39, 38, 27, 22];

  return (
    <div className="consumption-wrapper">
      <div className="consumption-header">
        <h2>Overall Consumption Highlights</h2>
      </div>
      <hr className="consumption-line" />
      <div className="tiles-wrapper">
        <div className="tiles-container">
          <div className="tile">
            <div className="tile-heading">Top 3 Subscriptions</div>
            <div className="tile-content">$500.25</div>
            <div className="tile-low-opacity">Total Cost</div>
          </div>
          <div className="tile">
            <div className="tile-heading">Top 3 Subscriptions</div>
            <div className="tile-content">$500.25</div>
            <div className="tile-low-opacity">Total Cost</div>
          </div>
          <div className="tile">
            <div className="tile-heading">Top 3 Subscriptions</div>
            <div className="tile-content">$500.25</div>
            <div className="tile-low-opacity">Total Cost</div>
          </div>
        </div>
        <div className="chart-container">
          <h3 className="chart-title">% Tag Compliance</h3>
          <Chart options={options} series={series} type="radialBar" height="320" />
        </div>
      </div>
    </div>
  );
};

export default ConsumptionHighlights;
