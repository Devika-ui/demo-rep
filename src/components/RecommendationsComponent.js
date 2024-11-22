import React from "react";
import "../css/RecommendationsComponent.scss";

const RecommendationsComponent = ({ recommendations = [] }) => {
  const totalSavings = recommendations
    .reduce((total, rec) => total + rec.value, 0)
    .toFixed(2);

  return (
    <>
      <div className="heading">
        <strong>Top 3 Recommendations</strong>
      </div>
      <div className="recommendations-container">
        <div className="filter-section">
          <strong><div className="subheading">Show Recommendations by</div></strong>
        </div>
        <div className="tiles">
          {recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="tile1">
              <div className="titlename">{rec.name}</div>
              <div className="content">
                <div className="price1">{rec.value.toFixed(2)}</div>
                <div className="savings">Savings Potential</div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-savings">
          <div className="total-savings-text">Total Savings Potential</div>
          <div className="total-savings-amount">{totalSavings}</div>
        </div>
      </div>
    </>
  );
};

export default RecommendationsComponent;
