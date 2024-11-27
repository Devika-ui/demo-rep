import React from "react";
import "../css/TotalSubscriptionsComponent.scss";

const TotalSubscriptionsComponent = ({ azureCount, selectedProvider }) => {
  // Hardcoded AWS count
  const AWSAccount = [{ "Account": 4 }];

  return (
    <div>
      {/* Title outside the container */}
      <div className="subscription-title">Total Subscriptions/Accounts</div>

      <div className="total-subscriptions-container">
        {/* Bottom Part */}
        <div className="bottom-part">
          <div className="subscription">
            <div>
              <span className="number">
                {selectedProvider === "Azure" ? azureCount : AWSAccount[0].Account}
              </span>
            </div>
            <div className="subscription-text" style={{ fontWeight: "bold" }}>
              {selectedProvider === "Azure" ? "Azure Subscriptions" : "AWS Accounts"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
