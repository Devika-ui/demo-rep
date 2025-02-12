import React, { useEffect, useState } from "react";
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import api from "../api.js";
import { CircularProgress } from "@mui/material";
import componentUtil from "../componentUtil.js";

const KPISection = ({
  selectedCSP,
  inputData,
  billingMonth,
  startDate,
  endDate,
}) => {
  const [percentCoverage, setPercentCoverage] = useState(0);
  const [percentUsage, setPercentUsage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (billingMonth.length == 0 || !startDate || !endDate) {
        return;
      }

      setLoading(true);
      try {
        const coverageData = await api.getDiscountKPICoverage(
          inputData,
          billingMonth
        );
        const selectedCSP = componentUtil.getSelectedCSP();
        // Assuming the API returns an array with a single object containing the count
        if (selectedCSP === 0) {
          setPercentCoverage(
            Object.values(coverageData).reduce(
              (sum, item) => sum + item.coverage,
              0
            )
          );
        } else {
          setPercentCoverage(coverageData.coverage ?? 0);
        }
        const usageData = await api.getDiscountKPIUsage(startDate, endDate);
        if (selectedCSP === 0) {
          setPercentUsage(
            Object.values(usageData).reduce((sum, item) => sum + item.usage, 0)
          );
        } else setPercentUsage(usageData.usage ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCSP, billingMonth, startDate, endDate]);

  return (
    <div className="kpi-section">
      <div className="kpi-heading-container">
        <strong className="kpi-heading">Commitment based Discounts KPI</strong>
      </div>

      {/* New Container for KPI Graphs */}
      <div className="kpi-container">
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default KPISection;
