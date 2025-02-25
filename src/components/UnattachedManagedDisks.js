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
import CostAllocationTable from "./CostAllocationTable.js";
import "../css/components/UnattachedManagedDisks.css";
import componentUtil from "../componentUtil.js";
import { Box, Typography } from "@mui/material";

const UnattachedManagedDisks = ({
  additionalFilters,
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  horizontaldata,
  bars,
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
  const [selectedProvider, setSelectedProvider] = useState(
    componentUtil.getSelectedCSP()
  );
  const [selectedFilters, setSelectedFilters] = useState([]);
  let inputData = selectedFilters;
  const [billingMonth, setBillingMonth] = useState([]);

  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  const navigate = useNavigate();

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

  const containerStyle = {
    marginLeft: "1rem",
    marginTop: "1.98rem",
    height: "41.9vh",
    width: "88%",
  };
  const barchartStyle = {
    width: "50%",
    height: "56vh",
    marginTop: "20px",
    marginRight: "10px",
  };
  const pieChartContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    flexGrow: "1",
    flexBasis: "100%",
    height: "49.7vh",
    marginleft: "2rem",
    marginTop: "3rem",
  };

  const pieChartStyle = {
    width: "100%",
    paddingTop: "25px",
    marginTop: "-1rem",
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
          {selectedCSP === 100
            ? "Unattached Managed Disks"
            : "Unattached Volumes"}
        </Typography>
        <Subheader
          onButtonClick={onButtonClick}
          onFiltersChange={onFiltersChange}
          selectedCSP={selectedCSP}
          onMonthChange={handleMonthChange}
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

      <Select
        value={groupBy}
        onChange={handleGroupByChange}
        displayEmpty
        className="cmpUAMD_select"
        style={{
          marginTop: "10px",
          marginLeft: "90px",
        }}
      >
        <MenuItem value="">UnattachedManagedDisks</MenuItem>
        <MenuItem value="resourceGroup">OrphanedSnapshots</MenuItem>

        <MenuItem value="region">
          Orphaned Attached Disks for deallocated VMs
        </MenuItem>
      </Select>

      <div className="cmpUAMD_buttonContainer" style={{ marginTop: "30px" }}>
        <Button variant="contained" className="cmpUAMD_button" color="inherit">
          Customize Report
        </Button>
        <IconButton className="cmpUAMD_button">
          <ShareIcon />
        </IconButton>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          marginTop: "-37px",
          flexWrap: "wrap",
          gap: "5px",
          // flexDirection: "row", // Default for larger screens
        }}
        className="chart-container"
      >
        <div
          style={{
            flex: 1,
            marginLeft: "2rem",
            maxWidth: "50%",
            boxSizing: "border-box",
          }}
        >
          <GenericBarChart
            title={
              selectedCSP === 100
                ? "Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
                : "Comparison of Account Vs On-Demand Cost & Consumed Meter"
            }
            data={data}
            yAxisLabel="Cost (in thousands)"
            bars={bars}
            yAxisTickFormatter={formatYAxisSimple}
            containerStyle={containerStyle}
            chartStyle={{ width: "100%", height: "100%" }}
            loading={loading}
          ></GenericBarChart>
        </div>

        <div style={{ flex: 1, marginRight: "0rem", marginTop: "-1rem" }}>
          <div>
            <PieChartContainer
              title1={
                selectedCSP === 100
                  ? "Disk Type Vs Consumed Meter"
                  : "Volume Type Vs Consumed Meter"
              }
              data1={data1}
              title2={
                selectedCSP === 100
                  ? "Disk Type Vs Cost"
                  : "Volume Type Vs Cost"
              }
              data2={data2}
              containerStyle={pieChartContainerStyle}
              chartStyle={pieChartStyle}
              currencySymbol={currencySymbol}
              currencyPreference={currencyPreference}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: 52,
          marginTop: -50,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "px",
        }}
      >
        <CostAllocationTable
          dummyData={dummyData}
          height="300px"
          width="45%"
          tableData={tableData}
          headerClass="headerClass-1"
          loading={loading}
        />

        <HorizontalBarGraph
          data={horizontaldata}
          title={
            selectedCSP === 100
              ? "Unattached Managed Disks across locations"
              : "Unattached Managed Volumes across Regions"
          }
          xAxisLabel={
            selectedCSP === 100 ? "Count of Disks" : "Count of Volumes"
          }
          yAxisLabel={selectedCSP === 100 ? "Location" : "Regions"}
          barName={selectedCSP === 100 ? "Disk Count" : "Volumes Count"}
          barchartStyle={barchartStyle}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UnattachedManagedDisks;
