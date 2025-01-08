import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../css/consumptionHighlights.scss";
import api from "../api.js"; // Import API function
import componentUtil from "../componentUtil.js";
import { CircularProgress } from "@mui/material";

const ConsumptionHighlights = ({ selectedCSP, inputData }) => {
  const [topSubscriptions, setTopSubscriptions] = useState([]);
  const [topApplications, setTopApplications] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tagCompliance, setTagCompliance] = useState({
    applicationpercentage: 0,
    ownerpercentage: 0,
    projectpercentage: 0,
    bupercentage: 0,
    environmentpercentage: 0,
  });
  useEffect(() => {
    const fetchConsumptionData = async () => {
      setLoading(true);
      try {
        // Decide whether to use selected filters or subscriptionsData
        const subscriptionsData1 =
          await api.getOverallConsumptionForSubscription(inputData);
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const currencySymbol = await componentUtil.getCurrencySymbol();
        setTopSubscriptions(subscriptionsData1.topsubscriptions || []);

        const applicationsData = await api.getOverallConsumptionForApplication(
          inputData
        );
        setTopApplications(applicationsData.topApplications || []);

        const servicesData = await api.getOverallConsumptionForServies(
          inputData
        );
        setTopServices(servicesData.topServices || []);

        const tagComplianceData =
          await api.getOverallConsumptionForTagCompliance(inputData);
        setTagCompliance(
          tagComplianceData || {
            applicationpercentage: 0,
            ownerpercentage: 0,
            projectpercentage: 0,
            bupercentage: 0,
            environmentpercentage: 0,
          }
        );
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
      } catch (error) {
        console.error("Error fetching overall consumption data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConsumptionData();
  }, [selectedCSP, inputData]);

  // Get costs with fallback to default
  const topSubscriptionCost =
    topSubscriptions.length > 0
      ? topSubscriptions
          .reduce((sum, sub) => sum + (sub.totalcost || 0), 0)
          .toFixed(2)
      : "0.00";
  const topServiceCost =
    topServices.length > 0
      ? topServices
          .reduce((sum, sub) => sum + (sub.totalcost || 0), 0)
          .toFixed(2)
      : "0.00";
  const topApplicationCost =
    topApplications.length > 0
      ? topApplications
          .reduce((sum, sub) => sum + (sub.totalcost || 0), 0)
          .toFixed(2)
      : "0.00";
  // Chart options
  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "12px" },
          value: { fontSize: "10px" },
        },
      },
    },
    labels: ["Application", "Owner", "Project", "Business Unit", "Environment"],
    series: [
      (tagCompliance.applicationpercentage * 100).toFixed(2),
      (tagCompliance.ownerpercentage * 100).toFixed(2),
      (tagCompliance.projectpercentage * 100).toFixed(2),
      (tagCompliance.bupercentage * 100).toFixed(2),
      (tagCompliance.environmentpercentage * 100).toFixed(2),
    ],
  };

  return (
    <div className="consumption-container">
      <div className="top">
        <strong>Overall Consumption Highlights</strong>
      </div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="consumption-highlights-wrapper">
          <div className="tiles">
            <div className="tile">
              <div className="tilename">
                {selectedCSP === 1 ? "Top Subscriptions" : "Top Accounts"}
              </div>
              <div className="price">
                {currencyPreference === "start"
                  ? `${currencySymbol}${topSubscriptionCost}`
                  : `${topSubscriptionCost}${currencySymbol}`}
              </div>
            </div>
            <div className="tile">
              <div className="tilename">Top Service</div>
              <div className="price">
                {currencyPreference === "start"
                  ? `${currencySymbol}${topServiceCost}`
                  : `${topServiceCost}${currencySymbol}`}
              </div>
            </div>
            <div className="tile">
              <div className="tilename">Top Application</div>
              <div className="price">
                {currencyPreference === "start"
                  ? `${currencySymbol}${topApplicationCost}`
                  : `${topApplicationCost}${currencySymbol}`}
              </div>
            </div>
          </div>

          <div className="tag-compliance">
            <h4>% Tag Compliance</h4>
            <Chart
              options={options}
              series={options.series}
              type="radialBar"
              height="200px"
              width="200px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumptionHighlights;
