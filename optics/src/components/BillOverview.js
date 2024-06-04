import React, { useState } from "react";
import Box from "./Box";
import BarChartContainer from "./BarChartContainer";
import PieChartContainer from "./PieChartContainer";
import InvoiceTableView from "./InvoiceTableView";
import Header from "./Header";
import Subheader from "./SubHeader";
import TotalBillView from "./TotalBillView";
import NavigationBar from "./NavigationBar";
//import BillOverviewBox from "./BillOverviewBox";
import ContainerBox from './ContainerBox';


const BillOverview = () => {
  const [showStackBars, setShowStackBars] = useState(true);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
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
      <div style={{ display: "flex", justifyContent: "center" }}>
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
            marginBottom: 20,
            paddingLeft: "45px",
            marginRight: "10px",
          }}
        >
          <BarChartContainer />
          <div style={{ marginTop: "10px" }}>
            <div style={{ marginTop: "20px", paddingRight: "18px" }}>
              <InvoiceTableView />
            </div>
          </div>
        </div>

        {/* Pie Chart Container */}
        <div
          style={{
            display: "flex",
            marginBottom: 0,
            marginLeft: "42px",
            marginTop: "-40px",
          }}
        >
          <PieChartContainer
            title1="Top 5 Applications"
            data1={data1}
            title2="Top 5 Services"
            data2={data2}
          />
          <div style={{ flex: 1, marginLeft: "2px", marginTop: "-5px" }}>
            <div style={{ paddingLeft: "0px", paddingRight: "10px" }}>
              <TotalBillView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOverview;
