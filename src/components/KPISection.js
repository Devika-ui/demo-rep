import React, { useEffect, useState } from "react";
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import api from "../api.js";

const KPISection = ({ selectedCSP, inputData }) => {
  const [percentCoverage, setPercentCoverage] = useState(0);
  const [percentUsage, setPercentUsage] = useState(0);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const coverageData = await api.getDiscountKPICoverage(inputData);
        setPercentCoverage(coverageData.coverage);
        const usageData = await api.getDiscountKPIUsage();
        setPercentUsage(usageData.usage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };  
      fetchData();
  }, [selectedCSP]);

  return (
    <div className="kpi-section">
      <div className="kpi-heading-container">
        <strong className="kpi-heading">Commitment based Discounts KPI</strong>
      </div>

      {/* New Container for KPI Graphs */}
      <div className="kpi-container">
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
