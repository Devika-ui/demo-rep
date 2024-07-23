import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "../css/MonthlySpendComponent.scss";
import iIcon from "../images/Iicon.png";
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
        // Handle error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const GrowthIndicator = ({ growthPercentage }) => {
    let imageSrc;
    let altText;
    console.log("uparrow", upArrow1);

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
    // console.log("Growth Percentage in Indicator:", growthPercentage);
    // console.log("Image Source:", imageSrc);

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
          {growthPercentage !== null ? (
            <strong>{growthPercentage.toFixed(2)}%</strong>
          ) : (
            <strong>N/A</strong>
          )}
        </div>
        <div style={{ fontWeight: "bold" }}>Over last month</div>
      </div>
    );
  };

  return (
    <div className="monthly-spend-container" style={{ width: "29.5%" }}>
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
