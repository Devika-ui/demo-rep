import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import PieChartContainer from "./PieChartContainer";
import ContainerBox from "./ContainerBox";
import GenericBarChart from "./GenericBarChart";
//import Sqlbar from "./Sqlbar";
import ServiceCategory from "./ServiceCategory";
 
const SqlVmLicenses = () => {
  const [showStackBars, setShowStackBars] = useState(true);
 
  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };
  const data = [
    {
      name: "Subscription 1",
      "On Demand Cost": 400000,
      "Consumed Meter": 50000,
    },
    {
      name: "Subscription 2",
      "On Demand Cost": 250000,
      "Consumed Meter": 80000,
    },
    {
      name: "Subscription 3",
      "On Demand Cost": 90000,
      "Consumed Meter": 10000,
    },
    {
      name: "Subscription 4",
      "On Demand Cost": 50000,
      "Consumed Meter": 115000,
    },
    {
      name: "Subscription 5",
      "On Demand Cost": 25000,
      "Consumed Meter": 100000,
    },
    {
      name: "Subscription 6",
      "On Demand Cost": 15000,
      "Consumed Meter": 75000,
    },
  ];
 
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
    { number: "20", text: "Total Count Of AHUB License" },
    { number: "10", text: "Total count Of PAYGO License" },
  ];
 
  const dummyData = [
    {
      name: "Virtual Machine",
      totalBill: "$400",
      onDemandCost: "$100",
      commitmentsCost: "$200",
      savings: "$50",
      budget: "10",
      services: [
        {
          name: "VM1",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG1",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM1-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM1-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG2",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM2-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM2-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "VM2",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG3",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM3-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM3-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG4",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM4-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM4-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      totalBill: "$300",
      onDemandCost: "$120",
      commitmentsCost: "$180",
      savings: "$60",
      budget: "10",
      services: [
        {
          name: "Storage1",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG5",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage1-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage1-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG6",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage2-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage2-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "Storage2",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG7",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage3-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage3-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG8",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage4-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage4-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
 
  const tableData = [
    {
      tableTitle: "On Demand Cost Allocation for licenses",
      columnHead1: "Item Name",
      columnHead2: " SQL Server License Type ",
      columnHead3: " Total Cost",
      columnHead4: " Owner name",
      columnHead5: "Application ",
      columnHead6: "Environment",
    },
  ];
 
  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "18px" }}>Recommendations/</span>
            <span style={{ color: "#0070C0", fontSize: "18px" }}>
              SQLVMLicenses
            </span>
          </div>
        }
      />
      <NavigationBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ContainerBox data={dataSet1} />
      </div>
 
      {/* Pie Chart Container */}
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
          transform: "translate(90px,-10px,)",
          height: "auto",
          position: "relative",
          width: "100%", // Ensure the container takes full width of the page
          justifyContent: "center", // Center align the content horizontally
          alignItems: "center",
        }}
      >
        <div style={{ width: "70%", paddingLeft: "50px" }}>
          <GenericBarChart
            title="Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
            data={data}
            //yAxisLabel="1000 metric tons (MT)"
          />
        </div>
        <div style={{ width: "50%", paddingRight: "20px" }}>
          <PieChartContainer
            title1="Top 5 Applications"
            data1={data1}
            title2="Top 5 Services"
            data2={data2}
          />
        </div>
      </div>
 
      <div
        style={{
          width: "300%",
          maxWidth: 1200, // Ensure parent container takes full width
          display: "flex",
          marginLeft: "100px",
          marginBottom: "-380px",
          paddingBottom: "100px",
          // Center the child component if needed
        }}
      >
        <ServiceCategory
          dummyData={dummyData}
          height="350px"
          width="1130px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};
 
export default SqlVmLicenses;