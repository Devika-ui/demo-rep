import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "../css/MonthlySpendComponent.scss";
import iIcon from "../images/Iicon.png";
import upArrow from "../images/Up Arrow.png";
import downArrow from "../images/Down Arrow.png";
import api from "../api.js";

const MonthlyForecastComponent = () => {
  const [lastMonthCost, setLastMonthCost] = useState(null);
  const [futureCost, setFutureCost] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecastData = await api.getMonthlyForecastSpend();
        if (forecastData.length > 0) {
          const lastMonth = forecastData[0].lastMonthCost;
          const future = forecastData[0].futureCost;
          setLastMonthCost(lastMonth);
          setFutureCost(future);
          setPercentageIncrease(forecastData[0].percentageIncrease);
          setTotalCost(lastMonth + future);
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  const GrowthIndicator = ({ percentageIncrease }) => {
    let imageSrc;
    let altText;

    if (percentageIncrease > 0) {
      imageSrc = upArrow;
      altText = "Upward Trend";
    } else if (percentageIncrease < 0) {
      imageSrc = downArrow;
      altText = "Downward Trend";
    } else {
      imageSrc = null;
      altText = "No Change";
    }
    return (
      <div className="right">
        <div style={{ display: "flex", alignItems: "center" }}>
          {percentageIncrease !== null ? (
            <strong>{percentageIncrease.toFixed(2)}%</strong>
          ) : (
            <strong>N/A</strong>
          )}
          {imageSrc && (
            <span className="icon" style={{ marginLeft: "8px" }}>
              <img
                src={imageSrc}
                alt={altText}
                style={{ width: "20px", height: "20px" }}
              />
            </span>
          )}
        </div>
        <div>Over last month</div>
      </div>
    );
  };

  return (
    <div className="monthly-forecast-container" style={{ width: "28.5%" }}>
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{ fontFamily: "sans-serif" }}>Monthly Forecast</strong>
        </div>
        <div className="right">
          <Tooltip title="Monthly Forecast">
            <img
              style={{ height: "16px", width: "16px" }}
              src={iIcon}
              alt="I-icon"
            />
          </Tooltip>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="left">
          {totalCost !== null ? (
            <strong>${totalCost.toFixed(2)}</strong>
          ) : (
            <strong>Loading...</strong>
          )}
        </div>
        {/* <div className="right">
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <span className="icon">
              <img src={upArrow} alt="AzureLogo" />
            </span>
            {percentageIncrease !== null ? (
              <strong>{percentageIncrease.toFixed(2)}%</strong>
            ) : (
              <strong>N/A</strong>
            )}
          </div>
          <div>Over last month</div>
        </div> */}
        <GrowthIndicator percentageIncrease={percentageIncrease} />
      </div>
    </div>
  );
};

export default MonthlyForecastComponent;
