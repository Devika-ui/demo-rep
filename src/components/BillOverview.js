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
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const colorPalette = ["#0099C6", "#BA741A", "#FFCD00", "#00968F", "#5F249F"];

  const handleSubscriptionsFetch = (data) => {
    setSubscriptionsData(data);
  };
  const additionalFilters = [
    {
      label: "Service Category(s)",
      name: "Select Service Category",
      options: [
        { value: "Service Category 1", label: "Service Category 1" },
        { value: "Service Category 2", label: "Service Category 2" },
        { value: "Service Category 3", label: "Service Category 3" },
      ],
    },
    {
      label: "Owner(s)",
      name: "Select Owner",
      options: [
        { value: "Owner 1", label: "Owner 1" },
        { value: "Owner 2", label: "Owner 2" },
        { value: "Owner 3", label: "Owner 3" },
      ],
    },
    {
      label: "Select Cost",
      name: "Select Cost",
      options: [
        { value: "Actual Cost", label: "Actual Cost" },
        { value: "Amortized Cost", label: "Amortized Cost" },
        { value: "Cost Unblended", label: "Cost Unblended" },
        { value: "Cost Blended", label: "Cost Blended" },
      ],
    },
    {
      label: "Environment(s)",
      name: "environments",
      options: [
        { value: "Production", label: "Production" },
        { value: "Staging", label: "Staging" },
        { value: "Development", label: "Development" },
      ],
    },
    {
      label: "Cost Center(s)",
      name: "Select Cost Center",
      options: [
        { value: "Cost Center1", label: "Cost Center1" },
        { value: "Cost Center2", label: "Cost Center2" },
        { value: "Cost Center3", label: "Cost Center3" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          billAllocation,
          invoiceResponse,
          totalBillVsSimulatedPaygo,
          topServicesData,
          topApplicationData,
          savingsData,
          normalizedVariationData,
        ] = await Promise.all([
          api.getBillAllocation(subscriptionsData),
          api.getInvoiceView(subscriptionsData),
          api.getTotalBillVsSimulatedPaygo(subscriptionsData),
          api.getTopServies(subscriptionsData),
          api.getTopApplications(subscriptionsData),
          api.getSavings(subscriptionsData),
          api.getNormalizedVariation(subscriptionsData),
        ]);

        //formatted bill application
        const billAllocationMap = billAllocation.billAllocation.reduce(
          (acc, item) => {
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
              name: item.tags_AppID_AppName || "null",
              ownerName: item.tags_owner || "null",
              onDemandCost: item.onDemandCost
                ? `${item.onDemandCost.toFixed(2)}`
                : "0.00",
              reservedInstanceCost:
                item.reservedInstanceCost !== null
                  ? `${item.reservedInstanceCost.toFixed(2)}`
                  : "0.00",
              savings: item.savings ? `${item.savings.toFixed(2)}` : "0.00",
              totalBill: item.totalBill
                ? `${item.totalBill.toFixed(2)}`
                : "0.00",
            });

            return acc;
          },
          {}
        );

        const uniqueModifiedDatesForBillAllocation =
          Object.keys(billAllocationMap);
        const flattenedBillAllocationData =
          uniqueModifiedDatesForBillAllocation.reduce(
            (acc, date, dateIndex) => {
              billAllocationMap[date].forEach((item, itemIndex) => {
                if (!acc[itemIndex]) acc[itemIndex] = {};
                columns1.forEach((col) => {
                  acc[itemIndex][`${col.key}_${dateIndex}`] = item[col.key];
                });
              });
              return acc;
            },
            []
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
        console.log("uniqueNames", uniqueNames);

        const invoiceMap = invoiceResponse.invoiceView.reduce((acc, item) => {
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
            subscriptionName: item.subscriptionName,
            onDemandCost: `${item.onDemandCost.toFixed(2)}`,
            reservedInstanceCost: `${item.reservedInstanceCost.toFixed(2)}`,
            simulatedPayGoCost: `${item.simulatedPayGoCost.toFixed(2)}`,
            savings: `${item.savings.toFixed(2)}`,
            totalBill: `${item.totalBill.toFixed(2)}`,
          });

          return acc;
        }, {});

        const uniqueModifiedDatesForInvoice = Object.keys(invoiceMap);
        const flattenedInvoiceData = uniqueModifiedDatesForInvoice.reduce(
          (acc, date, dateIndex) => {
            invoiceMap[date].forEach((item, itemIndex) => {
              if (!acc[itemIndex]) acc[itemIndex] = {};
              columns.forEach((col) => {
                acc[itemIndex][`${col.key}_${dateIndex}`] = item[col.key];
              });
            });
            return acc;
          },
          []
        );

        console.log("TotalBillVsSimulatedPaygo:", totalBillVsSimulatedPaygo);
        console.log("topApplicationData:", topApplicationData);
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

        const totalSavings = savingsData.actualCost.toFixed(2);
        const simulatedBill = savingsData.simulatedCost.toFixed(2);
        const savings = savingsData.savings.toFixed(2);
        const percentageSavingsOverBill = savingsData.percentageSavings;
        const savingsOverPayGo = savingsData.savingsPayGo.toFixed(2); // Updated property name
        const percentageSavingsOverPayGo =
          savingsData.percentageSavingsOverPayGo !== null
            ? savingsData.percentageSavingsOverPayGo
            : "0.00";
        const normalizedVariation =
          normalizedVariationData.Normalized_Variation_MoM || "0.00";

        const dataSet1 = [
          { number: `${totalSavings}`, text: "Total Bill" },
          { number: `${simulatedBill}`, text: "Simulated Bill" },
          { number: `${savings}`, text: "Total Savings" },
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

        setBillAllocationData(flattenedBillAllocationData);
        setFilteredBillAllocationData(flattenedBillAllocationData);
        setChartData(formattedChartData);
        setTrendData(formattedTrendData);
        setTopServices(formattedTopServices);
        setTopApplications(formattedTopApplications);
        setBoxData(dataSet1);
        console.log("formatedtopApplications:", formattedTopApplications);
        setInvoiceData(flattenedInvoiceData);
        setHeaderLabelsForInvoice(uniqueModifiedDatesForInvoice);
        setHeaderLabelsForBillAllocation(uniqueModifiedDatesForBillAllocation);
        setUniqueBillAllocationData(uniqueNames);

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

    fetchData();
  }, [subscriptionsData]);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
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
      setFilteredBillAllocationData(filteredData);
    } else {
      setFilteredBillAllocationData(billAllocationData);
    }
  };

  const columns = [
    { key: "subscriptionName", label: "Subscription/Account Name" },
    { key: "onDemandCost", label: "On Demand Cost" },
    { key: "reservedInstanceCost", label: "Reserved Instances Cost" },
    { key: "simulatedPayGoCost", label: "Simulated PAYGO" },
    { key: "savings", label: "Savings" },
    { key: "totalBill", label: "Total Bill" },
  ];

  const columns1 = [
    { key: "name", label: "Application Name" },
    { key: "ownerName", label: "Owner Name" },
    { key: "onDemandCost", label: "On Demand Cost" },
    { key: "reservedInstanceCost", label: "Reserved Instances Cost" },
    { key: "savings", label: "Savings" },
    { key: "totalBill", label: "Total Bill" },
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
          onSubscriptionsFetch={handleSubscriptionsFetch}
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
          />
        </div>

        <div style={{ flex: 1, marginRight: "-0.6rem", marginTop: "1.2rem" }}>
          <BarChartContainer
            chartData={chartData}
            trendData={trendData}
            showStackBars={showStackBars}
            title="Total Bill vs. Simulated PAYGO"
            legendData={legendData}
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
          headerClass="headerClass"
        />
      </div>
    </div>
  );
};

export default BillOverview;
