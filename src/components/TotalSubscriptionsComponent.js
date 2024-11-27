import React, { useEffect, useState } from "react";
import "../css/TotalSubscriptionsComponent.scss";
import api from "../api.js";

const TotalSubscriptionsComponent = ({selectedCSP}) => {
  const [totalCount,setTotalCount] = useState("");
  let displayTitleTxt = "", displayInfoTxt="";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Azure subscription count
        const azureSubscriptionData = await api.getTotalSubscription();
        // Assuming the API returns an array with a single object containing the count
          const azureCountFromAPI = azureSubscriptionData[0]?.count;
          setTotalCount(azureCountFromAPI);
        
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, [selectedCSP]);
  
  switch (selectedCSP) {
    case 1:
      displayTitleTxt = "Total Subscriptions";
      displayInfoTxt = "Azure Subscriptions"
      break;
    case 2:
      displayTitleTxt = "Total Accounts";
      displayInfoTxt = "AWS Accounts";
      break;
    default:
      displayTitleTxt = "Total Subscriptions/Accounts";
      displayInfoTxt = "Subscriptions/Accounts";
  }
  return (
    <div>
      {/* Title outside the container */}
      <div className="subscription-title">{displayTitleTxt}</div>

      <div className="total-subscriptions-container">
        {/* Bottom Part */}
        <div className="bottom-part">
          <div className="subscription">
            <div>
              <span className="number">{totalCount}</span>
            </div>
            <div className="subscription-text" style={{ fontWeight: "bold" }}>
              {displayInfoTxt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
