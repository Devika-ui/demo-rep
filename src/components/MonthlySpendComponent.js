import React, { useEffect, useState } from "react";
import "../css/MonthlySpendComponent.scss";
import upArrow1 from "../images/Up Arrow1.png";
import downArrow1 from "../images/Down Arrow1.png";
import api from "../api.js";

// const MonthlySpendComponent = ({ subscriptionsData }) => {
//   const [totalCost, setTotalCost] = useState(null);
//   const [growthPercentage, setGrowthPercentage] = useState(null);

// useEffect(() => {
//   if (subscriptionsData && subscriptionsData.length > 0) {
//     const fetchData = async () => {
//       // const selectedSubscription = [subscriptionsData[0]]; // Select only "subscription1"
//       try {
//         const data = await api.getMonthlyActualSpend(subscriptionsData);
//         console.log("API response:", data);
//         if (data.length > 0) {
//           setTotalCost(data[0].totalCost);
//           setGrowthPercentage(data[0].growthPercentage);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }
// }, [subscriptionsData]); // Add subscriptionsData here

// const MonthlySpendComponent = ({ subscriptionsData, selectedFilters }) => {
//   const [totalCost, setTotalCost] = useState(null);
//   const [growthPercentage, setGrowthPercentage] = useState(null);

//   useEffect(() => {
//     // Determine if we should use filters or the initial subscriptionsData
//     const hasFilters =
//       selectedFilters &&
//       selectedFilters.subscriptions &&
//       selectedFilters.subscriptions.length > 0;

//     // Reset the cost and growthPercentage when dependencies change
//     setTotalCost(null);
//     setGrowthPercentage(null);

//     if (hasFilters || (subscriptionsData && subscriptionsData.length > 0)) {
//       const fetchData = async () => {
//         try {
//           let data;

//           if (hasFilters) {
//             // If filters are available, prepare the filter parameters
//             const filterParams = {
//               BillingMonthStartDate: ["2024-07-01", "2024-08-01"], // Example dates; replace with dynamic dates if needed
//               Subscription: selectedFilters.subscriptions.map(
//                 (sub) => sub.value
//               ),
//               BusinessUnits: selectedFilters.businessUnits
//                 ? selectedFilters.businessUnits.map((bu) => bu.value)
//                 : [],
//               Locations: selectedFilters.locations
//                 ? selectedFilters.locations.map((loc) => loc.value)
//                 : [],
//               Applications: selectedFilters.applications
//                 ? selectedFilters.applications.map((app) => app.value)
//                 : [],
//               Projects: selectedFilters.projects
//                 ? selectedFilters.projects.map((proj) => proj.value)
//                 : [],
//               Environments: selectedFilters.environments
//                 ? selectedFilters.environments.map((env) => env.value)
//                 : [],
//             };

//             console.log("Fetching data with filters:", filterParams);
//             data = await api.getMonthlyActualSpend(filterParams);
//           } else {
//             // Use initial subscriptionsData if filters are not available
//             console.log(
//               "Fetching data with subscriptionsData:",
//               subscriptionsData
//             );
//             data = await api.getMonthlyActualSpend(subscriptionsData);
//           }

//           console.log("Fetched data:", data);

//           if (data.length > 0) {
//             setTotalCost(data[0].totalCost);
//             setGrowthPercentage(data[0].growthPercentage);
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [subscriptionsData, selectedFilters]);

const MonthlySpendComponent = ({ subscriptionsData, selectedFilters }) => {
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);

  useEffect(() => {
    const hasFilters =
      selectedFilters &&
      (selectedFilters.subscriptions?.length > 0 ||
        selectedFilters.businessUnits?.length > 0 ||
        selectedFilters.locations?.length > 0 ||
        selectedFilters.applications?.length > 0 ||
        selectedFilters.projects?.length > 0 ||
        selectedFilters.environments?.length > 0);

    setTotalCost(null);
    setGrowthPercentage(null);

    if (hasFilters || subscriptionsData.length > 0) {
      const fetchData = async () => {
        try {
          // Decide whether to use initial data or selected filters for API call
          const inputData = hasFilters
            ? {
                Subscriptions: selectedFilters.subscriptions.map(
                  (sub) => sub.value
                ),
                BusinessUnits:
                  selectedFilters.businessUnits?.map((bu) => bu.value) || [],
                Locations:
                  selectedFilters.locations?.map((loc) => loc.value) || [],
                Applications:
                  selectedFilters.applications?.map((app) => app.value) || [],
                Projects:
                  selectedFilters.projects?.map((proj) => proj.value) || [],
                Environments:
                  selectedFilters.environments?.map((env) => env.value) || [],
              }
            : subscriptionsData;

          const data = await api.getMonthlyActualSpend(inputData);

          if (data.length > 0) {
            setTotalCost(data[0].totalCost);
            setGrowthPercentage(data[0].growthPercentage);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [subscriptionsData, selectedFilters]);

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
          {growthPercentage !== null ? (
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
            {totalCost !== null ? (
              <strong>${totalCost.toFixed(2)}</strong>
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

export default MonthlySpendComponent;
