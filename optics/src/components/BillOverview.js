import React, { useState } from "react";
import Box from "./Box";
import BarChartContainer from "./BarChartContainer";
import PieChartContainer from "./PieChartContainer";
import InvoiceTableView from "./InvoiceTableView";
import Header from "./Header";
import Subheader from "./SubHeader";
import TotalBillView from "./TotalBillView";
import NavigationBar from "./NavigationBar";
import ContainerBox from './ContainerBox';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import chartData from './chartData.json'; // Import your chart data
import trendData from './trendData.json'; // Import your trend data

const BillOverview = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [reportType, setReportType] = useState('');

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const data1 = [
    { name: "App 1", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "App 2", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "App 3", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    { name: "App 4", value: Math.floor(Math.random() * 100), color: "#00968F" },
    { name: "App 5", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];

  const data2 = [
    {
      name: "Virtual Machines",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "Storage",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "Azure NetApp Files",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Bandwidth",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    { name: "Files", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];

  const dataSet1 = [
    { number: "$1.40M", text: "Total Bill" },
    { number: "$2.00M", text: "Simulated Bill" },
    { number: "$570K", text: "Total Savings" },
    { number: "52.3%", text: "%Savings over Bill" },
    { number: "61.3%", text: "%Savings over Pay-as-you-go" },
    { number: "10.2%", text: "Normalized Variation" },
    { number: "13.7%", text: "%Raw Variation" },
  ];

  const dummyData = [
    { name: 'Subscription 1', onDemandCost: '$100', reservedInstancesCost: '$200', simulatedPAYGO: '$150', savings: '$50', totalBill: '$400' },
    { name: 'Subscription 2', onDemandCost: '$120', reservedInstancesCost: '$180', simulatedPAYGO: '$130', savings: '$60', totalBill: '$490' },
    { name: 'Subscription 3', onDemandCost: '$120', reservedInstancesCost: '$180', simulatedPAYGO: '$130', savings: '$60', totalBill: '$490' },
    // Add more dummy data as needed
  ];

  const columns = [
    { key: 'name', label: 'Subscription/Account Name' },
    { key: 'onDemandCost', label: 'On Demand Cost' },
    { key: 'reservedInstancesCost', label: 'Reserved Instances Cost' },
    { key: 'simulatedPAYGO', label: 'Simulated PAYGO' },
    { key: 'savings', label: 'Savings' },
    { key: 'totalBill', label: 'Total Bill' },
  ];

  const columns1 = [
    { key: 'name', label: 'Application Name' },
    { key: 'ownerName', label:'Owner Name'},
    { key: 'onDemandCost', label: 'On Demand Cost' },
    { key: 'reservedInstancesCost', label: 'Reserved Instances Cost' },
    { key: 'savings', label: 'Savings' },
    { key: 'totalBill', label: 'Total Bill' },
  ];

  const dummyData1 = [
    { name: 'Subscription 1',ownerName:'Mark', onDemandCost: '$100', reservedInstancesCost: '$200', savings: '$50', totalBill: '$400' },
    { name: 'Subscription 2',ownerName:'Jack', onDemandCost: '$120', reservedInstancesCost: '$180',  savings: '$60', totalBill: '$490' },
    { name: 'Subscription 3',ownerName:'John', onDemandCost: '$100', reservedInstancesCost: '$180',  savings: '$60', totalBill: '$490' },
    // Add more dummy data as needed
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
        />
      </div>

      <NavigationBar />

      {/* Boxes */}
      <div style={{ display: "flex", justifyContent: "center",marginLeft:"-20px" }}>
        <ContainerBox data={dataSet1} />
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
            marginLeft:"-125px",
          }}
        >
          <div style={{ flex: 1, marginLeft:"-10px" }}>
            <BarChartContainer chartData={chartData} trendData={trendData} />
          </div>
          <div style={{ flex: 1, marginLeft:"-115px", marginTop:"10px" }}>
            <InvoiceTableView
              title="Invoice View"
              tableData={dummyData}
              tableHeight="auto"
              tableWidth="595px"
              columns={columns}
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
            marginLeft : "-280px",
            marginTop:"-50px",
          }}
        >
          <div style={{ flex: 1, marginRight: "20px" }}>
            <PieChartContainer
              title1="Top 5 Applications"
              data1={data1}
              title2="Top 5 Services"
              data2={data2}
              containerStyle={pieChartContainerStyle}
              chartStyle={pieChartStyle}
            />
          </div>
          <div style={{ flex: 1,marginLeft:"-7px" }}>
          <InvoiceTableView
               title={
                <>
                  Total Bill Allocation across
                  <br />
                  Application/Project
                </>
              }
              dropdown={
                <FormControl variant="outlined" style={{ minWidth: 110, marginLeft:"-140px",marginRight:"-10px"}}>
                  <InputLabel id="report-type-label">Group by</InputLabel>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    value={reportType}
                    onChange={handleReportTypeChange}
                    label="Group by Application"
                  >
                    <MenuItem value="">Group by Application</MenuItem>
                    <MenuItem value="app1">Application 1</MenuItem>
                    <MenuItem value="app2">Application 2</MenuItem>
                    <MenuItem value="app3">Application 3</MenuItem>
                  </Select>
                </FormControl>
              }
              tableData={dummyData1}
              tableHeight="auto"
              tableWidth="600px"
              columns={columns1}
            />
        </div>
      </div>
    </div>
  </div>
  );
};

export default BillOverview;
