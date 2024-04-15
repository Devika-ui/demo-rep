// ConsumptionHighlights.js
import React from 'react';
import Chart from 'react-apexcharts';
import '../css/consumptionHighlights.scss';

const ConsumptionHighlights = () => {
  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '12px',
          },
          value: {
            fontSize: '10px',
          },
        },
      },
    },
    labels: ['Application', 'Owner', 'Project', 'Business Unit'],
    series: [85, 38, 27, 32],
  };
  //   chart: {
  //     type: 'radialBar',
  //     offsetY: -10,
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   plotOptions: {
  //     radialBar: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       hollow: {
  //         margin: 0,
  //         size: '70%',
  //         background: '#fff',
  //         image: undefined,
  //         imageOffsetX: 0,
  //         imageOffsetY: 0,
  //         position: 'front',
  //         dropShadow: {
  //           enabled: true,
  //           top: 3,
  //           left: 0,
  //           blur: 4,
  //           opacity: 0.24
  //         }
  //       },
  //       track: {
  //         background: '#fff',
  //         strokeWidth: '67%',
  //         margin: 0,
  //         dropShadow: {
  //           enabled: true,
  //           top: -3,
  //           left: 0,
  //           blur: 4,
  //           opacity: 0.35
  //         }
  //       },
  //       dataLabels: {
  //         show: true,
  //         name: {
  //           offsetY: -10,
  //           show: true,
  //           color: '#888',
  //           fontSize: '14px'
  //         },
  //         value: {
  //           formatter: function (val) {
  //             return parseInt(val);
  //           },
  //           color: '#111',
  //           fontSize: '24px',
  //           show: true,
  //           offsetY: 16
  //         }
  //       }
  //     }
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shade: 'dark',
  //       type: 'horizontal',
  //       shadeIntensity: 0.5,
  //       gradientToColors: ['#ABE5A1', '#FFD24D', '#FF9F43', '#FF5959'],
  //       inverseColors: true,
  //       opacityFrom: 1,
  //       opacityTo: 1,
  //       stops: [0, 100]
  //     }
  //   },
  //   labels: ['Application', 'Owner', 'Project', 'Business Unit']
  // };
 
  // const series = [39, 38, 27, 22];
 
  return (
    <div className="consumption-wrapper" style={{ width: '558px', height: '290px',marginBottom :'20px' }}>
      <div className="consumption-header" style={{ paddingTop: '0px' }}>
      <h4 style={{ color: '#5f249f', paddingLeft:'10px', fontFamily:'sans-serif' }}>Overall Consumption Highlights</h4>
      </div>
      <hr className="consumption-line" />
      <div className="tiles-wrapper" style={{ padding: '8px', paddingTop: '14px' }}>
        <div className="tiles-container" style={{paddingTop: '20px'}}>
          
           <div className="tile">
        <div>
          <div>Top 3 Subscriptions/ Accounts </div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>Top 3 Services</div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>Top 3 Applications</div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
        </div>
      </div>
          {/*
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
          */}
        </div>
        <div className="chart-container">
        <h4 style={{ marginTop: '-15px', marginBottom :'0px'}} className="chart-title">% Tag Compliance</h4>
        <div style={{marginTop:'-10px'}}>
        <Chart options={options} series={options.series} type="radialBar" height="220" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionHighlights;