import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";
import PieChartContainer from "./PieChartContainer";
import ServiceCategory from "./ServiceCategory";
//import HyperScalarBarChart from './HyperScalarBarChart';
import { Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import CostsAmortized from "./CostsAmortized.js";
import Button from "@mui/material/Button";
import GenericBarChart from "./GenericBarChart.js";
import "../css/components/HyperScalarAdvisor.css";

const HyperScalarAdvisor = ({
  additionalFilters,
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  bars,
}) => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");

  const handleButtonClick = (value) => {
    if (value === 1) {
      setShowStackBars(false);
    } else {
      setShowStackBars(true);
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
    marginBottom: "85px", // Adjust individual chart width
  };

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "15px" }}>Recommendations/</span>
            <span style={{ color: "#0070C0", fontSize: "15px" }}>
              Hyper-ScalarAdvisor
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
              title="Comparison of Subscriptions Vs Impact"
              data={data}
              bars={bars}
            >
              <Select
                value={groupBy}
                onChange={handleGroupByChange}
                displayEmpty
                className="cmpHSA_select"
              >
                <MenuItem value="">Choose Recommendation Category</MenuItem>
                <MenuItem value="auto-scale">Auto-Scale</MenuItem>
                <MenuItem value="rightsize">Right size</MenuItem>
              </Select>
            </GenericBarChart>
          </div>
        </div>
      </div>

      {/* Include PieChartContainer */}
      <div>
        {/* Separate container for buttons */}
        <div className="cmpHSA_buttonContainer">
          <CostsAmortized dialogPaperClass="cmpHSA_dialogPaper" />
          <Button variant="contained" className="cmpHSA_button" color="inherit">
            Customize Report
          </Button>
          <IconButton className="cmpHSA_button">
            <ShareIcon />
          </IconButton>
        </div>
        {/* Container for the PieChartContainer */}
        <div>
          <PieChartContainer
            title1="Applications with High Impact Recommendations"
            data1={data1}
            title2="Service Category with High Impact Recommendations"
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
export default HyperScalarAdvisor;
