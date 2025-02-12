import React, { useEffect, useState } from "react";
import "../css/TotalSubscriptionsComponent.scss";
import api from "../api.js";
import { CircularProgress } from "@mui/material";
import componentUtil from "../componentUtil.js";

const TotalSubscriptionsComponent = ({ selectedCSP }) => {
  const [totalCount, setTotalCount] = useState("");
  const [loading, setLoading] = useState(true);
  let displayTitleTxt = "",
    displayInfoTxt = "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Azure subscription count
        const azureSubscriptionData = await api.getTotalSubscription();
        const selectedCSP = componentUtil.getSelectedCSP();
        // Assuming the API returns an array with a single object containing the count
        if (selectedCSP === 0) {
          const azureCountFromAPI = Object.values(azureSubscriptionData)
            .flat()
            .reduce((sum, item) => sum + item.count, 0);

          setTotalCount(azureCountFromAPI);
        } else {
          const azureCountFromAPI = azureSubscriptionData[0]?.count;
          setTotalCount(azureCountFromAPI);
        }
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCSP]);

  switch (selectedCSP) {
    case 100:
      displayTitleTxt = "Total Subscriptions";
      displayInfoTxt = "Azure Subscriptions";
      break;
    case 110:
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
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress size={30} />
          </div>
        ) : (
          // Bottom Part
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
        )}
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
