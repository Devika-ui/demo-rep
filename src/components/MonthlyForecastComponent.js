import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "../css/MonthlyForecastComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import api from "../api.js";

const MonthlyForecastComponent = ({ subscriptionsData }) => {
  const [lastMonthCost, setLastMonthCost] = useState(null);
  const [futureCost, setFutureCost] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecastData = await api.getMonthlyForecastSpend(
          subscriptionsData
        );
        if (forecastData.length > 0) {
          const lastMonth = forecastData[0].lastMonthCost;
          const latestFutureCostData = forecastData[0].futureCosts.at(-1); // Get the latest month data

          setLastMonthCost(lastMonth);
          setFutureCost(latestFutureCostData.futureCost);
          console.log(lastMonth, latestFutureCostData.futureCost);
          setPercentageIncrease(latestFutureCostData.percentageIncrease);
          setTotalCost(lastMonth + latestFutureCostData.futureCost);
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };
    fetchData();
  }, []);

  const GrowthIndicator = ({ percentageIncrease }) => {
    let imageSrc;
    let altText;

    if (percentageIncrease > 0) {
      imageSrc = upArrow1;
      altText = "Upward Trend";
    } else if (percentageIncrease < 0) {
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
            <span className="icon" style={{ marginLeft: "8px" }}>
              <img
                src={imageSrc}
                alt={altText}
                style={{ width: "27px", height: "20px" }}
              />
            </span>
          )}
          {typeof percentageIncrease === "number" ? (
            <strong>{percentageIncrease.toFixed(2)}%</strong>
          ) : (
            <strong>N/A</strong>
          )}
        </div>
        <div className="container-2-bottom">Over last month</div>
      </div>
    );
  };

  return (
    <div className="monthly-forecast-container">
      <div className="title">
        <strong style={{ fontFamily: "sans-serif" }}>Monthly Forecast</strong>
      </div>
      <div className="content-wrapper">
        <div className="container-1">
          <div className="number">
            {totalCost !== null ? (
              <strong>${totalCost.toFixed(2)}</strong>
            ) : (
              <strong>Loading...</strong>
            )}
          </div>
        </div>
        <div className="container-2">
          <div className="indicator">
            <GrowthIndicator percentageIncrease={percentageIncrease} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyForecastComponent;
