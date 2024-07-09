import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "../css/MonthlySpendComponent.scss";
import iIcon from "../images/Iicon.png";
import upArrow from "../images/Up Arrow.png";
import downArrow from "../images/Down Arrow.png";
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
        // Handle error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const GrowthIndicator = ({ growthPercentage }) => {
    let imageSrc;
    let altText;

    if (growthPercentage > 0) {
      imageSrc = upArrow;
      altText = "Upward Trend";
    } else if (growthPercentage < 0) {
      imageSrc = downArrow;
      altText = "Downward Trend";
    } else {
      imageSrc = null;
      altText = "No Change";
    }
    // console.log("Growth Percentage in Indicator:", growthPercentage);
    // console.log("Image Source:", imageSrc);

    return (
      <div className="right">
        <div style={{ display: "flex", alignItems: "center" }}>
          {growthPercentage !== null ? (
            <strong>{growthPercentage.toFixed(2)}%</strong>
          ) : (
            <strong>N/A</strong>
          )}
          {imageSrc && (
            <span className="icon" style={{ marginLeft: "8px" }}>
              <img
                src={imageSrc}
                alt={altText}
                style={{ width: "16px", height: "20px" }}
              />
            </span>
          )}
        </div>
        <div>Over last month</div>
      </div>
    );
  };

  return (
    <div className="monthly-spend-container" style={{ width: "28%" }}>
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{ fontFamily: "sans-serif" }}>
            Monthly Actual Spend
          </strong>
        </div>
        <div className="right">
          <Tooltip title="Monthly Spend">
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
        <GrowthIndicator growthPercentage={growthPercentage} />
      </div>
    </div>
  );
};

export default MonthlySpendComponent;
