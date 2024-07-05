import React, { useState, useEffect } from "react";
import Box from "./Box";
import BarChartContainer from "./BarChartContainer";
import PieChartContainer from "./PieChartContainer";
import InvoiceTableView from "./InvoiceTableView";
import Header from "./Header";
import Subheader from "./SubHeader";
//import TotalBillView from "./TotalBillView";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import api from "../api";

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

  const colorPalette = ["#0099C6", "#BA741A", "#FFCD00", "#00968F", "#5F249F"];

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
          api.getBillAllocation(),
          api.getInvoiceView(),
          api.getTotalBillVsSimulatedPaygo(),
          api.getTopServies(),
          api.getTopApplications(),
          api.getSavings(),
          api.getNormalizedVariation(),
        ]);

        const formattedBillAllocationData = billAllocation.billAllocation.map(
          (item) => ({
            name: item.tags_AppID_AppName || "null",
            ownerName: item.tags_owner || "null",
            onDemandCost: item.onDemandCost
              ? `$${item.onDemandCost.toFixed(2)}`
              : "$0.00",
              reservedInstanceCost: item.reservedInstanceCost !== null
              ? `$${item.reservedInstanceCost.toFixed(2)}`
              : "$0.00",
            savings: item.savings ? `$${item.savings.toFixed(2)}` : "$0.00",
            totalBill: item.totalBill
              ? `$${item.totalBill.toFixed(2)}`
              : "$0.00",
          })
        );

        const formattedInvoiceData = invoiceResponse.invoiceView.map(
          (item) => ({
            subscriptionName: item.subscriptionName,
            onDemandCost: `$${item.onDemandCost.toFixed(2)}`,
            reservedInstanceCost: `$${item.reservedInstanceCost.toFixed(2)}`,
            simulatedPayGoCost: `$${item.simulatedPayGoCost.toFixed(2)}`,
            savings: `$${item.savings.toFixed(2)}`,
            totalBill: `$${item.totalBill.toFixed(2)}`,
          })
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
            name: application.Application !== null ? application.Application : "null",
            value: parseFloat(application.totalcost.toFixed(2)),
            color: colorPalette[index % colorPalette.length],
          })
        );

        const totalSavings = savingsData.actualCost.toFixed(2);
        const simulatedBill = savingsData.simulatedCost.toFixed(2);
        const savings = savingsData.savings.toFixed(2);
        const percentageSavingsOverBill = savingsData.percentageSavings;
        const savingsOverPayGo = savingsData.savingsPayGo.toFixed(2); // Updated property name
        const percentageSavingsOverPayGo = savingsData.percentageSavingsOverPayGo!== null ? savingsData.percentageSavingsOverPayGo : "0.00";
        const normalizedVariation = normalizedVariationData.Normalized_Variation_MoM || "0.00";


        const dataSet1 = [
          { number:  `$${totalSavings}`, text: "Total Bill" },
          { number: `$${simulatedBill}`, text: "Simulated Bill" },
          { number: `$${savings}`, text: "Total Savings" },
          { number: `${percentageSavingsOverBill}%`, text: "% Savings over Bill" },
          { number: `${percentageSavingsOverPayGo}%`, text: "% Savings over Pay-as-you-go" },
          { number: `${normalizedVariation}%`, text: "Normalized Variation" }, 
        ];

        setBillAllocationData(formattedBillAllocationData);
        setFilteredBillAllocationData(formattedBillAllocationData);
        setInvoiceData(formattedInvoiceData);
        setChartData(formattedChartData);
        setTrendData(formattedTrendData);
        setTopServices(formattedTopServices);
        setTopApplications(formattedTopApplications);
        setBoxData(dataSet1);
        console.log("formatedtopApplications:" ,formattedTopApplications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      const filteredData = billAllocationData.filter(
        (item) => item.name === selectedReportType
      );
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
    margin: "20px 0", // Adjusted margin to create space between components
  };

  const pieChartStyle = {
    width: "55%",
    paddingTop: "45px",
    marginBottom: "110px", // Adjust individual chart width
  };

  // Remove duplicates for the dropdown options
  const uniqueBillAllocationData = Array.from(
    new Set(billAllocationData.map((item) => item.name))
  ).map((name) => billAllocationData.find((item) => item.name === name));

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "-12px", width: "200%" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: "18px" }}>Cost & Usage/</span>
              <span style={{ color: "#0070C0", fontSize: "18px" }}>
                Bill Overview
              </span>
            </div>
          }
          additionalFilters={additionalFilters}
        />
      </div>

      <NavigationBar />

      {/* Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-20px",
        }}
      >
        <ContainerBox data={boxData} />
      </div>

      {/* Chart and Table Containers */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        {/* Chart and Table Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "128%", // Ensures the container takes full width
            marginLeft: "-125px",
          }}
        >
          <div style={{ flex: 1, marginLeft: "-10px" }}>
            <BarChartContainer chartData={chartData} trendData={trendData} />
          </div>
          <div style={{ flex: 1, marginLeft: "-115px", marginTop: "10px" }}>
            <InvoiceTableView
              title="Invoice View"
              tableData={invoiceData}
              tableHeight="auto"
              tableWidth="595px"
              columns={columns}
              headerLabel="April - 24" // value for the prop
            />
          </div>
        </div>

        {/* Pie Chart Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%", // Ensures the container takes full width
            marginBottom: "20px", // Added space between pie chart and next section
            marginLeft: "-280px",
            marginTop: "-50px",
          }}
        >
          <div style={{ flex: 1, marginRight: "20px" }}>
            <PieChartContainer
              title1="Top 5 Applications"
              data1={topApplications}
              title2="Top 5 Services"
              data2={topServices}
              containerStyle={pieChartContainerStyle}
              chartStyle={pieChartStyle}
            />
          </div>
          <div style={{ flex: 1, marginLeft: "-7px" }}>
            <InvoiceTableView
              title={"Total Bill Allocation\nacross Application"}
              dropdown={
                <FormControl
                  variant="outlined"
                  style={{
                    minWidth: 110,
                    marginLeft: "-140px",
                    marginRight: "-10px",
                  }}
                >
                  <InputLabel id="report-type-label">Group by</InputLabel>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    value={reportType}
                    onChange={handleReportTypeChange}
                    label="Group by Application"
                  >
                    <MenuItem value="">All Applications</MenuItem>
                    {uniqueBillAllocationData.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name === "null" ? "null" : item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              tableData={filteredBillAllocationData}
              tableHeight="auto"
              tableWidth="600px"
              columns={columns1}
              headerLabel="April - 24" // value for the prop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOverview;