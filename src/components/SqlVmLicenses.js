import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import PieChartContainer from "./PieChartContainer";
import ContainerBox from "./ContainerBox";
import GenericBarChart from "./GenericBarChart";
import ServiceCategory from "./ServiceCategory";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import CostsAmortized from "./CostsAmortized.js";
import Button from "@mui/material/Button";
import "../css/components/SqlVmLicenses.css";

const SqlVmLicenses = ({
  additionalFilters,
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  bars,
}) => {
  sessionStorage.removeItem("overviewPage");
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === 1) {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

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
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "15px" }}>Recommendations/</span>
            <span style={{ color: "#0070C0", fontSize: "15px" }}>
              SQL VML Licenses
            </span>
          </div>
        }
        additionalFilters={additionalFilters}
      />
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
                className="cmpSqlVM_select"
              >
                <MenuItem value="">Choose an option</MenuItem>
                <MenuItem value="sqlvmlicenses">SQL VM Licenses</MenuItem>
                <MenuItem value="vmlicenses">VM Licenses</MenuItem>
              </Select>
            </GenericBarChart>
          </div>
        </div>
      </div>

      {/* Include PieChartContainer */}
      <div>
        {/* Separate container for buttons */}
        <div className="cmpSqlVM_buttonContainer">
          <CostsAmortized dialogPaperClass="cmpSqlVM_dialogPaper" />
          <Button
            variant="contained"
            className="cmpSqlVM_button"
            color="inherit"
          >
            Customize Report
          </Button>
          <IconButton className="cmpSqlVM_button">
            <ShareIcon />
          </IconButton>
        </div>
        {/* Container for the PieChartContainer */}
        <div>
          <PieChartContainer
            title1="License type Vs Consumed Meter"
            data1={data1}
            title2="License type Vs Cost"
            data2={data2}
            containerStyle={pieChartContainerStyle}
            chartStyle={pieChartStyle}
          />
        </div>
      </div>

      <div
        style={{
          marginLeft: -65,
          marginTop: 10,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "125px",
          paddingTop: "270px",
        }}
      >
        <ServiceCategory
          dummyData={dummyData}
          height="400px"
          width="1125px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default SqlVmLicenses;
