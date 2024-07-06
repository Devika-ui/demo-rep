import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../css/consumptionHighlights.scss';
import api from '../api.js'; // Import API function
 
const ConsumptionHighlights = () => {
  const [topSubscriptions, setTopSubscriptions] = useState(null);
  const [topApplications, setTopApplications] = useState(null);
  const [topServices, setTopServices] = useState(null);
  const [tagCompliance, setTagCompliance] = useState(null);
 
  useEffect(() => {
    const fetchConsumptionData = async () => {
      try {
        const subscriptionsData = await api.getOverallConsumptionForSubscription();
        setTopSubscriptions(subscriptionsData.topsubscriptions);
 
        const applicationsData = await api.getOverallConsumptionForApplication();
        setTopApplications(applicationsData.topApplications);
 
        const servicesData = await api.getOverallConsumptionForServies();
        setTopServices(servicesData.topServices);
 
        const tagComplianceData = await api.getOverallConsumptionForTagCompliance();
        setTagCompliance(tagComplianceData);
      } catch (error) {
        console.error('Error fetching overall consumption data:', error);
      }
    };
 
    fetchConsumptionData();
  }, []);
 
  if (!topSubscriptions || !topApplications || !topServices || !tagCompliance) {
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
    labels: ['Application', 'Owner', 'Project', 'Business Unit','Environment'],
    series: [
      (tagCompliance.applicationpercentage * 100).toFixed(2),
      (tagCompliance.ownerpercentage * 100).toFixed(2),
      (tagCompliance.projectpercentage * 100).toFixed(2),
      (tagCompliance.bupercentage * 100).toFixed(2),
      (tagCompliance.environmentpercentage * 100).toFixed(2)
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
              <div>Top Subscription</div>
            </div>
            <div className="content">
              <div className="price">${topSubscriptions[0].totalcost.toFixed(2)}</div>
            </div>
          </div>
          <div className="tile">
            <div>
              <div>Top Service</div>
            </div>
            <div className="content">
              <div className="price">${topServices[0].totalcost.toFixed(2)}</div>
            </div>
          </div>
          <div className="tile">
            <div>
              <div>Top Application</div>
            </div>
            <div className="content">
              <div className="price">${topApplications[0].totalcost.toFixed(2)}</div>
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