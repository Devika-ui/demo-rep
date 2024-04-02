// KPISection.js
import React, { useState } from "react";
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import { Select, MenuItem, FormControl, Typography } from '@mui/material';

const KPISection = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="kpi-container" style={{ width: '520px', height: '365px', marginBottom: '20px' }}>
      <div className="kpi-header">
        <h3 className="kpi-title">Commitment based Discounts KPI</h3>
        <div className="kpi-dropdown">
          <FormControl>
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ height: '25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)' }}
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
          <CustomProgressBar title="% Coverage" percentage={72} gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)" />
        </div>
        <div className="kpi-graph">
          <CustomProgressBar title="% Usage" percentage={72} gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)" />
        </div>
      </div>
    </div>
  );
};

export default KPISection;