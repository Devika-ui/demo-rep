import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import OrphanedSnapshotsContainer from "./OrphanedSnapshotsContainer.js";
import PieChartContainer from "./PieChartContainer.js";
import GenericBarChart from "./GenericBarChart.js";
import TableforOrphaned from "./TableforOrphaned.js";
import HorizontalBarGraph from "./HorizontalBarGraph.js";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#63666A",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  select: {
    fontSize: "0.7rem",
    padding: "2px 4px",
    color: "#63666A",
    borderColor: "#63666A",
    minWidth: "auto",
    "& .MuiSelect-select": {
      padding: "2px 4px", // Ensuring the inner padding is reduced
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px 4px", // Adjusting input padding
    },
  },
}));

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
  const classes = useStyles();
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

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "-12px", width: "200%" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: "15px" }}>Recommendations/</span>
              <span style={{ color: "#0070C0", fontSize: "15px" }}>
                Orphaned Snapshots
              </span>
            </div>
          }
        />
      </div>

      <NavigationBar />
      {/* ContainerBoxForOrphaned */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "14px",
        }}
      >
        <OrphanedSnapshotsContainer />
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
            >
              <Select
                value={groupBy}
                onChange={handleGroupByChange}
                displayEmpty
                className={classes.select}
              >
                <MenuItem value="">Choose Recommendation</MenuItem>
                <MenuItem value="subscription">Subscription</MenuItem>
                <MenuItem value="resourceGroup">Resource Group</MenuItem>
                <MenuItem value="region">Region</MenuItem>
              </Select>
            </GenericBarChart>
          </div>
        </div>
      </div>

      {/* Include PieChartContainer */}
      <PieChartContainer
        title1="Snapshot Type Vs Consumed Meter"
        data1={data1}
        title2="Snapshot Type Vs Cost"
        data2={data2}
        containerStyle={pieChartContainerStyle}
        chartStyle={pieChartStyle}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: "-10px",
          paddingTop: "270px",
        }}
      >
        <TableforOrphaned />
      </div>
      <HorizontalBarGraph />
    </div>
  );
};

export default OrphanedSnapshots;
