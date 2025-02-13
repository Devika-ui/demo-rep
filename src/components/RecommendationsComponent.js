import React, { useState, useEffect } from "react";
import "../css/RecommendationsComponent.scss";
import api from "../api.js";
import componentUtil from "../componentUtil.js";
import { CircularProgress } from "@mui/material";

const RecommendationsComponent = ({ selectedCSP }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalSavings = recommendations
    .reduce((total, rec) => total + rec.value, 0)
    .toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getRecommendations();
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const selectedCSP = componentUtil.getSelectedCSP();
        if (selectedCSP === 0) {
          const data = Object.values(response).flat();
          setRecommendations(
            data.sort((a, b) => b.value - a.value).slice(0, 3)
          );
        } else setRecommendations(response);
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
      } catch (error) {
        console.error("Error fetching Azure recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCSP]);

  return (
    <>
      <div className="heading">
        <strong>Top 3 Recommendations</strong>
      </div>
      <div className="recommendations-container">
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="filter-section">
              <strong>
                <div className="subheading">Show Recommendations by</div>
              </strong>
            </div>
            <div className="tiles">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="tile1">
                  <div className="titlename">{rec.name}</div>
                  <div className="content">
                    <div className="price1">
                      {currencyPreference === "start"
                         ? `${currencySymbol}${rec.value.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                         : `${rec.value.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`}
                    </div>
                    <div className="savings">Savings Potential</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-savings">
              <div className="total-savings-text">Total Savings Potential</div>
              <div className="total-savings-amount">
                {currencyPreference === "start"
                   ? `${currencySymbol}${Number(totalSavings).toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                   : `${Number(totalSavings).toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecommendationsComponent;
