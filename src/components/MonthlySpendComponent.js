import React, { useEffect, useState } from "react";
import "../css/MonthlySpendComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import api from "../api.js";

const MonthlySpendComponent = () => {
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getMonthlyActualSpend();
        if (subscriptionsData.length > 0) {
          setTotalCost(subscriptionsData[0].totalCost);
          setGrowthPercentage(subscriptionsData[0].growthPercentage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
        <div className="growth-info">
          {imageSrc && (
            <span className="icon">
              <img src={imageSrc} alt={altText} />
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
              <strong>${totalCost.toFixed(2)}</strong>
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
