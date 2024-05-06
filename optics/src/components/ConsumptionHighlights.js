// ConsumptionHighlights.js
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../css/consumptionHighlights.scss';
import api from '../api.js'; // Import API function
 
const ConsumptionHighlights = () => {
  const [consumptionData, setConsumptionData] = useState(null);
 
  useEffect(() => {
    const fetchConsumptionData = async () => {
      try {
        const data = await api.getOverallConsumption();
        setConsumptionData(data);
      } catch (error) {
        console.error('Error fetching overall consumption data:', error);
      }
    };
 
    fetchConsumptionData();
  }, []);

  if (consumptionData === null) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }
 
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
    series: [
      consumptionData[0].Application,
      consumptionData[0].Owner,
      consumptionData[0].Project,
      consumptionData[0].BuisnessUnit,
    ],
  };
 
  return (
    <div className="consumption-wrapper" style={{ width: '558px', height: '290px', marginBottom: '20px' }}>
      <div className="consumption-header" style={{ paddingTop: '0px' }}>
        <h4 style={{ color: '#5f249f', paddingLeft: '10px', fontFamily: 'sans-serif' }}>Overall Consumption Highlights</h4>
      </div>
      <hr className="consumption-line" />
      <div className="tiles-wrapper" style={{ padding: '8px', paddingTop: '14px' }}>
        <div className="tiles-container" style={{ paddingTop: '20px' }}>
          <div className="tile">
            <div>
              <div>Top 3 Subscriptions/ Accounts</div>
            </div>
            <div className="content">
              <div className="price">${consumptionData[0].Top3_Subscriptions}</div>
            </div>
          </div>
          <div className="tile">
            <div>
              <div>Top 3 Services</div>
            </div>
            <div className="content">
              <div className="price">${consumptionData[0].Top3_Services}</div>
            </div>
          </div>
          <div className="tile">
            <div>
              <div>Top 3 Applications</div>
            </div>
            <div className="content">
              <div className="price">${consumptionData[0].Top3_Applications}</div>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h4 style={{ marginTop: '-15px', marginBottom: '0px' }} className="chart-title">% Tag Compliance</h4>
          <div style={{ marginTop: '-10px' }}>
            <Chart options={options} series={options.series} type="radialBar" height="220" />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ConsumptionHighlights;