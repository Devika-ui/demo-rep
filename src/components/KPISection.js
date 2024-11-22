import React, { useEffect, useState } from "react";
import CustomProgressBar from "./CustomProgressBar";
import "../css/kpiSection.scss";
import api from "../api.js";

const KPISection = ({ subscriptionsData, selectedFilters,percentCoverage,percentUsage }) => {
  // const [percentCoverage, setPercentCoverage] = useState(0);
  // const [percentUsage, setPercentUsage] = useState(0);

  // useEffect(() => {
  //   const hasFilters =
  //     selectedFilters &&
  //     (selectedFilters.subscriptions?.length > 0 ||
  //       selectedFilters.businessUnits?.length > 0 ||
  //       selectedFilters.locations?.length > 0 ||
  //       selectedFilters.applications?.length > 0 ||
  //       selectedFilters.projects?.length > 0 ||
  //       selectedFilters.environments?.length > 0);

  //   const fetchData = async () => {
  //     try {
  //       const inputData = hasFilters
  //         ? {
  //             Subscriptions: selectedFilters.subscriptions.map(
  //               (sub) => sub.value
  //             ),
  //             BusinessUnits:
  //               selectedFilters.businessUnits?.map((bu) => bu.value) || [],
  //             Locations:
  //               selectedFilters.locations?.map((loc) => loc.value) || [],
  //             Applications:
  //               selectedFilters.applications?.map((app) => app.value) || [],
  //             Projects:
  //               selectedFilters.projects?.map((proj) => proj.value) || [],
  //             Environments:
  //               selectedFilters.environments?.map((env) => env.value) || [],
  //           }
  //         : subscriptionsData;

  //       const coverageData = await api.getDiscountKPICoverage(inputData);
  //       setPercentCoverage(coverageData.coverage);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   if (hasFilters || subscriptionsData.length > 0) {
  //     fetchData();
  //   }
  // }, [subscriptionsData, selectedFilters]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const usageData = await api.getDiscountKPIUsage();
  //       setPercentUsage(usageData.usage);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
