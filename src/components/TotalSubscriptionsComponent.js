import React, { useEffect, useState } from "react";
import "../css/TotalSubscriptionsComponent.scss";
import api from "../api.js";

const TotalSubscriptionsComponent = () => {
  const [azureCount, setAzureCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Azure subscription count
        const azureSubscriptionData = await api.getTotalSubscription();
        // Assuming the API returns an array with a single object containing the count
        const azureCountFromAPI = azureSubscriptionData[0]?.Subscription;

        // Set Azure count
        setAzureCount(azureCountFromAPI);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  // Hardcoded AWS count
  const awsCount = 2;

  return (
    <div>
      {/* Title outside the container */}
      <div className="subscription-title">Total Subscriptions/Accounts</div>

      <div className="total-subscriptions-container">
        {/* Bottom Part */}
        <div className="bottom-part">
          <div className="subscription">
            <div>
              <span className="number">{azureCount}</span>
            </div>
            <div className="subscription-text" style={{ fontWeight: "bold" }}>
              Azure Subscriptions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
