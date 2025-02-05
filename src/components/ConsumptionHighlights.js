import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../css/consumptionHighlights.scss";
import api from "../api.js";
import componentUtil from "../componentUtil.js";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

const ConsumptionHighlights = ({ selectedCSP, inputData, billingMonth }) => {
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
    NSSRpercentage: 0,
  });
  const [csp, setCsp] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [showApplicationDetails, setApplicationDetails] = useState(false)
  const [showSubscriptionDetails, setSubscriptionDetails] = useState(false)
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const fetchConsumptionData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        const subscriptionsData1 =
          await api.getOverallConsumptionForSubscription(
            inputData,
            billingMonth
          );
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const currencySymbol = await componentUtil.getCurrencySymbol();
        setTopSubscriptions(subscriptionsData1.topsubscriptions || []);

        const applicationsData = await api.getOverallConsumptionForApplication(
          inputData,
          billingMonth
        );
        setTopApplications(applicationsData.topApplications || []);

        const servicesData = await api.getOverallConsumptionForServies(
          inputData,
          billingMonth
        );
        setTopServices(servicesData.topServices || []);

        const tagComplianceData =
          await api.getOverallConsumptionForTagCompliance(
            inputData,
            billingMonth
          );
        const csp = componentUtil.getSelectedCSP();
        if (tagComplianceData && tagComplianceData.length > 0) {
          const latestData = tagComplianceData[tagComplianceData.length - 1];
          setTagCompliance({
            applicationpercentage: latestData.applicationpercentage || 0,
            ownerpercentage: latestData.ownerpercentage || 0,
            projectpercentage: latestData.projectpercentage || 0,
            bupercentage: latestData.bupercentage || 0,
            environmentpercentage: latestData.environmentpercentage || 0,
            NSSRpercentage: latestData.NSSRpercentage  || 0,
          });
          setMonthlyData(tagComplianceData);
        }
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
        setCsp(csp);
      } catch (error) {
        console.error("Error fetching tag compliance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConsumptionData();
  }, [selectedCSP, inputData, billingMonth]);

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

  const radialBarOptions = {
    chart: {
      type: "radialBar",
      height: 200,
      events: {
        dataPointSelection: () => setShowDetailedView(true),
      },
    },
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

  const categories = [
    {
      name: "% Resource Tagging by Application",
      data: "applicationpercentage",
    },
    { name: "% Resource Tagging Owner", data: "ownerpercentage" },
    { name: "% Resource Tagging Project", data: "projectpercentage" },
    { name: "% Resource Tagging Business Unit", data: "bupercentage" },
    { name: "% Resource Tagging Environment", data: "environmentpercentage" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async (type) => {
    handleMenuClose();
    const element = document.querySelector(".expanded-view");
    if (!element) return;

    if (type === "png" || type === "svg") {
      const canvas = await html2canvas(element);
      canvas.toBlob((blob) => {
        saveAs(blob, `consumption-highlights.${type}`);
      });
    }
  };

  const generateCSV = () => {
    const data = monthlyData.map((item) => ({
      Month: item.month,
      "Application %": (item.applicationpercentage * 100).toFixed(2),
      "Owner %": (item.ownerpercentage * 100).toFixed(2),
      "Project %": (item.projectpercentage * 100).toFixed(2),
      "Business Unit %": (item.bupercentage * 100).toFixed(2),
      "Environment %": (item.environmentpercentage * 100).toFixed(2),
    }));

    return data;
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
            <div className="tile" onClick={() => setSubscriptionDetails(true)}>
              <div className="tilename">
                {selectedCSP === 100 ? "Top Subscriptions" : "Top Accounts"}
              </div>
              <div className="price">
                {currencyPreference === "start"
                  ? `${currencySymbol}${topSubscriptionCost}`
                  : `${topSubscriptionCost}${currencySymbol}`}
              </div>
            </div>
            <div className="tile"  onClick={() => setShowServiceDetails(true)}>
              <div className="tilename">Top Service</div>
              <div className="price">
                {currencyPreference === "start"
                  ? `${currencySymbol}${topServiceCost}`
                  : `${topServiceCost}${currencySymbol}`}
              </div>
            </div>
            <div className="tile"  onClick={() => setApplicationDetails(true)}>
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
            <Tooltip title="Click here to follow the link" placement="top">
              <div
                onClick={() => setShowDetailedView(true)}
                style={{ cursor: "pointer" }}
              >
                <Chart
                  options={radialBarOptions}
                  series={radialBarOptions.series}
                  type="radialBar"
                  height="200px"
                  width="200px"
                />
              </div>
            </Tooltip>
          </div>

          <Dialog
            open={showDetailedView}
            onClose={() => setShowDetailedView(false)}
            maxWidth={false}
          >
            <DialogTitle style={{ color: "#5f249f" }}>
              Detailed % Tag Compliance
              <IconButton
                className="closebutton"
                onClick={() => setShowDetailedView(false)}
                // style={{color:"#FF0000",float: "right"}}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                style={{ marginLeft: "44rem", marginTop: "-1.1rem" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleDownload("png")}>
                  Download PNG
                </MenuItem>
                <MenuItem onClick={() => handleDownload("svg")}>
                  Download SVG
                </MenuItem>
                <CSVLink data={generateCSV()} filename={"tag-compliance.csv"}>
                  <MenuItem onClick={handleMenuClose}>Download CSV</MenuItem>
                </CSVLink>
              </Menu>
            </DialogTitle>
            <DialogContent>
              <div className="expanded-view">
                {categories.map((category) => (
                  <div key={category.name} className="category-box">
                    <h5>{category.name}</h5>
                    <Chart
                      options={{
                        chart: { type: "bar", height: 150 },
                        plotOptions: {
                          bar: {
                            dataLabels: {
                              position: "top",
                            },
                          },
                        },
                        dataLabels: {
                          enabled: true,
                          formatter: (value) => `${value.toFixed(2)}%`,
                        },
                        xaxis: {
                          categories: monthlyData.map((data) => data.month),
                        },
                        yaxis: {
                          show: false,
                        },
                        grid: {
                          show: false,
                        },
                        colors: ["#5f249f"],
                      }}
                      series={[
                        {
                          name: category.name,
                          data: monthlyData.map(
                            (data) => data[category.data] * 100
                          ),
                        },
                      ]}
                      type="bar"
                      height="200"
                      width="80%"
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
            <Dialog
               open={showServiceDetails}
               onClose={() => setShowServiceDetails(false)}
               maxWidth="sm"
               fullWidth
            >
            <DialogTitle>
            <span style={{ color: "#5f249f" }}>Top 3 Services & Costs </span>
             <IconButton
               style={{ float: "right" }}
               onClick={() => setShowServiceDetails(false)}
              >
                <CloseIcon />
             </IconButton>
            </DialogTitle>
          <DialogContent>
              {topServices.length > 0 ? (
               <ul>
              {topServices.map((service, index) => (
                <li key={index}>
                  <strong style={{ color: "#5f249f",marginRight: "5px"  }}>{service.Service}</strong>:{" "}
                  <span style={{ color: "orange",fontWeight:"bold" }}>
                  {service.totalcost.toFixed(2)}
                  {currencySymbol}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No services available.</p>
          )}
         </DialogContent>
         </Dialog>

         <Dialog open={showApplicationDetails} onClose={() => setApplicationDetails(false)} maxWidth="sm" fullWidth>
  <DialogTitle>
    <span style={{ color: "#5f249f" }}>Top 3 Applications & Costs</span>
    <IconButton style={{ float: "right" }} onClick={() => setApplicationDetails(false)}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    {topApplications.length > 0 ? (
      <ul>
        {topApplications.slice(0, 3).map((application, index) => (
          <li key={index}>
            <strong style={{ color: "#5f249f",marginRight: "5px" }}>
              {application.Application ? application.Application : "Null"}
            </strong>:{" "}
            <span style={{ color: "orange",fontWeight:"bold" }}>
              {application.totalcost !== null && application.totalcost !== undefined
                ? application.totalcost.toFixed(2)
                : "N/A"}
                {currencySymbol}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No applications available.</p>
    )}
  </DialogContent>
</Dialog>


<Dialog open={showSubscriptionDetails} onClose={() => setSubscriptionDetails(false)} maxWidth="sm" fullWidth>
  <DialogTitle>
    <span style={{color:"#5f249f"}}> Top 3 Subscriptions & Costs</span>
    <IconButton style={{ float: "right" }} onClick={() => setSubscriptionDetails(false)}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    {topSubscriptions.length > 0 ? (
      <ul>
        {topSubscriptions.map((subscription, index) => (
          <li key={index}>
            <strong style={{color:"#5f249f",marginRight:"5px"}}>{subscription.Subscription}</strong>: 
            <span style={{color:"orange",fontWeight:"bold",marginLeft:"5px"}}>  
            {subscription.totalcost.toFixed(2)}
            {currencySymbol}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No Subscriptions available.</p>
    )}
  </DialogContent>
</Dialog>


        </div>
      )}
    </div>
  );
};

export default ConsumptionHighlights;
