import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import Ondemand from "./Ondemand";
import NavigationBar from "./NavigationBar";
import ServiceCategory from "./ServiceCategory";
import ContainerForBusinessCost from "./ContainerForBusinessCost";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import api from "../api";
import MonthlyCostTrends from "./MonthlyCostTrends";
import { Box, Typography } from "@mui/material";
import componentUtil from "../componentUtil.js";
import TotalBillAllocationTable from "./TotalBillAllocationTable.js";
import { json } from "react-router-dom";

const BusinessCostSplit = () => {
  sessionStorage.removeItem("overviewPage");
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
  const [applicationData, setApplicationData] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  const [formattedDates, setFormattedDates] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(
    componentUtil.getSelectedCSP()
  );
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [filteredData, setFilteredData] = useState(billAllocationData);
  const [applicationNames, setApplicationNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billingMonth, setBillingMonth] = useState([]);

  let inputData = selectedFilters;

  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };
  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  useEffect(() => {
    const uniqueApplications = billAllocationData.map((app) => app.name);
    setApplicationNames(uniqueApplications);
  }, [billAllocationData]);

  const handleReportTypeChange = (event) => {
    const selectedApplication = event.target.value;
    setReportType(selectedApplication);

    if (selectedApplication) {
      const filtered = billAllocationData.filter(
        (app) => app.name === selectedApplication
      );
      setFilteredBillAllocationData(filtered);
    } else {
      // Reset to show all applications
      setFilteredBillAllocationData(billAllocationData);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (billingMonth.length == 0) {
          return;
        }
        setLoading(true);
        const serviceCategoryCost = await api.getServiceCategoryCost(
          inputData,
          billingMonth
        );

        const transformDataToArrayFormat = (data) => {
          const result = [];
          const allMonths = new Set();

          const collectMonths = (node) => {
            for (const key in node) {
              if (typeof node[key] === "object" && node[key] !== null) {
                collectMonths(node[key]);
              } else if (key === "Date") {
                const month = new Date(node[key]).toISOString().slice(0, 7);
                allMonths.add(month);
              }
            }
          };

          collectMonths(data);

          const transformNode = (node, nodeName) => {
            if (typeof node !== "object" || node === null) {
              return null;
            }

            const children = [];
            let isLeafNode = true;

            for (const key in node) {
              if (typeof node[key] === "object" && node[key] !== null) {
                const childNode = transformNode(node[key], key);
                if (childNode) {
                  isLeafNode = false;
                  children.push(childNode);
                }
              }
            }

            if (isLeafNode) {
              const monthData = {};

              for (const uniqueMonth of allMonths) {
                monthData[uniqueMonth] = {
                  TotalBill: 0,
                  OnDemandCost: 0,
                  CommitmentsCost: 0,
                  Savings: 0,
                };
              }

              // Populate month data for this leaf node
              const {
                Date: date,
                TotalBill,
                OnDemandCost,
                CommitmentsCost,
                Savings,
              } = node;
              const month = new Date(date).toISOString().slice(0, 7);
              monthData[month] = {
                TotalBill,
                OnDemandCost,
                CommitmentsCost,
                Savings,
              };

              const monthChildren = Object.entries(monthData).map(
                ([monthName, monthDetails]) => ({
                  name: monthName,
                  type: "month",
                  ...monthDetails,
                })
              );

              return {
                name: nodeName,
                type: "resource",
                children: monthChildren,
              };
            }

            // Non-leaf node
            return {
              name: nodeName,
              type: isLeafNode ? "resource" : "category",
              children,
            };
          };

          // Process the top-level data structure
          for (const [key, value] of Object.entries(data)) {
            const transformedNode = transformNode(value, key);
            if (transformedNode) {
              result.push(transformedNode);
            }
          }

          return result;
        };

        const transformedData = transformDataToArrayFormat(serviceCategoryCost);

        //console.log("Transformed Data:", transformedData);
        setServiceData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProvider, billingMonth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (billingMonth.length == 0) {
          return;
        }
        setLoading(true);
        setBoxData([]);
        const [
          applicationsWithTags,
          applicationsWithoutTags,
          projectsWithTags,
          projectsWithoutTags,
        ] = await Promise.all([
          api.getApplicationWithTags(inputData, billingMonth),
          api.getApplicationWithoutTags(inputData, billingMonth),
          api.getProjectWithTags(inputData, billingMonth),
          api.getProjectWithoutTags(inputData, billingMonth),
        ]);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const formatCurrency = (value, currencySymbol, currencyPreference) => {
          if (value === undefined || value === null) {
            return "NA";
          }
          return currencyPreference === "start"
            ? `${currencySymbol}${value}`
            : `${value}${currencySymbol}`;
        };
        const formattedBoxData = [
          {
            number: formatCurrency(
              applicationsWithTags?.Applicationswithtags?.[0],
              currencySymbol,
              currencyPreference
            ),
            text: "Applications with Tags",
          },
          {
            number: formatCurrency(
              applicationsWithoutTags?.Applicationswithouttags?.[0],
              currencySymbol,
              currencyPreference
            ),
            text: "Applications without Tags",
          },
          {
            number: formatCurrency(
              projectsWithTags?.projectwithtags?.[0],
              currencySymbol,
              currencyPreference
            ),
            text: "Project with Tags",
          },
          {
            number: formatCurrency(
              projectsWithoutTags?.Projectwithouttags?.[0],
              currencySymbol,
              currencyPreference
            ),
            text: "Project without Tags",
          },
        ];

        setBoxData(formattedBoxData);
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProvider, billingMonth]);

  useEffect(() => {
    const fetchBillAllocationData = async () => {
      try {
        if (billingMonth.length == 0) {
          return;
        }
        setLoading(true);
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }

        const billAllocation = await api.getBillAllocation(
          inputData,
          billingMonth
        );

        function extractUniqueMonths(data) {
          const months = new Set();

          function traverse(obj) {
            if (obj && typeof obj === "object") {
              if ("modifieddate" in obj) {
                const month = new Date(obj.modifieddate)
                  .toISOString()
                  .slice(0, 7);
                months.add(month);
              }
              for (const key in obj) {
                traverse(obj[key]);
              }
            }
          }

          traverse(data);
          return Array.from(months);
        }

        const uniqueMonths = extractUniqueMonths(billAllocation);
        setUniqueMonths(uniqueMonths);

        // Transform bill allocation data into a hierarchical structure
        const transformBillAllocationDataDynamic = (data) => {
          const result = [];
          const allMonths = new Set();

          function collectMonths(data) {
            if (data && typeof data === "object") {
              if (data.modifieddate) {
                const month = new Date(data.modifieddate)
                  .toISOString()
                  .slice(0, 7);
                allMonths.add(month);
              }
              for (const key in data) {
                collectMonths(data[key]);
              }
            }
          }

          collectMonths(data);

          function transformNode(node, name = "root", type = "root") {
            let transformedNode = {
              name,
              type,
              children: [],
            };

            if (node && typeof node === "object" && !Array.isArray(node)) {
              for (const [key, value] of Object.entries(node)) {
                if (key === "modifieddate") {
                  continue;
                }

                if (typeof value === "object" && value !== null) {
                  transformedNode.children.push(
                    transformNode(value, key, "node")
                  );
                }
              }

              if (node.modifieddate) {
                const monthData = {};
                for (const uniqueMonth of allMonths) {
                  monthData[uniqueMonth] = {
                    tags_owner: null,
                    onDemandCost: 0,
                    reservedInstanceCost: 0,
                    savings: 0,
                    totalBill: 0,
                    deltaNormalizedVariationMoM: 0,
                    Normalized_Variation_MoM: 0,
                  };
                }

                const resourceMonth = new Date(node.modifieddate)
                  .toISOString()
                  .slice(0, 7);

                if (allMonths.has(resourceMonth)) {
                  monthData[resourceMonth] = {
                    tags_owner: node.tags_owner || null,
                    onDemandCost: node.onDemandCost || 0,
                    reservedInstanceCost: node.reservedInstanceCost || 0,
                    savings: node.savings || 0,
                    totalBill: node.totalBill || 0,
                    deltaNormalizedVariationMoM:
                      node.deltaNormalizedVariationMoM || 0,
                    Normalized_Variation_MoM:
                      node.Normalized_Variation_MoM || 0,
                  };
                }

                for (const [monthName, monthDetails] of Object.entries(
                  monthData
                )) {
                  transformedNode.children.push({
                    name: monthName,
                    type: "month",
                    ...monthDetails,
                  });
                }
              }

              if (
                transformedNode.children.some((child) => child.type === "month")
              ) {
                transformedNode.type = "resource";
              }
            }

            return transformedNode;
          }

          for (const [key, value] of Object.entries(data)) {
            result.push(transformNode(value, key, "application"));
          }

          return result;
        };

        const transformedData = transformBillAllocationDataDynamic(
          billAllocation.billAllocation
        );
        const applicationNames = transformedData.map((app) => app.name);
        setApplicationNames(applicationNames);

        //console.log("Transformed Data:", transformedData);
        setBillAllocationData(transformedData);
        setFilteredBillAllocationData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillAllocationData();
  }, [selectedProvider, billingMonth]);

  // const columns1 = [
  //   { key: "ownerName", label: "Owner Name" },
  //   { key: "totalBill", label: `Total Bill (${currencySymbol})` },
  //   { key: "normalizedVariation", label: "%Normalized Variation" },
  //   { key: "rawVariation", label: "%Raw Variation" },
  //   { key: "savings", label: `Savings (${currencySymbol})` },
  // ];
  const columns1 = [
    {
      tableTitle: "Total Bill Allocation across Application",
      columnHead1: { key: "applicationName", title: "Application Name" },
      columnHead2: { key: "tags_owner", title: "Owner Name" },
      columnHead3: {
        key: "totalBill",
        title: `Total Bill (${currencySymbol})`,
      },
      columnHead4: {
        key: "Normalized_Variation_MoM",
        title: `%Normalized Variation (${currencySymbol})`,
      },
      columnHead5: {
        key: "rawVariation",
        title: `%Raw Variation (${currencySymbol})`,
      },
      columnHead6: { key: "savings", title: `Savings (${currencySymbol})` },
    },
  ];
  // const columns1 = [
  //   {
  //     tableTitle: "Total Bill Allocation across Application",
  //     columnHead1: "Application Name",
  //     columnHead2: "Owner Name",
  //     columnHead3: `Total Bill (${currencySymbol})`,
  //     columnHead4: `%Normalized Variation (${currencySymbol})`,
  //     columnHead5: `%Raw Variation (${currencySymbol})`,
  //     columnHead6: `Savings (${currencySymbol})`,
  //   },
  // ];

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

  // const tableData = [
  //   {
  //     tableTitle: "Service Category Cost Allocation",
  //     columnHead1: { key: "serviceCategory", title: "Service Category" },
  //     columnHead2: {
  //       key: "TotalBill",
  //       title: `Total Bill (${currencySymbol})`,
  //     },
  //     columnHead3: {
  //       key: "OnDemandCost",
  //       title: `On Demand Cost (${currencySymbol})`,
  //     },
  //     columnHead4: {
  //       key: "CommitmentsCost",
  //       title: `Commitments Cost (${currencySymbol})`,
  //     },
  //     columnHead5: { key: "Savings", title: `Savings (${currencySymbol})` },
  //   },
  // ];

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
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          onMonthChange={handleMonthChange}
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
        <ContainerForBusinessCost data={boxData} loading={loading} />
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
            selectedFilters={selectedFilters}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
            billingMonth={billingMonth}
          />
        </div>
        <div style={{ flex: 1 }}>
          {" "}
          <MonthlyCostTrends
            selectedFilters={selectedFilters}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
            billingMonth={billingMonth}
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
        <TotalBillAllocationTable
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
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="">All Applications</MenuItem>
                {applicationNames.map((name, index) => (
                  <MenuItem key={index} value={name} className="menuItem">
                    {name === "null" ? "null" : name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          dummyData={filteredBillAllocationData}
          height="300px"
          width="92%"
          tableData={columns1}
          uniqueMonths={uniqueMonths}
          headerClass="headerClass-1"
          loading={loading}
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
          dummyData={serviceData}
          height="300px"
          width="97.5%"
          tableData={tableData}
          uniqueMonths={formattedDates}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BusinessCostSplit;
