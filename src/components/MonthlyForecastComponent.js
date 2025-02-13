import React, { useEffect, useState } from "react";
import { Tooltip, CircularProgress } from "@mui/material";
import "../css/MonthlyForecastComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import componentUtil from "../componentUtil.js";
import api from "../api.js";

const MonthlyForecastComponent = ({ selectedCSP, inputData, billingMonth }) => {
  const [lastMonthCost, setLastMonthCost] = useState(null);
  const [futureCost, setFutureCost] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(null);
  const [totalCost1, setTotalCost1] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);

      try {
        const forecastData = await api.getMonthlyForecastSpend(
          inputData,
          billingMonth
        );
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const selectedCSP = componentUtil.getSelectedCSP();

        if (selectedCSP === 0) {
          const lastMonth = Object.values(forecastData)
            .flat()
            .reduce((sum, provider) => sum + provider.lastMonthCost, 0);
          const latestFutureCostData = Object.values(forecastData)
            .flat()
            .reduce(
              (acc, provider) => {
                if (provider.futureCosts.length > 0) {
                  const latestFutureCost = provider.futureCosts.at(-1); // Get the latest month data

                  acc.futureCost += latestFutureCost.futureCost;
                  acc.percentageIncrease += latestFutureCost.percentageIncrease;
                  acc.latestMonth = latestFutureCost.month; // Store the latest month
                }
                return acc;
              },
              {
                futureCost: 0,
                percentageIncrease: 0,
                latestMonth: null,
              }
            );

          setLastMonthCost(lastMonth);
          setFutureCost(latestFutureCostData.futureCost);
          setPercentageIncrease(latestFutureCostData.percentageIncrease);
          setTotalCost1(lastMonth + latestFutureCostData.futureCost);
          setCurrencySymbol(currencySymbol);
          setCurrencyPreference(currencyPreference);
        } else {
          if (forecastData.length > 0) {
            const lastMonth = forecastData[0].lastMonthCost;
            const latestFutureCostData = forecastData[0].futureCosts.at(-1); // Get the latest month data
            setLastMonthCost(lastMonth);
            setFutureCost(latestFutureCostData.futureCost);
            setPercentageIncrease(latestFutureCostData.percentageIncrease);
            setTotalCost1(lastMonth + latestFutureCostData.futureCost);
            setCurrencySymbol(currencySymbol);
            setCurrencyPreference(currencyPreference);
          } else {
            setLastMonthCost(0);
            setFutureCost(0);
            setTotalCost1(0);
            setPercentageIncrease(0);
          }
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCSP, inputData, billingMonth]);

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
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            width: "90%",
          }}
        >
          {imageSrc && (
            <span className="icon" style={{ marginLeft: "0px" }}>
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
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="content-wrapper">
          <div className="container-1">
            <div className="number">
              {totalCost1 !== null ? (
                <strong>
                  {currencyPreference === "start"
                    ? `${currencySymbol}${totalCost1.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `${totalCost1.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`}
                </strong>
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
      )}
    </div>
  );
};

export default MonthlyForecastComponent;
