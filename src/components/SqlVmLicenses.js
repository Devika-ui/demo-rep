import React, { useState, useEffect } from "react";
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
import ShareButtonCO from "./ShareButtonCO.js";
import ContainerBox from "./ContainerBox.js";
import CostAllocationTable from "./CostAllocationTable.js";
import "../css/components/UnattachedManagedDisks.css";
import componentUtil from "../componentUtil.js";
import { Box, Typography } from "@mui/material";

const SqlVmLicenses = ({
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  bars,
  onButtonClick,
  onFiltersChange,
  selectedCSP,
  currencySymbol,
  currencyPreference,
  loading,
  onActiveLicenseType,
  activeLicenseType,
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

  const navigate = useNavigate();

  const containerStyle = {
    marginLeft: "1rem",
    marginTop: "1.98rem",
    height: "41.9vh",
    width: "88%",
  };
  const barchartStyle = {
    width: "49.5%",
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
    marginLeft: "10px",
  };
  const titleStyle1 = {
    marginLeft: "1rem",
    marginTop: "0rem",
    marginBottom: "-0.5rem",
  };

  const titleStyle2 = {
    marginTop: "0.rem",
    marginLeft: "1rem",
    marginBottom: "-0.5rem",
  };

  const sortOptions = [{ value: "totalCost", label: "Total Cost " }];

  const chartsData = [
    {
      title: "Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter",
      headers: ["Subscription Name", "On Demand Cost", "Consumed Meter"],
      data: data,
      mapData: (row) => [
        row.subscriptionName || "N/A",
        row.OnDemand || 0,
        row.ConsumedMeter || 0,
      ],
    },
    {
      title: "License Type Vs Consumed Meter",
      headers: ["License Type", "Consumed Meter"],
      data: data1,
      mapData: (row) => [row.name || "N/A", row.value || 0],
    },
    {
      title: "License  Type Vs On Demand Cost",
      headers: ["License Type", "Cost"],
      data: data2,
      mapData: (row) => [row.name || "N/A", row.value || 0],
    },
  ];
   
  const handleGroupByChange = (event) => {
    const value = event.target.value;
    setGroupBy(value);
    onActiveLicenseType(value === "" ? "sqlvmlicense" : "vmlicense");
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
          {activeLicenseType === "sqlvmlicense"
            ? "SQL VM Licenses"
            : "VM Licenses"}
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
      <div className="export-container">

      <Select
        value={groupBy}
        onChange={handleGroupByChange}
        displayEmpty
        className="cmpUAMD_select"
        style={{
          marginBottom: "5px",
          marginLeft: "58px",
          backgroundColor: "white",
          textAlign: "center",
          width: "250px",
        }}
        renderValue={(selected) =>
          selected === "" ? "Choose an Option" : selected
        }
        MenuProps={{
          PaperProps: {
            style: {
              marginTop: "10px",
              marginLeft: "0px",
            },
          },
        }}
      >
        <MenuItem value="">SQL VM Licenses</MenuItem>
        <MenuItem value="VM Licenses">VM Licenses</MenuItem>
      </Select>

      <div className="cmpUAMD_buttonContainer" style={{ marginTop: "20px" }}>
            <ShareButtonCO
              className="cmpUAMD_button"
              charts={chartsData}
            />
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
              "Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
            }
            data={data}
            yAxisLabel="Cost (in thousands)"
            bars={bars}
            yAxisTickFormatter={formatYAxisSimple}
            containerStyle={containerStyle}
            chartStyle={{ width: "100%", height: "100%" }}
            loading={loading}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
          ></GenericBarChart>
        </div>

        <div style={{ flex: 1, marginRight: "0rem", marginTop: "-1rem" }}>
          <div>
            <PieChartContainer
              title1={"License Type Vs Consumed Meter"}
              data1={data1}
              title2={"License  Type Vs On Demand Cost"}
              data2={data2}
              containerStyle={pieChartContainerStyle}
              chartStyle={pieChartStyle}
              currencySymbol={currencySymbol}
              currencyPreference={currencyPreference}
              loading={loading}
              titleStyle1={titleStyle1}
              titleStyle2={titleStyle2}
              pieChart1Currency={true}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: 50,
          marginTop: -50,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <CostAllocationTable
          dummyData={dummyData}
          height="230px"
          width="95.8%"
          tableData={tableData}
          headerClass="headerClass-1"
          loading={loading}
          marginTop="30px"
          sortOptions={sortOptions}
        />
      </div>
    </div>
    </div>
  );
};

export default SqlVmLicenses;
