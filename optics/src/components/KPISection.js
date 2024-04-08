// KPISection.js
import React, { useEffect, useState } from 'react';
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import { Select, MenuItem, FormControl, Typography } from '@mui/material';
import api from '../api.js';

const KPISection = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [subscriptions, setSubscriptions] = useState([]);
  const [percentCoverage, setpercentCoverage] = useState([]); 
  const [percentUsage, setpercentUsage] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getDiscountKPI();
        setSubscriptions(subscriptionsData);
        setpercentCoverage(subscriptionsData[0].Coverage);
        setpercentUsage(subscriptionsData[1].Coverage);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="kpi-container" style={{ width: '530px', height: '270px', marginBottom: '20px' }}>
    <div className="kpi-header">
      <h4 className="kpi-title">Commitment based Discounts KPI</h4>
        <div className="kpi-dropdown">
          <FormControl>
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ height: '25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)', color:'white' }}
            >
              <MenuItem value="Select an option">Select an option</MenuItem>
              <MenuItem value="AWS">AWS</MenuItem>
              <MenuItem value="Azure">Azure</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <hr className="kpi-line" />

      <div className="kpi-bottom-container">
        <div className="kpi-graph">
          <CustomProgressBar title="% Coverage" percentage={percentCoverage} gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)" />
        </div>
        <div className="kpi-graph">
          <CustomProgressBar title="% Usage" percentage={percentUsage} gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)" />
        </div>
      </div>
    </div>
  );
};

export default KPISection;