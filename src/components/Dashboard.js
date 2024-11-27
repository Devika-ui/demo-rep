import React, { useState, useEffect } from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Header from "./Header.js";
import Subheader from "./SubHeader.js";
import MonthlySpendComponent from "./MonthlySpendComponent";
import MonthlyForecastComponent from "./MonthlyForecastComponent";
import TotalSubscriptionsComponent from "./TotalSubscriptionsComponent";
import StackBars from "./StackBars";
import AzureBars from "./AzureBars";
import NavigationBar from "./NavigationBar.js";
import RecommendationsComponent from "./RecommendationsComponent";
import KPISection from "./KPISection";
import ConsumptionHighlights from "./ConsumptionHighlights";
import MapContainer from "./MapContainer";
import OverallTotalRealizedSavings from "./OverallTotalRealizedSavings";
import api from "../api.js";

const Dashboard = () => {
  const [showStackBars, setShowStackBars] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("Azure");
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [simulatedSavings, setSimulatedSavings] = useState([]);
  const [labels, setLabels] = useState([]);
  const [percentCoverage, setPercentCoverage] = useState(0);
  const [percentUsage, setPercentUsage] = useState(0);
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
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);
  const [lastMonthCost, setLastMonthCost] = useState(null);
  const [futureCost, setFutureCost] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(null);
  const [totalCost1, setTotalCost1] = useState(null);
  const [azureCount, setAzureCount] = useState(null);
  const AWSAccount = [{ "Account": 4 }];

  const dummyAWSRecommendations = [
    {
      name: "EC2 On-Demand Instances",
      id_customer: 1500,
      value: 1324.56789012345,
    },
    {
      name: "EBS Volumes Attached to Stopped Instances",
      id_customer: 1500,
      value: 412.349672000001,
    },
    {
      name: "Unused Elastic IP Addresses",
      id_customer: 1500,
      value: 275.892345678901,
    },
  ];

  const dummyKPIData = {
    coverage: 0.5089989898,
    usage: 88.5089898999,
  };

  const dummySavingsRI = [
    {
      modifieddate: "2024-07-01T00:00:00.000Z",
      savings: 170.84843113107,
    },
    {
      modifieddate: "2024-08-01T00:00:00.000Z",
      savings: 190.76144838348,
    },
  ];

 const dummysimulatedri = [
    {
        "Date": "2024-07-01T00:00:00.000Z",
        "simulated": 400.6280021911
    },
    {
        "Date": "2024-08-01T00:00:00.000Z",
        "simulated": 450.8205563346
    }
]
 
const dummysubscription = {
  "topsubscriptions": [
      {
          "Subscription": "Subscription2",
          "totalcost": 800.6744806664
      },
      {
          "Subscription": "Subscription1",
          "totalcost": 900.0821463602
      }
  ]
}
const dummyApplication = {
  "topApplications": [
      {
          "Application": "Demo-Application175",
          "totalcost": 44071.2060862487
      },
      {
          "Application": null,
          "totalcost": 339229.57188372014
      }
  ]
}
 
const dummyService = {
  "topServices": [
      {
          "Service": "Compute",
          "totalcost": 600047.8128852653
      },
      {
          "Service": "Storage",
          "totalcost": 400015.56925224455
      }
  ]
}

const dummyTagCompliance = {
  "ownerpercentage": 0.0879787694812,
  "environmentcentage": 0.10,
  "applicationpercentage": 0.578675175385,
  "projectpercentage": 0.20,
  "bupercentage": 0.465765510961
}

const dummyActual = [
  {
      "totalCost": 9999.0555093973,
      "firstMonthCost": 888888.0555093973,
      "growthPercentage": 80.72402511363063,
      "lastMonthCost": 489899.0217558226
  }
]
 
