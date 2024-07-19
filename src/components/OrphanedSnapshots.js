import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import PieChartContainer from "./PieChartContainer.js";
import GenericBarChart from "./GenericBarChart.js";
import HorizontalBarGraph from "./HorizontalBarGraph.js";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import CostsAmortized from "./CostsAmortized.js";
import Button from "@mui/material/Button";
import ContainerBox from "./ContainerBox.js";
import ServiceCategory from "./ServiceCategory.js";
import "../css/components/OrphanedSnapshots.css";

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

const tableData = [
  {
    tableTitle: "On-Demand Cost Allocation for Orphaned Snapshots",
    columnHead1: "Application/Project Name",
    columnHead2: "Owner Name ",
    columnHead3: "Total Cost",
    columnHead4: "Count of Disks",
    columnHead5: "Environment",
  },
];

const dummyData = [
  {
    name: "Subscription 1",
    ownerName: "A",
    totalCost: "$1000",
    countOfDisks: 50,
    environment: "Production",
    children: [
      {
        name: "Storage",
        ownerName: "B",
        totalCost: "$500",
        countOfDisks: 30,
        environment: "Production",
        children: [
          {
            name: "Premium LRS",
            ownerName: "C",
            totalCost: "$300",
            countOfDisks: 20,
            environment: "Production",
            children: [
              {
                name: "Resource Group 1",
                ownerName: "D",
                totalCost: "$200",
                countOfDisks: 10,
                environment: "Production",
                children: [
                  {
                    name: "Resource 1",
                    ownerName: "E",
                    totalCost: "$100",
                    countOfDisks: 5,
                    environment: "Production",
                  },
                  {
                    name: "Resource 2",
                    totalCost: "$100",
                    ownerName: "F",

                    countOfDisks: 5,
                    environment: "Production",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more data here as needed
  {
    name: "Subscription 2",
    ownerName: "A1",
    totalCost: "$1500",
    countOfDisks: 70,
    environment: "Development",
    children: [
      {
        name: "Storage",
        ownerName: "A2",
        totalCost: "$800",
        countOfDisks: 40,
        environment: "Development",
        children: [
          {
            name: "Standard LRS",
            ownerName: "A3",
            totalCost: "$400",
            countOfDisks: 25,
            environment: "Development",
            children: [
              {
                name: "Resource Group 2",
                ownerName: "A4",
                totalCost: "$250",
                countOfDisks: 15,
                environment: "Development",
                children: [
                  {
                    name: "Resource 3",
                    ownerName: "A5",
                    totalCost: "$150",
                    countOfDisks: 8,
                    environment: "Development",
                  },
                  {
                    name: "Resource 4",
                    ownerName: "A6",
                    totalCost: "$100",
                    countOfDisks: 7,
                    environment: "Development",
                  },
                ],
              },
              {
                name: "Resource Group 3",
                ownerName: "A7",
                totalCost: "$150",
                countOfDisks: 10,
                environment: "Development",
                children: [
                  {
                    name: "Resource 5",
                    ownerName: "B1",
                    totalCost: "$80",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                  {
                    name: "Resource 6",
                    ownerName: "B2",
                    totalCost: "$70",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const dataSet1 = [
  { number: "$75.4K", text: "Total On Demand Cost" },
  { number: "12", text: "Count Of Snapshots" },
  { number: "10", text: "Impacted Applications" },
];

const data = [
  { name: "Subscription 1", "On Demand Cost": 400000, "Consumed Meter": 50000 },
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

const OrphanedSnapshots = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

  // Handle change for the dropdown
  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  // Sample data for PieChartContainer
  const data1 = [
    {
      name: "Disk 1",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "Disk 2",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "Disk 3",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Disk 4",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "Disk 5",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const data2 = [
    {
      name: "Disk 1",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "Disk 2",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "Disk 3",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Disk 4",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "Disk 5",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const formatData = (data) => {
    return data.map((item) => ({
      name: item.name,
      ownerName: item.ownerName,
      totalCost: item.totalCost,
      countOfDisks: item.countOfDisks,
      environment: item.environment,
      services: item.children ? formatData(item.children) : null,
    }));
  };

  const formattedData = formatData(dummyData);

  // Define styles for the PieChartContainer
  const pieChartContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    margin: "-308px 680px -260px",
  };

  const pieChartStyle = {
    width: "55%",
    paddingTop: "45px",
    marginBottom: "110px", // Adjust individual chart width
  };

  const horizontaldata = [
    { name: "North Europe", count: 100 },
    { name: "East US 2", count: 150 },
    { name: "South East Asia", count: 200 },
    { name: "West Europe", count: 75 },
    { name: "West US 2", count: 125 },
  ];
  const bars = [
    {
      dataKey: "On Demand Cost",
      fill: "#2CAFFE",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "Consumed Meter",
      fill: "#330072",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "-12px" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: "15px" }}>Recommendations/</span>
              <span style={{ color: "#0070C0", fontSize: "15px" }}>
                Orphaned Snapshots
              </span>
            </div>
          }
          additionalFilters={additionalFilters}
        />
      </div>

      <NavigationBar />
      {/* ContainerBoxForInventory */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "14px",
        }}
      >
        <ContainerBox data={dataSet1} />
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          paddingLeft: "68px",
          height: "300px", // Adjust the height as desired
          width: "100%",
        }}
      >
        <div style={{ marginTop: "-20px", width: "50%" }}>
          <div style={{ marginTop: "20px", paddingRight: "18px" }}>
            <GenericBarChart
              title="Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
              data={data}
              yAxisLabel="Cost (in thousands)"
              bars={bars}
            >
              <Select
                value={groupBy}
                onChange={handleGroupByChange}
                displayEmpty
                className="cmpOrphanSnap_select"
              >
                <MenuItem value="">Choose Recommendation</MenuItem>
                <MenuItem value="subscription">UnattachedManagedDisks</MenuItem>
                <MenuItem value="resourceGroup">OrphanedSnapshots</MenuItem>
                <MenuItem value="region">
                  Orphaned Attached Disks for De-allocated VMs
                </MenuItem>
              </Select>
            </GenericBarChart>
          </div>
        </div>
      </div>

      {/* Include PieChartContainer */}
      <div>
        {/* Separate container for buttons */}
        <div className="cmpOrphanSnap_buttonContainer">
          <CostsAmortized dialogPaperClass="cmpOrphanSnap_dialogPaper" />
          <Button
            variant="contained"
            className="cmpOrphanSnap_button"
            color="inherit"
          >
            Customize Report
          </Button>
          <IconButton className="cmpOrphanSnap_button">
            <ShareIcon />
          </IconButton>
        </div>
        {/* Container for the PieChartContainer */}
        <div>
          <PieChartContainer
            title1="Snapshot Type Vs Consumed Meter"
            data1={data1}
            title2="Snapshot Type Vs Cost"
            data2={data2}
            containerStyle={pieChartContainerStyle}
            chartStyle={pieChartStyle}
          />
        </div>
      </div>

      <div
        style={{
          marginLeft: -510,
          marginTop: 12,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "-10px",
          paddingTop: "270px",
        }}
      >
        <ServiceCategory
          dummyData={formattedData}
          height="400px"
          width="560px"
          tableData={tableData}
        />
      </div>

      <HorizontalBarGraph
        data={horizontaldata}
        title="Orphaned Snapshots across locations"
        width="60%"
        height={373}
      />
    </div>
  );
};

export default OrphanedSnapshots;
