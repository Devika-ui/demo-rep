import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import Ondemand from "./Ondemand";
import NavigationBar from "./NavigationBar";
import ServiceCategory from "./ServiceCategory";
import InvoiceTableView from "./InvoiceTableView";
import ContainerForBusinessCost from "./ContainerForBusinessCost";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import api from "../api";
import MonthlyCostTrends from "./MonthlyCostTrends";
import { Box, Typography } from "@mui/material";
import componentUtil from "../componentUtil.js";
import { json } from "react-router-dom";

const BusinessCostSplit = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [reportType, setReportType] = useState("");
  const [boxData, setBoxData] = useState([]);
  const [billAllocationData, setBillAllocationData] = useState([]);
  const [serviceCategoryData, setServiceCategoryData] = useState([]);
  const [filteredBillAllocationData, setFilteredBillAllocationData] = useState(
    []
  );
  const [headerLabelsForBillAllocation, setHeaderLabelsForBillAllocation] =
    useState([]);
  const [uniqueBillAllocationData, setUniqueBillAllocationData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [inputData, setInputData] = useState({});
  const [applicationData, setApplicationData] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(null);

  const handleButtonClick = (value) => {
    if (value === "1") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

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

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleReportTypeChange = (event) => {
    const selectedReportType = event.target.value;
    setReportType(selectedReportType);

    if (selectedReportType) {
      const filteredData = billAllocationData.filter((item) => {
        return Object.keys(item).some(
          (key) => key.startsWith("name_") && item[key] === selectedReportType
        );
      });
      // const selectedApplication = filteredData.map((item) => item.name_0);
      const selectedApplication = filteredData.map((item) => {
        // Find the first available non-empty name among name_0, name_1, name_2
        return (
          item.name_0?.trim() ||
          item.name_1?.trim() ||
          item.name_2?.trim() ||
          "No Name Found"
        );
      });

      setApplicationData(selectedApplication);
      setFilteredBillAllocationData(filteredData);
    } else {
      const selectedApplication = billAllocationData.map((item) => {
        // Find the first available non-empty name among name_0, name_1, name_2
        return (
          item.name_0?.trim() ||
          item.name_1?.trim() ||
          item.name_2?.trim() ||
          "No Name Found"
        );
      });

      setApplicationData(selectedApplication);
      setFilteredBillAllocationData(billAllocationData);
    }
  };

  const hasFilters =
    selectedFilters &&
    (selectedFilters.subscriptions?.length > 0 ||
      selectedFilters.businessUnits?.length > 0 ||
      selectedFilters.locations?.length > 0 ||
      selectedFilters.applications?.length > 0 ||
      selectedFilters.projects?.length > 0 ||
      selectedFilters.environments?.length > 0);

  useEffect(() => {
    if (hasFilters || subscriptionsData.length > 0) {
      const inputData = hasFilters
        ? {
            Subscriptions: selectedFilters.subscriptions.map(
              (sub) => sub.value
            ),
            BusinessUnits:
              selectedFilters.businessUnits?.map((bu) => bu.value) || [],
            Locations: selectedFilters.locations?.map((loc) => loc.value) || [],
            Applications:
              selectedFilters.applications?.map((app) => app.value) || [],
            Projects: selectedFilters.projects?.map((proj) => proj.value) || [],
            Environments:
              selectedFilters.environments?.map((env) => env.value) || [],
          }
        : subscriptionsData;

      setInputData(inputData); // Store inputData for reuse in other useEffects
    }
  }, [selectedFilters, subscriptionsData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceCategoryCost = await api.getServiceCategoryCost(inputData);
        const formatNumber = (value) => {
          return typeof value === "number" && !isNaN(value)
            ? value.toFixed(2)
            : "0.00";
        };

        const aggregateData = (data) => {
          let totalBill = 0;
          let onDemandCost = 0;
          let commitmentsCost = 0;
          let savings = 0;

          data.forEach((item) => {
            totalBill += parseFloat(item.totalBill) || 0;
            onDemandCost += parseFloat(item.onDemandCost) || 0;
            commitmentsCost += parseFloat(item.commitmentsCost) || 0;
            savings += parseFloat(item.savings) || 0;
          });

          return {
            totalBill: formatNumber(totalBill),
            onDemandCost: formatNumber(onDemandCost),
            commitmentsCost: formatNumber(commitmentsCost),
            savings: formatNumber(savings),
          };
        };

        const formattedServiceCategoryData = Object.keys(
          serviceCategoryCost || {}
        ).map((serviceCategory) => {
          const services = Object.keys(
            serviceCategoryCost[serviceCategory] || {}
          ).map((service) => {
            const resourceGroups = Object.keys(
              serviceCategoryCost[serviceCategory][service] || {}
            ).map((resourceGroup) => {
              const resources = Object.keys(
                serviceCategoryCost[serviceCategory][service][resourceGroup] ||
                  {}
              ).map((resource) => ({
                name: resource,
                totalBill: formatNumber(
                  serviceCategoryCost[serviceCategory][service][resourceGroup][
                    resource
                  ]?.TotalBill
                ),
                onDemandCost: formatNumber(
                  serviceCategoryCost[serviceCategory][service][resourceGroup][
                    resource
                  ]?.OnDemandCost
                ),
                commitmentsCost: formatNumber(
                  serviceCategoryCost[serviceCategory][service][resourceGroup][
                    resource
                  ]?.CommitmentsCost
                ),
                savings: formatNumber(
                  serviceCategoryCost[serviceCategory][service][resourceGroup][
                    resource
                  ]?.Savings
                ),
              }));

              const { totalBill, onDemandCost, commitmentsCost, savings } =
                aggregateData(resources);

              return {
                name: resourceGroup,
                totalBill,
                onDemandCost,
                commitmentsCost,
                savings,
                resources,
              };
            });
            const { totalBill, onDemandCost, commitmentsCost, savings } =
              aggregateData(resourceGroups);

            return {
              name: service,
              totalBill,
              onDemandCost,
              commitmentsCost,
              savings,
              resourceGroups,
            };
          });

          const { totalBill, onDemandCost, commitmentsCost, savings } =
            aggregateData(services);

          return {
            name: serviceCategory,
            totalBill,
            onDemandCost,
            commitmentsCost,
            savings,
            services,
          };
        });

        setServiceCategoryData(formattedServiceCategoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (hasFilters || subscriptionsData.length > 0) {
      fetchData();
    }
  }, [inputData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          applicationsWithTags,
          applicationsWithoutTags,
          projectsWithTags,
          projectsWithoutTags,
        ] = await Promise.all([
          api.getApplicationWithTags(inputData),
          api.getApplicationWithoutTags(inputData),
          api.getProjectWithTags(inputData),
          api.getProjectWithoutTags(inputData),
        ]);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const formattedBoxData = [
          {
            number:
              applicationsWithTags?.Applicationswithtags?.[0] !== undefined &&
              applicationsWithTags.Applicationswithtags[0] !== null
                ? `${currencySymbol}${applicationsWithTags.Applicationswithtags[0]}`
                : "NA",
            text: "Applications with Tags",
          },
          {
            number:
              applicationsWithoutTags?.Applicationswithouttags?.[0] !==
                undefined &&
              applicationsWithoutTags.Applicationswithouttags[0] !== null
                ? `${currencySymbol}${applicationsWithoutTags.Applicationswithouttags[0]}`
                : "NA",
            text: "Applications without Tags",
          },
          {
            number:
              projectsWithTags?.projectwithtags?.[0] !== undefined &&
              projectsWithTags.projectwithtags[0] !== null
                ? ` ${currencySymbol}${projectsWithTags.projectwithtags[0]}`
                : "NA",
            text: "Project with Tags",
          },
          {
            number:
              projectsWithoutTags?.Projectwithouttags?.[0] !== undefined &&
              projectsWithoutTags.Projectwithouttags[0] !== null
                ? `${currencySymbol}${projectsWithoutTags.Projectwithouttags[0]}`
                : "NA",
            text: "Project without Tags",
          },
        ];

        setBoxData(formattedBoxData);
        setCurrencySymbol(currencySymbol);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (hasFilters || subscriptionsData.length > 0) {
      fetchData();
    }
  }, [inputData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billAllocation = await api.getBillAllocation(inputData);

        // Process and format the bill allocation data
        const billAllocationMap = Object.keys(
          billAllocation.billAllocation
        ).reduce((acc, appName) => {
          const appData = billAllocation.billAllocation[appName];
          appData.forEach((item) => {
            const modifiedDate = new Date(item.modifieddate);
            const monthString = modifiedDate.toLocaleString("en-US", {
              month: "long",
            });
            const yearString = modifiedDate.getFullYear().toString().slice(-2);
            const formattedDate = `${monthString}-${yearString}`;

            if (!acc[formattedDate]) {
              acc[formattedDate] = [];
            }

            acc[formattedDate].push({
              name: appName === null ? " " : appName,
              ownerName: item.tags_owner,
              onDemandCost: item.onDemandCost
                ? `${item.onDemandCost.toFixed(2)}`
                : "",
              normalizedVariation:
                item.Normalized_Variation_MoM === null
                  ? " "
                  : item.Normalized_Variation_MoM === 0
                  ? "0.00"
                  : `${(item.Normalized_Variation_MoM * 100).toFixed(2)}%`,
              savings: item.savings ? `${item.savings.toFixed(2)}` : "",
              totalBill: item.totalBill ? `${item.totalBill.toFixed(2)}` : "",
            });
          });

          return acc;
        }, {});

        // Get unique modified dates for table headers
        const uniqueModifiedDatesForBillAllocation =
          Object.keys(billAllocationMap);

        // Group data by application name and owner name
        const groupedData = {};
        uniqueModifiedDatesForBillAllocation.forEach((date, dateIndex) => {
          billAllocationMap[date].forEach((item) => {
            const key = `${item.name}_${item.ownerName}`;
            if (!groupedData[key]) {
              groupedData[key] = Array(
                uniqueModifiedDatesForBillAllocation.length
              )
                .fill(null)
                .map(() => ({
                  name: "",
                  ownerName: "",
                  onDemandCost: "",
                  normalizedVariation: "",
                  savings: "",
                  totalBill: "",
                }));
            }
            groupedData[key][dateIndex] = {
              name: item.name,
              ownerName: item.ownerName,
              onDemandCost: item.onDemandCost ? item.onDemandCost : "0.00",
              normalizedVariation: item.normalizedVariation
                ? item.normalizedVariation
                : "0",
              savings: item.savings ? item.savings : "0.00",
              totalBill: item.totalBill ? item.totalBill : "0.00",
            };
          });
        });

        const applicationData = Object.values(groupedData).map((entries) => {
          // Check each entry in the array and return the first valid name found.
          for (let i = 0; i < entries.length; i++) {
            if (entries[i]?.name) {
              return entries[i].name;
            }
          }
          return null; // Return null if no valid name is found
        });
        setApplicationData(applicationData);
        const flattenedBillAllocationData = Object.values(groupedData).map(
          (entries) => {
            let hasNameBeenSet = false;
            return entries.reduce((acc, entry, index) => {
              if (!acc.name && entry.name && entry.name.trim()) {
                acc[`name_${index}`] = entry.name;
                hasNameBeenSet = true; // Store the first non-empty name
              }
              acc[`ownerName_${index}`] = entry.ownerName;
              acc[`onDemandCost_${index}`] = entry.onDemandCost;
              acc[`normalizedVariation_${index}`] = entry.normalizedVariation;
              acc[`savings_${index}`] = entry.savings;
              acc[`totalBill_${index}`] = entry.totalBill;

              return acc;
            }, {});
          }
        );
        // Extract unique application names from flattenedBillAllocationData
        const uniqueNamesSet = new Set();
        flattenedBillAllocationData.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (key.startsWith("name_")) {
              uniqueNamesSet.add(item[key]);
            }
          });
        });
        const uniqueNames = [...uniqueNamesSet];

        // Set the required state for your application
        setBillAllocationData(flattenedBillAllocationData);
        setFilteredBillAllocationData(flattenedBillAllocationData);
        setHeaderLabelsForBillAllocation(uniqueModifiedDatesForBillAllocation);
        setUniqueBillAllocationData(uniqueNames);
        console.log("flattenedBillAllocationData", flattenedBillAllocationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (hasFilters || subscriptionsData.length > 0) {
      fetchData();
    }
  }, [inputData]);

  const columns1 = [
    { key: "ownerName", label: "Owner Name" },
    { key: "totalBill", label: `Total Bill (${currencySymbol})` },
    { key: "normalizedVariation", label: "%Normalized Variation" },
    { key: "rawVariation", label: "%Raw Variation" },
    { key: "savings", label: `Savings (${currencySymbol})` },
  ];

  const tableData = [
    {
      tableTitle: "Service Category Cost Allocation",
      columnHead1: "Service Category",
      columnHead2: `Total Bill (${currencySymbol})`,
      columnHead3: `On Demand Cost (${currencySymbol})`,
      columnHead4: `Commitments Cost (${currencySymbol})`,
      columnHead5: `Savings (${currencySymbol})`,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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
          Business Cost Split
        </Typography>
        <Subheader
          onButtonClick={handleButtonClick}
          onSubscriptionsFetch={handleSubscriptionsFetch}
          onFiltersChange={handleFiltersChange}
        />
        <NavigationBar />
      </Box>
      <NavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-33px",
          marginRight: "2px",
          marginTop: "-5px",
        }}
      >
        <ContainerForBusinessCost data={boxData} />
      </div>

      {/* New Flex Container for Ondemand and MonthlyCostTrends */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Align items to the ends
          marginBottom: "29px",
          width: "100%",
          padding: "0 30px", // Adjust left and right padding
          marginTop: "-11px",
        }}
      >
        <div
          style={{
            marginBottom: "-35px",
            textAlign: "left",
            width: "100%",
            marginLeft: "-300px",
            marginRight: "30px",
            marginTop: "0.5px",
          }}
        >
          <Ondemand
            subscriptionsData={subscriptionsData}
            selectedFilters={selectedFilters}
            currencySymbol={currencySymbol}
          />
        </div>
        <div style={{ flex: 1 }}>
          {" "}
          <MonthlyCostTrends
            subscriptionsData={subscriptionsData}
            selectedFilters={selectedFilters}
            currencySymbol={currencySymbol}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "33px",
          marginTop: "-70px",
          marginLeft: "-8px",
        }}
      >
        <InvoiceTableView
          title={"Total Bill Allocation across Application"}
          dropdown={
            <FormControl variant="outlined" className="formControl">
              <InputLabel id="report-type-label" className="inputLabel">
                Group by Application
              </InputLabel>
              <Select
                labelId="report-type-label"
                id="report-type"
                value={reportType}
                onChange={handleReportTypeChange}
                label="Group by Application"
                className="selectInput"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300, // Adjust the dropdown height if needed
                    },
                  },
                }}
              >
                <MenuItem value="">All Applications</MenuItem>
                {uniqueBillAllocationData.map((name, index) => (
                  <MenuItem
                    key={index}
                    value={name}
                    style={{ whiteSpace: "normal" }}
                  >
                    {name === "null" ? "null" : name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          tableData={filteredBillAllocationData}
          tableHeight="300px"
          tableWidth="92.5%"
          columns={columns1}
          headerLabels={headerLabelsForBillAllocation}
          columnData={applicationData}
          columnTitle="Application Name"
          headerClass="headerClass"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "50px",
          marginTop: "-38px",
          marginBottom: "15px",
        }}
      >
        <ServiceCategory
          dummyData={serviceCategoryData}
          height="300px"
          width="97.5%"
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default BusinessCostSplit;
