import React, {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import { Box, Typography } from "@mui/material";
import ContainerBox from "./ContainerBox";
import PieChartContainer from "./PieChartContainer";
import CostAllocationTable from "./CostAllocationTable.js";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import GenericBarChart from "./GenericBarChart.js";
import "../css/components/HyperScalarAdvisor.css";

const HyperScalarAdvisor = ({
  tableData,
  dummyData,
  dataSet1,
  data,
  data1,
  data2,
  bars,
  selectedCSP,
  setSelectedCSP,
  onButtonClick,
  onFiltersChange,
  currencySymbol,
  currencyPreference,
  loading,
}) => {
  sessionStorage.removeItem("overviewPage");
  const [groupBy, setGroupBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("selectedCSP:", selectedCSP);
    if (selectedCSP === 110) {
      navigate("/TrustedAdvisor");
    }
  }, [selectedCSP, navigate]);

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  const pieChartContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "48%",
    flexGrow: "1",
    flexBasis: "100%",
    height: "47.4vh",
    marginRight:"0.7rem",
    marginTop:"-17.86rem"
  };

  const pieChartStyle = {
    paddingTop: "25px",
    marginTop: "-2rem",
  };

  const containerStyle = {
    marginLeft: "-0.6rem",
    marginTop: "-0.8rem",
    height: "38.7vh",
    width: "86.3%"
  }

  const titleStyle1 = {
    fontSize: "1rem",
    marginLeft: "0.8rem",
    position: "relative", 
    marginTop: "0.7rem",
    whiteSpace: "nowrap",
  };

  const titleStyle2 = {
    fontSize: "1rem",
    marginTop: "0.7rem",
    marginLeft: "4rem",
    position: "relative",
    // whiteSpace: "nowrap",
  };

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
        Hyper Scalar Advisor
      </Typography>
      <Subheader
           onButtonClick={onButtonClick}
           onFiltersChange={onFiltersChange}
           selectedCSP={selectedCSP}
           monthComponent={true}
      />
      <NavigationBar />
    </Box>

    {/* Boxes */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "-33px",
        marginRight: "2px",
        marginTop: "-5px",
      }}
    >
     <ContainerBox data={dataSet1} />
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
        <div style={{ marginTop: "-20px", width: "50%" }}>
        <Select
                value={groupBy}
                onChange={handleGroupByChange}
                displayEmpty
                className="cmpHSA_select"
                style={{ marginTop: "17px",height:"5.5vh",background:"white",marginLeft:"-10px",width: "295px"}}
              >
                <MenuItem value="">Choose Recommendation Category</MenuItem>
                <MenuItem value="auto-scale">Auto-Scale</MenuItem>
                <MenuItem value="rightsize">Right size</MenuItem>
              </Select>
          <div style={{ marginTop: "20px", paddingRight: "18px" }}>
            <GenericBarChart
              title="Comparison of Subscriptions Vs Impact"
              data={data}
              bars={bars}
              containerStyle={containerStyle}
              chartStyle={{ width: "100%", height: "100%" }}
              currencySymbol={currencySymbol}
              currencyPreference={currencyPreference}
              loading={loading}
            >
            </GenericBarChart>
          </div>
        </div>
      </div>

      {/* Include PieChartContainer */}
      <div>
        {/* Separate container for buttons */}
        <div className="cmpHSA_buttonContainer">
          <Button variant="contained" className="cmpHSA_button" color="inherit">
            Customize Report
          </Button>
          <IconButton className="cmpHSA_button">
            <ShareIcon />
          </IconButton>
        </div>

        <div>
          <PieChartContainer
            title1="Applications with High Impact"
            data1={data1}
            title2="Services with High Impact"
            data2={data2}
            containerStyle={pieChartContainerStyle}
            chartStyle={pieChartStyle}
            pieChartHeight1={"85%"}
            pieChartHeight2={"85%"}
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

      <div
        style={{
          marginLeft: -65,
          marginTop: 10,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "125px",
          paddingTop: "0px",
        }}
      >
      <Box sx={{ marginTop: "-2.5rem", width: "97.3%",marginLeft: "-2.2rem" }}>
        <CostAllocationTable
          dummyData={dummyData}
          height="240px"
          width="100%"
          tableData={tableData}
          headerClass="headerClass-1"
          loading={loading}
        /> 
      </Box>
      </div>
    </div>
  );
};
export default HyperScalarAdvisor;