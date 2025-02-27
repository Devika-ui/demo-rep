import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import PieChartContainer from "./PieChartContainer.js";
import GenericBarChart from "./GenericBarChart.js";
import HorizontalBarGraph from "./HorizontalBarGraph.js";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import componentUtil from "../componentUtil.js";
import Button from "@mui/material/Button";
import ContainerBox from "./ContainerBox.js";
import CostAllocationTable from "./CostAllocationTable.js";
import api from "../api.js";
import "../css/components/OrphanedSnapshots.css";

const OrphanedSnapshots = ({
  tableData,
  dummyData,
  dataSet2,
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
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  let inputData = selectedFilters;
  const [billingMonth, setBillingMonth] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState([]);

  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
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

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  const pieChartContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "48%",
    flexGrow: "1",
    flexBasis: "100%",
    height: "47.3vh",
    marginRight:"0.7rem",
    marginTop:"-18rem"
  };

  const pieChartStyle = {
    // width: "100%",
    paddingTop: "25px",
    marginTop: "-1rem",
  };

  const titleStyle1 = {
    fontSize: "1rem",
    marginLeft: "2.5rem",
    position: "relative", 
    marginTop: "-0.4rem",
    whiteSpace: "nowrap",
  };

  const titleStyle2 = {
    fontSize: "1rem",
    marginTop: "-0.4rem",
    marginLeft: "4rem",
    position: "relative",
  };

  const containerStyle = {
    marginLeft: "-14.4rem",
    marginTop: "1.98rem",
    height: "38.7vh",
    width: "41.5%"
  }

  const barchartStyle ={
  height:"51.2vh",
  marginTop:"-18.94rem",
  maxWidth: "598px",
  marginLeft:"39.82rem",
  }

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
            marginTop: "-1rem", 
            fontWeight: "bold",
          }}
        >
          Orphaned Snapshots
        </Typography>
        <Subheader
           onButtonClick={onButtonClick}
           onFiltersChange={onFiltersChange}
           selectedCSP={selectedCSP}
           monthComponent={true}
        />
        <NavigationBar />
      </Box>
      <NavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-33px",
          marginRight: "2px",
          marginTop: "-5px",
        }}
      >
       <ContainerBox data={dataSet2} loading={loading} />
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          paddingLeft: "68px",
          height: "300px",
          width: "100%",
        }}
      >
          <Select
            value={groupBy}
            onChange={handleGroupByChange}
            displayEmpty
            className="cmpUAMD_select1"
            style={{ marginTop: "-3px",height:"5.5vh",background:"white",marginLeft:"-10px"}}
            renderValue={(selected) =>
              selected === "" ? "Choose Recommendation" : selected
            }
            MenuProps={{
              PaperProps: {
                style: {
                  marginTop: "10px",
                  marginLeft: "50px",
                },
              },
            }}
          >
            
            <MenuItem value="">OrphanedSnapshots</MenuItem>
            <MenuItem value="subscription">UnattachedManagedDisks</MenuItem>
            <MenuItem value="region">
              Orphaned Attached Disks for deallocated VMs
            </MenuItem>
          </Select>
          {/* <div style={{ marginTop: "20px", paddingRight: "18px" }}> */}
            <GenericBarChart
              title="Comparison of Subscriptions Vs On-Demand Cost & Consumed Meter"
              titleStyle={{ fontSize: "1rem", fontWeight: "bold", color: "#5F249F", textAlign: "center",marginTop:"-1.2rem" }}
              data={data}
              yAxisTicks={[0, 500, 1000, 1500]}
              bars={bars}              
              containerStyle={containerStyle}
               yAxisLabel="Cost (in thousands)"
              chartStyle={{ width: "100%", height: "100%" }}
              barSize = {50}
              // marginTop={-40}
              currencySymbol={currencySymbol}
              currencyPreference={currencyPreference}
              loading={loading}
            ></GenericBarChart>
          {/* </div> */}
        </div>

      <div>
        <div className="cmpOrphanSnap_buttonContainer">
          {/* <CostsAmortized dialogPaperClass="cmpOrphanSnap_dialogPaper" /> */}
          <Button
            variant="contained"
            className="cmpOrphanSnap_button"
            color="inherit"
          >
            Customize Report
          </Button>
          <IconButton className="cmpOrphanSnap_button1">
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
            // loading={loading}
            containerStyle={pieChartContainerStyle}
            chartStyle={pieChartStyle}
            pieChartHeight1={"90%"}
            pieChartHeight2={"90%"}
            titleStyle1={titleStyle1}
            titleStyle2={titleStyle2}
            legendWrapperStyle1={{ bottom: 5, fontSize: "10px" }}
            legendWrapperStyle2={{ bottom: 5, fontSize: "10px" }}
            currencySymbol={currencySymbol}
            currencyPreference={currencyPreference}
            loading={loading}
          />
        </div>
      </div>

      <div style={{ marginLeft: "-34.9rem",marginTop:"-1rem" }}>
         <CostAllocationTable
          dummyData={dummyData}
          height="250px"
          width="29.5%"
          tableData={tableData}
          headerClass="headerClass-1"
          loading={loading}
        /> 
       </div>
      <HorizontalBarGraph
         data={horizontaldata}
        title={<div style={{ textAlign: "center", paddingTop: "10px",marginLeft: "-15rem" }}>
         Orphaned Snapshots across locations
          </div>
        }
          barchartStyle={barchartStyle}
          xAxisLabel= "Count of Snapshots"
          yAxisLabel="Location"
          loading={loading}
       />
    </div>
  );
};

export default OrphanedSnapshots;