const dummyForecast = [
  {
      "pastCosts": [
          {
              "month": "2024-09",
              "pastCost": 50.7
          },
          {
              "month": "2024-08",
              "pastCost": 450.03
          }
      ],
      "lastMonthCost": 504222.7,
      "futureCosts": [
          {
              "month": "2024-10",
              "futureCost": 48.83,
              "percentageIncrease": -10
          },
          {
              "month": "2024-11",
              "futureCost": 46.62,
              "percentageIncrease": -5
          },
          {
              "month": "2024-12",
              "futureCost": 404.36,
              "percentageIncrease": -2
          }
      ]
  }
]
  const handleButtonClick = (value) => {
    setSelectedProvider(value);
    setShowStackBars(value !== "Azure");
  };

  const isLandingPage = true;

  const handleSubscriptionsFetch = (data) => {
    setSubscriptionsData(data);
  };
  const [selectedFilters, setSelectedFilters] = useState({
    subscriptions: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  });

  // Function to update filters
  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters); // Update selected filters
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedProvider === "Azure") {
          // Fetch Azure subscription count
          const azureSubscriptionData = await api.getTotalSubscription();
          const azureCountFromAPI = azureSubscriptionData[0]?.Subscription;
          setAzureCount(azureCountFromAPI);
        } else if (selectedProvider === "AWS") {
          setAzureCount(AWSAccount[0].Account); // Dummy AWS data
        }
      } catch (error) {
        console.error("Error fetching Azure or AWS data:", error);
      }
    };
    fetchData();
  }, [selectedProvider]);

  useEffect(() => {
    if (selectedProvider === "Azure") {
      const fetchData = async () => {
        try {
          const response = await api.getRecommendations();
          setRecommendations(response);
        } catch (error) {
          console.error("Error fetching Azure recommendations:", error);
        }
      };
      fetchData();
    } else if (selectedProvider === "AWS") {
      setRecommendations(dummyAWSRecommendations);
    }
  }, [selectedProvider]);

  useEffect(() => {
    if (selectedProvider === "Azure") {
    const hasFilters =
      selectedFilters &&
      (selectedFilters.subscriptions?.length > 0 ||
        selectedFilters.businessUnits?.length > 0 ||
        selectedFilters.locations?.length > 0 ||
        selectedFilters.applications?.length > 0 ||
        selectedFilters.projects?.length > 0 ||
        selectedFilters.environments?.length > 0);

    if (hasFilters || subscriptionsData.length > 0) {
      const fetchReservationsData = async () => {
        try {
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

          const reservationsData = await api.getOverallSavingsRI(inputData);
          setReservations(reservationsData.map((entry) => entry.savings));
          setLabels(
            reservationsData.map((entry) =>
              new Date(entry.modifieddate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            )
          );
        } catch (error) {
          console.error("Error fetching reservations data:", error);
        }
      };

      fetchReservationsData();
    }
  } else if (selectedProvider === "AWS") {
    // Use dummy data for AWS
    setReservations(dummySavingsRI.map((entry) => entry.savings));
    setLabels(
      dummySavingsRI.map((entry) =>
        new Date(entry.modifieddate).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      )
    );
  }
}, [selectedProvider, subscriptionsData, selectedFilters]);

useEffect(() => {
  if (selectedProvider === "Azure") {
    const hasFilters =
      selectedFilters &&
      (selectedFilters.subscriptions?.length > 0 ||
        selectedFilters.businessUnits?.length > 0 ||
        selectedFilters.locations?.length > 0 ||
        selectedFilters.applications?.length > 0 ||
        selectedFilters.projects?.length > 0 ||
        selectedFilters.environments?.length > 0);

    if (hasFilters || subscriptionsData.length > 0) {
      const fetchSimulatedSavingsData = async () => {
        try {
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

          const simulatedSavingsData =
            await api.getOverallSavingsStimulated(inputData);
          setSimulatedSavings(
            simulatedSavingsData.map((entry) => entry.simulated)
          );
          setLabels(
            simulatedSavingsData.map((entry) =>
              new Date(entry.Date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            )
          );
        } catch (error) {
          console.error("Error fetching simulated savings data:", error);
        }
      };

      fetchSimulatedSavingsData();
    }
  } else if (selectedProvider === "AWS") {
    setSimulatedSavings(dummysimulatedri.map((entry) => entry.simulated));
    setLabels(
      dummysimulatedri.map((entry) =>
        new Date(entry.Date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      )
    );
  }
}, [selectedProvider, subscriptionsData, selectedFilters]);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Check if there are filters applied
      const hasFilters =
        selectedFilters &&
        (selectedFilters.subscriptions?.length > 0 ||
          selectedFilters.businessUnits?.length > 0 ||
          selectedFilters.locations?.length > 0 ||
          selectedFilters.applications?.length > 0 ||
          selectedFilters.projects?.length > 0 ||
          selectedFilters.environments?.length > 0);

      // If filters are applied, create input data
      const inputData = hasFilters
        ? {
            Subscriptions: selectedFilters.subscriptions.map((sub) => sub.value),
            BusinessUnits: selectedFilters.businessUnits?.map((bu) => bu.value) || [],
            Locations: selectedFilters.locations?.map((loc) => loc.value) || [],
            Applications: selectedFilters.applications?.map((app) => app.value) || [],
            Projects: selectedFilters.projects?.map((proj) => proj.value) || [],
            Environments: selectedFilters.environments?.map((env) => env.value) || [],
          }
        : subscriptionsData;

      if (selectedProvider === "Azure" && (hasFilters || subscriptionsData.length > 0)) {
        const coverageData = await api.getDiscountKPICoverage(inputData);
        setPercentCoverage(coverageData.coverage);
      }

      if (selectedProvider === "Azure") {
        const usageData = await api.getDiscountKPIUsage();
        setPercentUsage(usageData.usage);
      }

      if (selectedProvider === "AWS") {
        setPercentCoverage(dummyKPIData.coverage);
        setPercentUsage(dummyKPIData.usage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData(); 

}, [selectedProvider, subscriptionsData, selectedFilters]); 


useEffect(() => {
  if (selectedProvider === "Azure") {
  const hasFilters =
    selectedFilters &&
    (selectedFilters.subscriptions?.length > 0 ||
      selectedFilters.businessUnits?.length > 0 ||
      selectedFilters.locations?.length > 0 ||
      selectedFilters.applications?.length > 0 ||
      selectedFilters.projects?.length > 0 ||
      selectedFilters.environments?.length > 0);

  const fetchConsumptionData = async () => {
    try {
      // Decide whether to use selected filters or subscriptionsData
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

      const subscriptionsData1 =
        await api.getOverallConsumptionForSubscription(inputData);
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
    } catch (error) {
      console.error("Error fetching overall consumption data:", error);
    }
  };

  if (hasFilters || subscriptionsData.length > 0) {
    fetchConsumptionData();
  }
} else if (selectedProvider === "AWS"){
  setTopSubscriptions(dummysubscription.topsubscriptions || []);
  setTopApplications(dummyApplication.topApplications || []);
  setTopServices(dummyService.topServices || []);
  setTagCompliance(dummyTagCompliance || []);
}
}, [selectedProvider, subscriptionsData,selectedFilters]);

useEffect(() => {
  if (selectedProvider === "Azure") {
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
} else if (selectedProvider === "AWS") {
  setTotalCost(dummyActual[0]?.totalCost || 0);
  setGrowthPercentage(dummyActual[0]?.growthPercentage || 0);
}
}, [selectedProvider, subscriptionsData, selectedFilters]);

useEffect(() => {
  if (selectedProvider === "Azure") {
  const hasFilters =
    selectedFilters &&
    (selectedFilters.subscriptions?.length > 0 ||
      selectedFilters.businessUnits?.length > 0 ||
      selectedFilters.locations?.length > 0 ||
      selectedFilters.applications?.length > 0 ||
      selectedFilters.projects?.length > 0 ||
      selectedFilters.environments?.length > 0);

  setLastMonthCost(null);
  setFutureCost(null);
  setPercentageIncrease(null);
  setTotalCost1(null);

  const fetchData = async () => {
    try {
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

      const forecastData = await api.getMonthlyForecastSpend(inputData);

      if (forecastData.length > 0) {
        const lastMonth = forecastData[0].lastMonthCost;
        const latestFutureCostData = forecastData[0].futureCosts.at(-1); // Get the latest month data

        setLastMonthCost(lastMonth);
        setFutureCost(latestFutureCostData.futureCost);
        setPercentageIncrease(latestFutureCostData.percentageIncrease);
        setTotalCost1(lastMonth + latestFutureCostData.futureCost);
      }
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  if (hasFilters || subscriptionsData.length > 0) {
    fetchData();
  }
}else if (selectedProvider === "AWS") {
  const lastMonth = dummyForecast[0]?.lastMonthCost || 0;
  const latestFutureCostData = dummyForecast[0]?.futureCosts.at(-1) || {}; // Safely get the last entry

  setLastMonthCost(lastMonth);
  setFutureCost(latestFutureCostData.futureCost || 0);
  setPercentageIncrease(latestFutureCostData.percentageIncrease || 0);
  setTotalCost1(lastMonth + (latestFutureCostData.futureCost || 0));
}
}, [selectedProvider, subscriptionsData, selectedFilters]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures it takes full screen height
        paddingX: 9.5,
        paddingRight: "10px",
        maxWidth: "100%",
      }}
    >
      <Header />
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "#5f249f",
          marginTop: "-1rem", // Adjust this as needed
          fontWeight: "bold",
        }}
      >
        Overview
      </Typography>
      <Subheader onButtonClick={handleButtonClick} isLandingPage={isLandingPage}
        onSubscriptionsFetch={handleSubscriptionsFetch}
        onFiltersChange={handleFiltersChange}
      />
      <NavigationBar />

      {/* This is the main content area which should take the remaining height */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* First Row: Monthly Spend, Forecast, Subscriptions */}
          <Grid item xs={12} sm={6} md={4}>
            <MonthlySpendComponent
              subscriptionsData={subscriptionsData}
              selectedFilters={selectedFilters}
              totalCost={totalCost}
              growthPercentage={growthPercentage}

            />
          </Grid>
 
          <Grid item xs={12} sm={6} md={4}>
            <MonthlyForecastComponent
              subscriptionsData={subscriptionsData}
              selectedFilters={selectedFilters}
              lastMonthCost={lastMonthCost}
              futureCost={futureCost}
              percentageIncrease={percentageIncrease}
              totalCost1={totalCost1}
            />
          </Grid>
 
          <Grid item xs={12} sm={6} md={4}>
            <TotalSubscriptionsComponent 
            azureCount = {azureCount}
            selectedProvider={selectedProvider}/>
          </Grid>
 
          {/* Second Row: StackBars (or AzureBars), Recommendations, KPI */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "-10px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-1rem", // Adjust this value to move the heading up or down
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    color: "#5f249f",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <strong>
                    {showStackBars
                      ? "Total Bill Cost by Providers"
                      : "Azure Total Bill Cost"}
                  </strong>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  {showStackBars ? (
                    <StackBars
                      subscriptionsData={subscriptionsData}
                      selectedFilters={selectedFilters}
                    />
                  ) : (
                    <AzureBars
                      subscriptionsData={subscriptionsData}
                      selectedFilters={selectedFilters}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                height: "30vh",
                display: "flex",
                flexDirection: "column",
                marginTop: "-10px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <RecommendationsComponent recommendations={recommendations}
               />
            </Paper>
          </Grid>

          <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ position: "relative", top: "-10px" }}
            >
              {/* <Paper sx={{ p: 2, height: '30vh', display: 'flex', flexDirection: 'column' }}> */}
              <KPISection
                subscriptionsData={subscriptionsData}
                selectedFilters={selectedFilters}
                percentCoverage={percentCoverage}
                percentUsage={percentUsage}
              />
              {/* </Paper> */}
            </Grid>

        {/* Third Row */}
        <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <ConsumptionHighlights
                  subscriptionsData={subscriptionsData}
                  selectedFilters={selectedFilters}
                  topSubscriptions={topSubscriptions}
                  topApplications={topApplications}
                  topServices={topServices}
                  tagCompliance={tagCompliance}
                  selectedProvider={selectedProvider}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MapContainer
                  subscriptionsData={subscriptionsData}
                  selectedFilters={selectedFilters}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "30vh",
                  marginTop: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <OverallTotalRealizedSavings
                  subscriptionsData={subscriptionsData}
                  selectedFilters={selectedFilters}
                  reservations={reservations}
                  simulatedSavings={simulatedSavings}
                  labels={labels}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;