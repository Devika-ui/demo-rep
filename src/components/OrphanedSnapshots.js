import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const OrphanedSnapshots = ({
  additionalFilters,
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  horizontaldata,
  bars,
}) => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");
  const navigate = useNavigate();

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
    const value = event.target.value;
    setGroupBy(value);
    switch (value) {
      case "subscription":
        navigate("/recommendations#unattachedManagedDisks");
        break;
      case "resourceGroup":
        navigate("/recommendations#orphanedSnapshots");
        break;
      case "region":
        navigate("/orphaned-attached-disks");
        break;
      default:
        break;
    }
  };

  // Sample data for PieChartContainer

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
          <Select
            value={groupBy}
            onChange={handleGroupByChange}
            displayEmpty
            className="cmpUAMD_select"
            style={{ marginTop: "30px", marginBottom: "-30px" }}
          >
            <MenuItem value="">OrphanedSnapshots</MenuItem>
            <MenuItem value="subscription">UnattachedManagedDisks</MenuItem>

            <MenuItem value="region">
              Orphaned Attached Disks for deallocated VMs
            </MenuItem>
          </Select>
          <div style={{ marginTop: "20px", paddingRight: "18px" }}>
            <GenericBarChart
              title="Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
              data={data}
              yAxisLabel="Cost (in thousands)"
              bars={bars}
            ></GenericBarChart>
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
