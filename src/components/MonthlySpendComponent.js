import React, { useState, useEffect } from "react";
import "../css/MonthlySpendComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import api from "../api.js";

const MonthlySpendComponent = ({ selectedProvider, inputData }) => {
  console.log("inputData", inputData);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Track overlay visibility
  const [billSummary, setBillSummary] = useState({
    Payasyougocost: 0,
    reservedInstancesCost: "NA",
    saasCost: "NA",
    marketPurchasesCost: "NA",
    savingsPlanCost: "NA",
    totalBill: 0,
  });

  // Handle card click to open overlay and set bill summary details
  const handleCardClick = () => {
    setIsOverlayOpen(true);
    setBillSummary({
      Payasyougocost: totalCost?.toFixed(2) || 0,
      reservedInstancesCost: "NA",
      saasCost: "NA",
      marketPurchasesCost: "NA",
      savingsPlanCost: "NA",
      totalBill: totalCost?.toFixed(2) || 0,
    });
  };

  // Close the overlay
  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };

  // Component to handle growth indicator logic
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
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getMonthlyActualSpend(inputData);
      if (data.length > 0) {
        setTotalCost(data[0].totalCost);
        setGrowthPercentage(data[0].growthPercentage);
      }
    };
    fetchData();
  }, [selectedProvider, inputData]);

  return (
    <div className="monthly-spend-container">
      <div className="title">
        <strong style={{ fontFamily: "sans-serif" }}>
          Monthly Actual Spend
        </strong>
      </div>

      {/* Main wrapper with click event */}
      <div
        className="content-wrapper"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        {/* Card 1: Actual Spend */}
        <div className="first">
          <div className="number">
            {totalCost !== null && totalCost !== undefined ? (
              <strong>{totalCost.toFixed(2)}</strong>
            ) : (
              <strong>Loading...</strong>
            )}
          </div>
        </div>

        {/* Card 2: Growth */}
        <div className="second">
          <div className="indicator">
            <GrowthIndicator growthPercentage={growthPercentage} />
          </div>
        </div>
      </div>

      {/* Overlay for expanded view */}
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-box">
            <IconButton onClick={handleOverlayClose} className="close-overlay">
              <CloseIcon />
            </IconButton>
            <h3>Bill Cost Split Summary</h3>
            <div
              style={{
                border: "1px solid lightgrey",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p style={{ color: "#0056b3" }}>
                Pay-as-you-go Cost:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.Payasyougocost || "NA"}
                </span>
              </p>
              <p style={{ color: "#ff5722" }}>
                Reserved Instances Cost:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.reservedInstancesCost || "NA"}
                </span>
              </p>
              <p style={{ color: "#8bc34a" }}>
                SaaS Subscription Cost:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.saasCost || "NA"}
                </span>
              </p>
              <p style={{ color: "grey" }}>
                Market Purchases Cost:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.marketPurchasesCost || "NA"}
                </span>
              </p>
              <p style={{ color: "#388e3c" }}>
                Savings Plan Cost:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.savingsPlanCost || "NA"}
                </span>
              </p>
              <p style={{ color: "#9c27b0" }}>
                Total Bill:{" "}
                <span style={{ marginLeft: "10px" }}>
                  {billSummary.totalBill || "NA"}
                </span>
              </p>
            </div>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default MonthlySpendComponent;
