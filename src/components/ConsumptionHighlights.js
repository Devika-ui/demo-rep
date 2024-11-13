import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../css/consumptionHighlights.scss";
import api from "../api.js"; // Import API function

const ConsumptionHighlights = ({ subscriptionsData }) => {
  const [topSubscriptions, setTopSubscriptions] = useState([]);
  const [topApplications, setTopApplications] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [tagCompliance, setTagCompliance] = useState({
    applicationpercentage: 0,
    ownerpercentage: 0,
    projectpercentage: 0,
    bupercentage: 0,
    environmentpercentage: 0,
  });

  useEffect(() => {
    if (subscriptionsData && subscriptionsData.length > 0) {
      const fetchConsumptionData = async () => {
        try {
          const subscriptionsData1 =
            await api.getOverallConsumptionForSubscription(subscriptionsData);
          setTopSubscriptions(subscriptionsData1.topsubscriptions || []);

          const applicationsData =
            await api.getOverallConsumptionForApplication(subscriptionsData);

          setTopApplications(applicationsData.topApplications || []);

          const servicesData = await api.getOverallConsumptionForServies(
            subscriptionsData
          );
          setTopServices(servicesData.topServices || []);

          const tagComplianceData =
            await api.getOverallConsumptionForTagCompliance(subscriptionsData);
          setTagCompliance(
            tagComplianceData || {
              applicationpercentage: 0,
              ownerpercentage: 0,
              projectpercentage: 0,
              bupercentage: 0,
              environmentpercentage: 0,
            }
          );
        } catch (error) {
          console.error("Error fetching overall consumption data:", error);
        }
      };

      fetchConsumptionData();
    }
  }, [subscriptionsData]);

  // Get costs with fallback to default
  const topSubscriptionCost =
    topSubscriptions.length > 0
      ? topSubscriptions[0].totalcost.toFixed(2)
      : "0.00";
  const topServiceCost =
    topServices.length > 0 ? topServices[0].totalcost.toFixed(2) : "0.00";
  const topApplicationCost =
    topApplications.length > 0
      ? topApplications[0].totalcost.toFixed(2)
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

      <div className="consumption-highlights-wrapper">
        <div className="tiles">
          <div className="tile">
            <div className="tilename">Top Subscription</div>
            <div className="price">${topSubscriptionCost}</div>
          </div>
          <div className="tile">
            <div className="tilename">Top Service</div>
            <div className="price">${topServiceCost}</div>
          </div>
          <div className="tile">
            <div className="tilename">Top Application</div>
            <div className="price">${topApplicationCost}</div>
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
    </div>
  );
};

export default ConsumptionHighlights;
