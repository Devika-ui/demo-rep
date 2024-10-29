import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";
import HorizontalBarGraph from "./HorizontalBarGraph";
//import CategoriesBarChart from "./CategoriesBarChart";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import ServiceCategory from "./ServiceCategory";
import GenericBarChart from "./GenericBarChart";
import "../css/components/OrphanedRSVBackups.css";

const OrphanedRSVBackups = ({
  tableData,
  dummyData,
  dataSet1,
  data1,
  bars,
  horizontaldata,
}) => {
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

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "15px" }}>Recommendations/</span>
            <span style={{ color: "#0070C0", fontSize: "15px" }}>
              Orphaned RSV Backups
            </span>
          </div>
        }
      />
      <NavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: "15px",
        }}
      >
        <ContainerBox data={dataSet1} />
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          paddingLeft: "0px",
          height: "300px", // Adjust the height as desired
          width: "100%",
          alignItems: "center", // Add this to vertically center the graphs
          marginTop: "50px",
        }}
      >
        <div style={{ width: "50%", marginTop: "480px", paddingLeft: "85px" }}>
          <HorizontalBarGraph
            data={horizontaldata}
            title="Comparison of Subscriptions Vs Orphan Backup Counts "
            width="100%"
            height={350}
            xAxisLabel=""
            yAxisLabel=""
            barName="Backup Counts"
          />
        </div>
        <div style={{ width: "55%", marginLeft: "-20px", marginTop: "18px" }}>
          <GenericBarChart
            title="Categories with Unhealthy Protection Status"
            yAxisTicks={[0, 5, 10, 15, 20, 25]}
            yAxisDomain={[0, 25]}
            data={data1}
            bars={bars}
          />
        </div>
        {/* Separate container for buttons */}
        <div className="cmpOrphanRB_buttonContainer">
          <Button
            variant="contained"
            className="cmpOrphanRB_button"
            color="inherit"
          >
            Customize Report
          </Button>
          <IconButton className="cmpOrphanRB_button">
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          marginLeft: "60px",
          display: "flex",
          justifyContent: "center",
          marginTop: "75px",
        }}
      >
        <ServiceCategory
          dummyData={dummyData}
          height="400px"
          width="1140px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default OrphanedRSVBackups;
