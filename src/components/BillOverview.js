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

const BillOverview = () => {
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

  const [selectedProvider, setSelectedProvider] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  let inputData = selectedFilters;

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  useEffect(() => {
    const fetchBillAllocationData = async () => {
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
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
              name: appName,
              ownerName: item.tags_owner || "null",
              onDemandCost: item.onDemandCost
                ? `${item.onDemandCost.toFixed(2)}`
                : "",
              reservedInstanceCost: item.reservedInstanceCost
                ? `${item.reservedInstanceCost.toFixed(2)}`
                : "",
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
                  reservedInstanceCost: "",
                  savings: "",
                  totalBill: "",
                }));
            }
            groupedData[key][dateIndex] = {
              name: item.name,
              ownerName: item.ownerName,
              onDemandCost: item.onDemandCost ? item.onDemandCost : "0.00",
              reservedInstanceCost: item.reservedInstanceCost
                ? item.reservedInstanceCost
                : "0.00",
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
        console.log("app", groupedData);
        const flattenedBillAllocationData = Object.values(groupedData).map(
          (entries) => {
            let hasNameBeenSet = false;
            return entries.reduce((acc, entry, index) => {
              // Include the name only for the first index (index 0)
              // if (index === 0) {
              //   acc[`name_${index}`] = entry.name;
              // }
              if (!acc.name && entry.name && entry.name.trim()) {
                acc[`name_${index}`] = entry.name;
                hasNameBeenSet = true; // Store the first non-empty name
              }
              acc[`ownerName_${index}`] = entry.ownerName;
              acc[`onDemandCost_${index}`] = entry.onDemandCost;
              acc[`reservedInstanceCost_${index}`] = entry.reservedInstanceCost;
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
        console.log("flattenedBillAllocationData", flattenedBillAllocationData);
        // Set the required state for your application
        setBillAllocationData(flattenedBillAllocationData);
        console.log("billAL", billAllocationData);
        setFilteredBillAllocationData(flattenedBillAllocationData);
        setHeaderLabelsForBillAllocation(uniqueModifiedDatesForBillAllocation);
        setUniqueBillAllocationData(uniqueNames);
        setCurrencySymbol(currencySymbol);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBillAllocationData();
  }, [selectedProvider]);

  useEffect(() => {
    const fetchInvoiceViewData = async () => {
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const invoiceResponse = await api.getInvoiceView(inputData);

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
        console.log("data", flattenedInvoiceData);
        const subscriptionNames = flattenedInvoiceData.map(
          (item) => item.subscriptionName
        );
        setSubscriptions(subscriptionNames);
        setInvoiceData(flattenedInvoiceData);
        setHeaderLabelsForInvoice(uniqueModifiedDatesForInvoice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchInvoiceViewData();
  }, [selectedProvider]);

  useEffect(() => {
    const fetchTotalBillVsSimulatedPaygoData = async () => {
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const totalBillVsSimulatedPaygo =
          await api.getTotalBillVsSimulatedPaygo(inputData);

        console.log("TotalBillVsSimulatedPaygo:", totalBillVsSimulatedPaygo);
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
      }
    };

    fetchTotalBillVsSimulatedPaygoData();
  }, [selectedProvider]);

  useEffect(() => {
    const fetchTopServiesApplicationsData = async () => {
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const [topServicesData, topApplicationData] = await Promise.all([
          api.getTopServies(inputData),
          api.getTopApplications(inputData),
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
      }
    };

    fetchTopServiesApplicationsData();
  }, [selectedProvider]);

  useEffect(() => {
    const fetchSavingsNormalizedVariationData = async () => {
      try {
        if (!inputData) {
          console.log("No input data, skipping API calls.");
          return;
        }
        const [savingsData, normalizedVariationData] = await Promise.all([
          api.getSavings(inputData),
          api.getNormalizedVariation(inputData),
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
      }
    };

    fetchSavingsNormalizedVariationData();
  }, [selectedProvider]);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };

  const handleReportTypeChange = (event) => {
    const selectedReportType = event.target.value;
    setReportType(selectedReportType);
    console.log("billAllocationData", billAllocationData);
    if (selectedReportType) {
      const filteredData = billAllocationData.filter((item) => {
        return Object.keys(item).some(
          (key) => key.startsWith("name_") && item[key] === selectedReportType
        );
      });
      console.log("fltered", filteredData);
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
      console.log("variable:", selectedApplication);
      setApplicationData(selectedApplication);
      setFilteredBillAllocationData(filteredData);
      console.log("filter", filteredData);
    } else {
      // const selectedApplication = billAllocationData.map((item) => item.name_0);
      const selectedApplication = billAllocationData.map((item) => {
        // Find the first available non-empty name among name_0, name_1, name_2
        return (
          item.name_0?.trim() ||
          item.name_1?.trim() ||
          item.name_2?.trim() ||
          "No Name Found"
        );
      });
      console.log("variable1:", selectedApplication);
      setApplicationData(selectedApplication);
      setFilteredBillAllocationData(billAllocationData);
      console.log("filter1", billAllocationData);
    }
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
    { key: "ownerName", label: "Owner Name" },
    { key: "onDemandCost", label: `On Demand Cost (${currencySymbol})` },
    {
      key: "reservedInstanceCost",
      label: `Reserved Instances Cost (${currencySymbol})`,
    },
    { key: "savings", label: `Savings (${currencySymbol})` },
    { key: "totalBill", label: `Total Bill (${currencySymbol})` },
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
        <ContainerForBillOverview data={boxData} />
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
        <InvoiceTableView
          title="Total Bill Allocation across Application"
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
                {uniqueBillAllocationData.map((name, index) => (
                  <MenuItem key={index} value={name} className="menuItem">
                    {name === "null" ? "null" : name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          tableData={filteredBillAllocationData}
          tableHeight="300px"
          tableWidth="92%"
          columns={columns1}
          headerLabels={headerLabelsForBillAllocation}
          columnData={applicationData}
          columnTitle="Application Name"
          headerClass="headerClass"
        />
      </div>
    </div>
  );
};

export default BillOverview;
