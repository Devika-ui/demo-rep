// KPISection.js
import React, { useEffect, useState } from "react";
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";
import api from "../api.js";

const KPISection = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [percentCoverage, setPercentCoverage] = useState(0);
  const [percentUsage, setPercentUsage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coverageData = await api.getDiscountKPICoverage();
        setPercentCoverage(coverageData.coverage);

        const usageData = await api.getDiscountKPIUsage();
        setPercentUsage(usageData.usage);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "-15px" }}>
      <div className="top-part">
        <strong style={{ fontFamily: "sans-serif" }}>
          Commitment based Discounts KPI
        </strong>
      </div>
      <div
        className="kpi-container"
        style={{ width: "360px", height: "200px", marginBottom: "20px" }}
      >
        {/* <div className="kpi-dropdown">
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
        </div> */}

        <div className="kpi-bottom-container">
          <div className="kpi-graph">
            <CustomProgressBar
              title="% Coverage"
              percentage={parseFloat(percentCoverage).toFixed(2)}
              gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)"
            />
          </div>
          <div className="kpi-graph">
            <CustomProgressBar
              title="% Usage"
              percentage={parseFloat(percentUsage).toFixed(2)}
              gradientColor="conic-gradient(from 0deg, rgba(62, 152, 199, 0.8) 0%, rgba(62, 152, 199, 0.8) 72%, rgba(255, 0, 0, 0.8) 72%, rgba(255, 0, 0, 0.8) 100%)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPISection;
