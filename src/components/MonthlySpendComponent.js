import React, { useEffect, useState } from "react";
import "../css/MonthlySpendComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import api from "../api.js";

const MonthlySpendComponent = ({ subscriptionsData, selectedFilters }) => {
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);

  useEffect(() => {
    const hasFilters =
      selectedFilters &&
      (selectedFilters.subscriptions?.length > 0 ||
        selectedFilters.businessUnits?.length > 0 ||
        selectedFilters.locations?.length > 0 ||
        selectedFilters.applications?.length > 0 ||
        selectedFilters.projects?.length > 0 ||
        selectedFilters.environments?.length > 0);

    setTotalCost(null);
    setGrowthPercentage(null);

    if (hasFilters || subscriptionsData.length > 0) {
      const fetchData = async () => {
        try {
          const inputData = hasFilters
            ? {
                Subscriptions: selectedFilters.subscriptions.map(
                  (sub) => sub.value
                ),
                BusinessUnits:
                  selectedFilters.businessUnits?.map((bu) => bu.value) || [],
                Locations:
                  selectedFilters.locations?.map((loc) => loc.value) || [],
                Applications:
                  selectedFilters.applications?.map((app) => app.value) || [],
                Projects:
                  selectedFilters.projects?.map((proj) => proj.value) || [],
                Environments:
                  selectedFilters.environments?.map((env) => env.value) || [],
              }
            : subscriptionsData;

          const data = await api.getMonthlyActualSpend(inputData);

          if (data.length > 0) {
            setTotalCost(data[0].totalCost);
            setGrowthPercentage(data[0].growthPercentage);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [subscriptionsData, selectedFilters]);

  const GrowthIndicator = ({ growthPercentage }) => {
    let imageSrc;
    let altText;

    if (growthPercentage > 0) {
      imageSrc = upArrow1;
      altText = "Upward Trend";
    } else if (growthPercentage < 0) {
      imageSrc = downArrow1;
      altText = "Downward Trend";
    } else {
      imageSrc = null;
      altText = "No Change";
    }

    return (
      <div className="right">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
          {imageSrc && (
            <span className="icon" style={{ marginLeft: "3px" }}>
              <img
                src={imageSrc}
                alt={altText}
                style={{ width: "27px", height: "20px" }}
              />
            </span>
          )}
          {growthPercentage !== null ? (
            <strong>{growthPercentage.toFixed(2)}%</strong>
          ) : (
            <strong>N/A</strong>
          )}
        </div>
        <div className="second-bottom">Over last month</div>
      </div>
    );
  };

  return (
    <div className="monthly-spend-container">
      <div className="title">
        <strong style={{ fontFamily: "sans-serif" }}>
          Monthly Actual Spend
        </strong>
      </div>
      <div className="content-wrapper">
        <div className="first">
          <div className="number">
            {totalCost !== null ? (
              <strong>{totalCost.toFixed(2)}</strong>
            ) : (
              <strong>Loading...</strong>
            )}
          </div>
        </div>
        <div className="second">
          <div className="indicator">
            <GrowthIndicator growthPercentage={growthPercentage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySpendComponent;
