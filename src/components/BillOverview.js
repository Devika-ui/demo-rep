import React, { useState, useEffect } from "react";
import BarChartContainer from "./BarChartContainer";
import PieChartContainer from "./PieChartContainer";
import InvoiceTableView from "./InvoiceTableView";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerForBillOverview from "./ContainerForBillOverview";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import api from "../api";
import "../css/Billoverview.scss";
import "../css/components/BillAllocation.css";
import componentUtil from "../componentUtil.js";
import TotalBillAllocationTable from "./TotalBillAllocationTable.js";

const BillOverview = () => {
  sessionStorage.removeItem("overviewPage");
  const [showStackBars, setShowStackBars] = useState(true);
  const [reportType, setReportType] = useState("");
  const [billAllocationData, setBillAllocationData] = useState([]);
  const [filteredBillAllocationData, setFilteredBillAllocationData] = useState(
    []
  );
  const [invoiceData, setInvoiceData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [topApplications, setTopApplications] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [headerLabelsForInvoice, setHeaderLabelsForInvoice] = useState([]);
  const [headerLabelsForBillAllocation, setHeaderLabelsForBillAllocation] =
    useState([]);
  const [uniqueBillAllocationData, setUniqueBillAllocationData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const colorPalette = ["#0099C6", "#BA741A", "#FFCD00", "#00968F", "#5F249F"];
  const [subscriptions, setSubscriptions] = useState({});
  const [applicationData, setApplicationData] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [currencyPreference, setCurrencyPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(100);
  const [selectedFilters, setSelectedFilters] = useState([]);
  let inputData = selectedFilters;
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [filteredData, setFilteredData] = useState(billAllocationData);
  const [applicationNames, setApplicationNames] = useState([]);
  const [billingMonth, setBillingMonth] = useState([]);

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
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
      setFilteredBillAllocationData(billAllocationData);
    }
  };

  useEffect(() => {
    const fetchBillAllocationData = async () => {
      setLoading(true);
      try {
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

                // Convert month data into an array and attach as children
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

              // Adjust the type of the current node to "resource" if it has "month" children
              if (
                transformedNode.children.some((child) => child.type === "month")
              ) {
                transformedNode.type = "resource";
              }
            }

            return transformedNode;
          }

          // Transform the top-level structure
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

        // console.log("Transformed Data:", transformedData);
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

  useEffect(() => {
    const fetchInvoiceViewData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const invoiceResponse = await api.getInvoiceView(
          inputData,
          billingMonth
        );

        const invoiceMap = Object.entries(invoiceResponse.invoiceView).reduce(
          (acc, [subscriptionName, data]) => {
            // Loop over each subscription data
            data.forEach((item) => {
              const modifiedDate = new Date(item.modifieddate);
              const monthString = modifiedDate.toLocaleString("en-US", {
                month: "long",
              });
              const yearString = modifiedDate
                .getFullYear()
                .toString()
                .slice(-2);
              const formattedDate = `${monthString}-${yearString}`;

              // Create the map for unique months
              if (!acc[formattedDate]) {
                acc[formattedDate] = [];
              }

              // Add data for each subscription and formatted date
              acc[formattedDate].push({
                subscriptionName: subscriptionName,
                onDemandCost: `${item.onDemandCost.toFixed(2)}`,
                // reservedInstanceCost: `${item.reservedInstanceCost.toFixed(2)}`,
                reservedInstanceCost: item.reservedInstanceCost
                  ? `${item.reservedInstanceCost.toFixed(2)}`
                  : " ",
                simulatedPayGoCost: `${item.simulatedPayGoCost.toFixed(2)}`,
                savings: `${item.savings.toFixed(2)}`,
                totalBill: `${item.totalBill.toFixed(2)}`,
              });
            });

            return acc;
          },
          {}
        );

        // Extract unique months from the invoiceMap
        const uniqueModifiedDatesForInvoice = Object.keys(invoiceMap);
        const flattenedInvoiceData = uniqueModifiedDatesForInvoice.reduce(
          (acc, date, dateIndex) => {
            invoiceMap[date].forEach((item, itemIndex) => {
              // Check if the subscription already exists in the accumulator
              let existingEntry = acc.find(
                (entry) => entry.subscriptionName === item.subscriptionName
              );

              if (!existingEntry) {
                // Create a new entry if it doesn't exist
                existingEntry = { subscriptionName: item.subscriptionName };
                acc.push(existingEntry);
              }

              // Add each column's data for the current month under a separate key
              columns.forEach((col) => {
                if (col.key !== "subscriptionName") {
                  existingEntry[`${col.key}_${dateIndex}`] = item[col.key];
                }
              });
            });

            return acc;
          },
          []
        );

        // Set state for the table data and the unique month labels

        const subscriptionNames = flattenedInvoiceData.map(
          (item) => item.subscriptionName
        );
        setSubscriptions(subscriptionNames);
        setInvoiceData(flattenedInvoiceData);
        setHeaderLabelsForInvoice(uniqueModifiedDatesForInvoice);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceViewData();
  }, [selectedProvider, billingMonth]);

  useEffect(() => {
    const fetchTotalBillVsSimulatedPaygoData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const totalBillVsSimulatedPaygo =
          await api.getTotalBillVsSimulatedPaygo(inputData, billingMonth);

        const formattedChartData = totalBillVsSimulatedPaygo.costsPAYGO.map(
          (item) => {
            const savingsItem = totalBillVsSimulatedPaygo.savingsRI.find(
              (s) => s.modifieddate === item.modifieddate
            );
            const simulatedItem = totalBillVsSimulatedPaygo.simulatedpaygo.find(
              (s) => s.Date === item.modifieddate
            );
            return {
              modifieddate: item.modifieddate.slice(0, 10), // Format the date to "YYYY-MM-DD"
              costsPAYGO: item.totalCost,
              savingsRI: savingsItem ? savingsItem.savings : 0,
              simulated: simulatedItem ? simulatedItem.simulated : 0,
            };
          }
        );

        const formattedTrendData = totalBillVsSimulatedPaygo.simulatedpaygo.map(
          (item) => ({
            Date: item.Date.slice(0, 10), // Format the date to "YYYY-MM-DD"
            simulated: item.simulated,
          })
        );

        setChartData(formattedChartData);
        setTrendData(formattedTrendData);

        const legendData = [
          {
            dataKey: "costsPAYGO",
            name: "Pay as you go",
            color: "rgba(95, 36, 159, 0.8)",
            type: "Bar",
          },
          {
            dataKey: "savingsRI",
            name: "Reservations",
            color: "rgba(0, 150, 143, 0.8)",
            type: "Bar",
          },
          {
            dataKey: "simulated",
            name: "Simulated PAYGO",
            color: "rgba(0, 153, 198, 0.8)",
            type: "Line",
          },
        ];
        setLegendData(legendData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalBillVsSimulatedPaygoData();
  }, [selectedProvider, billingMonth]);

  useEffect(() => {
    const fetchTopServiesApplicationsData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const [topServicesData, topApplicationData] = await Promise.all([
          api.getTopServies(inputData, billingMonth),
          api.getTopApplications(inputData, billingMonth),
        ]);

        const formattedTopServices = topServicesData.topServices.map(
          (service, index) => ({
            name: service.Service !== null ? service.Service : "null",
            value: parseFloat(service.totalcost.toFixed(2)),
            color: colorPalette[index % colorPalette.length],
          })
        );
        const formattedTopApplications = topApplicationData.topApplications.map(
          (application, index) => ({
            name:
              application.Application !== null
                ? application.Application
                : "null",
            value: parseFloat(application.totalcost.toFixed(2)),
            color: colorPalette[index % colorPalette.length],
          })
        );

        setTopServices(formattedTopServices);
        setTopApplications(formattedTopApplications);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopServiesApplicationsData();
  }, [selectedProvider, billingMonth]);

  useEffect(() => {
    const fetchSavingsNormalizedVariationData = async () => {
      if (billingMonth.length == 0) {
        return;
      }
      setLoading(true);
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const [savingsData, normalizedVariationData] = await Promise.all([
          api.getSavings(inputData, billingMonth),
          api.getNormalizedVariation(inputData, billingMonth),
        ]);
        const currencySymbol = await componentUtil.getCurrencySymbol();
        const currencyPreference = await componentUtil.getCurrencyPreference();
        const totalSavings = savingsData.actualCost.toFixed(2);
        const simulatedBill = savingsData.simulatedCost.toFixed(2);
        const savings = savingsData.savings.toFixed(2);
        const percentageSavingsOverBill = savingsData.percentageSavings;
        const savingsOverPayGo = savingsData.savingsPayGo.toFixed(2);
        const percentageSavingsOverPayGo =
          savingsData.percentageSavingsOverPayGo !== null
            ? savingsData.percentageSavingsOverPayGo
            : "0.00";
        const normalizedVariation =
          normalizedVariationData.Normalized_Variation_MoM || "0.00";
        const formatCurrency = (value) => {
          return currencyPreference === "start"
            ? `${currencySymbol}${value}` // Symbol at the start
            : `${value}${currencySymbol}`; // Symbol at the end
        };

        const dataSet1 = [
          { number: formatCurrency(totalSavings), text: "Total Bill" },
          {
            number: formatCurrency(simulatedBill),
            text: "Simulated Bill",
          },
          { number: formatCurrency(savings), text: "Total Savings" },
          {
            number: `${percentageSavingsOverBill}%`,
            text: "% Savings over Bill",
          },
          {
            number: `${percentageSavingsOverPayGo}%`,
            text: "% Savings over Pay-Go",
          },
          { number: `${normalizedVariation}%`, text: "Normalized Variation" },
        ];
        setBoxData(dataSet1);
        setCurrencySymbol(currencySymbol);
        setCurrencyPreference(currencyPreference);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsNormalizedVariationData();
  }, [selectedProvider, billingMonth]);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };
  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  const columns = [
    { key: "onDemandCost", label: `On Demand Cost (${currencySymbol})` },
    {
      key: "reservedInstanceCost",
      label: `Reserved Instances Cost (${currencySymbol})`,
    },
    { key: "simulatedPayGoCost", label: `Simulated PAYGO (${currencySymbol})` },
    { key: "savings", label: `Savings (${currencySymbol})` },
    { key: "totalBill", label: `Total Bill (${currencySymbol})` },
  ];

  const columns1 = [
    // { key: "name", label: "Application Name" },
    // { key: "ownerName", label: "Owner Name" },
    // { key: "onDemandCost", label: `On Demand Cost(${currencySymbol})` },
    // {
    //   key: "reservedInstanceCost",
    //   label: `Reserved Instances Cost (${currencySymbol})`,
    // },
    // { key: "savings", label: `Savings (${currencySymbol})` },
    // { key: "totalBill", label: `Total Bill (${currencySymbol})` },
    {
      tableTitle: "Total Bill Allocation across Application",
      columnHead1: { key: "applicationName", title: "Application Name" },
      columnHead2: { key: "tags_owner", title: "Owner Name" },
      columnHead3: {
        key: "onDemandCost",
        title: `On Demand Cost (${currencySymbol})`,
      },
      columnHead4: {
        key: "reservedInstanceCost",
        title: `Reserved Instances Cost (${currencySymbol})`,
      },
      columnHead5: { key: "savings", title: `Savings (${currencySymbol})` },
      columnHead6: {
        key: "totalBill",
        title: `Total Bill (${currencySymbol})`,
      },
    },
  ];
  const pieChartContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px -7px",
    width: "100%",
    flexGrow: "1",
    flexBasis: "100%",
    height: "47.3vh",
    // Adjusted margin to create space between components
  };

  const pieChartStyle = {
    width: "100%",
    paddingTop: "25px",
    //  marginBottom: "160px", // Adjust individual chart width
    marginTop: "-1rem",
  };

  const titleStyle1 = {
    fontSize: "1rem",
    marginLeft: "4.4rem",
    position: "absolute", // Changed to absolute positioning
    marginTop: "-0.4rem",
  };

  const titleStyle2 = {
    fontSize: "1rem",
    marginTop: "-0.4rem",
    // marginBottom: "-5px",
    marginLeft: "6.2rem",
    position: "absolute",
  };

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
          Bill Overview
        </Typography>
        <Subheader
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          onMonthChange={handleMonthChange}
        />
        <NavigationBar />
      </Box>

      {/* Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-33px",
          marginRight: "2px",
          marginTop: "-5px",
        }}
      >
        <ContainerForBillOverview data={boxData} loading={loading} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          marginTop: "-27px",
          flexWrap: "wrap",
          gap: "5px",
          // flexDirection: "row", // Default for larger screens
        }}
        className="chart-container"
      >
        <div
          style={{
            flex: 1,
            marginLeft: "2.8rem",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <PieChartContainer
            title1="Top 5 Applications"
            data1={topApplications}
            title2="Top 5 Services"
            data2={topServices}
            loading={loading}
            containerStyle={pieChartContainerStyle}
            chartStyle={pieChartStyle}
            pieChartHeight1={"100%"}
            pieChartHeight2={"95%"}
            titleStyle1={titleStyle1}
            titleStyle2={titleStyle2}
            legendWrapperStyle1={{ bottom: 5, fontSize: "10px" }}
            legendWrapperStyle2={{ bottom: 5, fontSize: "10px" }}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
          />
        </div>

        <div style={{ flex: 1, marginRight: "-0.6rem", marginTop: "1.2rem" }}>
          <BarChartContainer
            chartData={chartData}
            trendData={trendData}
            showStackBars={showStackBars}
            title="Total Bill vs. Simulated PAYGO"
            legendData={legendData}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
            loading={loading}
          />
        </div>
      </div>

      {/* Second Row: Invoice View */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "33px",
          marginLeft: "-8px",
          width: "100%",
          marginTop: "-80px",
        }}
      >
        <InvoiceTableView
          title="Invoice View"
          tableData={invoiceData}
          tableHeight="300px"
          tableWidth="92%"
          columns={columns}
          headerLabels={headerLabelsForInvoice}
          columnData={subscriptions}
          columnTitle="Subscription Name"
          headerClass="headerClass-1"
          overlayHeight="55vh"
          loading={loading}
        />
      </div>
      {/* Third Row: Total Bill Allocation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "33px",
          marginLeft: "-8px",
          marginTop: "-95px",
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
    </div>
  );
};

export default BillOverview;
