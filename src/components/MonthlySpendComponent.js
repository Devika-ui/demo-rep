import React from "react";
import "../css/MonthlySpendComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";

const MonthlySpendComponent = ({ subscriptionsData, selectedFilters, totalCost, growthPercentage }) => {
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
          {growthPercentage !== null && growthPercentage !== undefined ? (
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
            {totalCost !== null && totalCost !== undefined ? (
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

MonthlySpendComponent.defaultProps = {
  totalCost: 0,
  growthPercentage: 0,
};

export default MonthlySpendComponent;
