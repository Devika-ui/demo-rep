import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";
import HorizontalBarGraph from "./HorizontalBarGraph";
import CategoriesBarChart from "./CategoriesBarChart";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
//import GenericBarChart from "./GenericBarChart";
import CostAllocationTable from "./CostAllocationTable.js";
import "../css/components/OrphanedRSVBackups.css";
import componentUtil from "../componentUtil.js";
import { Box, Typography } from "@mui/material";

const OrphanedRSVBackups = ({
  tableData,
  dummyData,
  dataSet1,
  data1,
  bars,
  horizontaldata,
  onButtonClick,
  onFiltersChange,
  selectedCSP,
  onMonthChange,
  currencySymbol,
  currencyPreference,
  loading,
}) => {
  sessionStorage.removeItem("overviewPage");
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === 1) {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

  // Handle change for the dropdown
  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  const barchartStyle = {
    width: "97%",
    height: "48.3vh",
    marginTop: "30px",
    marginLeft: "1rem",
  };
  const containerStyle = {
    marginTop: "1.98rem",
    height: "40vh",
    width: "92%",
    marginRight: "10px",
  };

  const formatYAxisSimple = (tickItem) => tickItem.toString();

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
          Orphaned RSV Backups
        </Typography>
        <Subheader
          onButtonClick={onButtonClick}
          onFiltersChange={onFiltersChange}
          selectedCSP={selectedCSP}
          monthComponent={true}
          removeAwsIcon={true}
        />
        <NavigationBar />
      </Box>

      {/* ContainerBoxForInventory */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-33px",
          marginRight: "2px",
          marginTop: "-1px",
        }}
      >
        <ContainerBox data={dataSet1} loading={loading} />
      </div>

      <div className="cmpUAMD_buttonContainer" style={{ marginTop: "20px" }}>
        <IconButton className="cmpUAMD_button">
          <ShareIcon />
        </IconButton>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          marginTop: "-20px",
          flexWrap: "nowrap", // Prevents wrapping to a new line
          gap: "10px", // Adds spacing between charts
        }}
        className="chart-container"
      >
        {/* First Chart */}
        <div
          style={{
            flex: 1,
            marginLeft: "2rem",
            maxWidth: "50%", // Limits width to half the container
            boxSizing: "border-box",
          }}
        >
          <HorizontalBarGraph
            data={horizontaldata}
            title="Comparison of Subscription Vs Orphan Backup Counts"
            xAxisLabel=""
            yAxisLabel=""
            barName="Backup Counts"
            barchartStyle={barchartStyle}
            loading={loading}
            yAxisKey="SubscriptionName"
          />
        </div>

        {/* Second Chart */}
        <div
          style={{
            flex: 1,
            maxWidth: "50%", // Ensures both charts take equal space
            boxSizing: "border-box",
          }}
        >
          <CategoriesBarChart
            title="Categories with Unhealthy Protection Status"
            data={data1}
            yAxisLabel=""
            bars={bars}
            containerStyle={containerStyle}
            chartStyle={{ width: "100%", height: "100%" }}
            loading={loading}
          />
        </div>
      </div>

      <div
        style={{
          marginLeft: 50,
          marginTop: -49,
          flexWrap: "wrap",
        }}
      >
        <CostAllocationTable
          dummyData={dummyData}
          height="280px"
          width="96%"
          tableData={tableData}
          headerClass="headerClass-1"
          loading={loading}
          marginTop="50px"
          showVisibilityIcon={true}
          text="protection state is stopped"
        />
      </div>
    </div>
  );
};

export default OrphanedRSVBackups;
