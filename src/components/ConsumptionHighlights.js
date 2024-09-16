import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../css/consumptionHighlights.scss";
import api from "../api.js"; // Import API function

const ConsumptionHighlights = () => {
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
    const fetchConsumptionData = async () => {
      try {
        const subscriptionsData =
          await api.getOverallConsumptionForSubscription();
        setTopSubscriptions(subscriptionsData.topsubscriptions || []);

        const applicationsData =
          await api.getOverallConsumptionForApplication();
        setTopApplications(applicationsData.topApplications || []);

        const servicesData = await api.getOverallConsumptionForServies();
        setTopServices(servicesData.topServices || []);

        const tagComplianceData =
          await api.getOverallConsumptionForTagCompliance();
        setTagCompliance(tagComplianceData || {
          applicationpercentage: 0,
          ownerpercentage: 0,
          projectpercentage: 0,
          bupercentage: 0,
          environmentpercentage: 0,
        });
      } catch (error) {
        console.error("Error fetching overall consumption data:", error);
      }
    };

    fetchConsumptionData();
  }, []);

  // Check if data is available and provide default values if not
  const topSubscriptionCost = topSubscriptions.length > 0
    ? topSubscriptions[0].totalcost.toFixed(2)
    : "0.00";
  const topServiceCost = topServices.length > 0
    ? topServices[0].totalcost.toFixed(2)
    : "0.00";
  const topApplicationCost = topApplications.length > 0
    ? topApplications[0].totalcost.toFixed(2)
    : "0.00";

  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "12px",
          },
          value: {
            fontSize: "10px",
          },
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
    <div style={{ marginBottom: "-70px", marginRight: "0px" }}>
      <div className="top">
        <strong>Overall Consumption Highlights</strong>
      </div>
      <div
        className="consumption-wrapper"
        style={{ width: "400px", height: "197px", marginBottom: "-197px",marginLeft:"34px"}}
      >
        <div
          className="tiles-wrapper"
          style={{ padding: "0px", paddingBottom: "0px", marginTop: "-20px" }}
        >
          <div className="tiles-container" style={{ paddingBottom: "0px" }}>
            <div className="tile">
              <div>
                <div className="tilename">Top Subscription</div>
              </div>
              <div className="content">
                <div className="price">${topSubscriptionCost}</div>
              </div>
            </div>
            <div className="tile">
              <div>
                <div className="tilename">Top Service</div>
              </div>
              <div className="content">
                <div className="price">${topServiceCost}</div>
              </div>
            </div>
            <div className="tile">
              <div>
                <div className="tilename">Top Application</div>
              </div>
              <div className="content">
                <div className="price">${topApplicationCost}</div>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <h4 style={{ marginTop: "-15px", marginBottom: "0px" }} className="chart-title">
              % Tag Compliance
            </h4>
            <div className="chart-wrapper" style={{ marginTop: "-5px" }}>
              <Chart
                options={options}
                series={options.series}
                type="radialBar"
                height="100%" // Set height to 100% to fill the parent container
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionHighlights;