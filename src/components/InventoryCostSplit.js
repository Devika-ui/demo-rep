import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import CostInventory from "./CostInventory";
import ContainerBox from "./ContainerBox";
import { Box, Typography } from "@mui/material";
import api from "../api";
import componentUtil from "../componentUtil.js";

const InventoryCostSplit = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [dataSet1, setDataSet1] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };
  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters[selectedProvider]);
  };

  const additionalFilters = [
    {
      label: "Service Category(s)",
      name: "Select Service Category",
      options: [
        { value: "Service Category 1", label: "Service Category 1" },
        { value: "Service Category 2", label: "Service Category 2" },
        { value: "Service Category 3", label: "Service Category 3" },
      ],
    },
    {
      label: "Owner(s)",
      name: "Select Owner",
      options: [
        { value: "Owner 1", label: "Owner 1" },
        { value: "Owner 2", label: "Owner 2" },
        { value: "Owner 3", label: "Owner 3" },
      ],
    },
    {
      label: "Environment(s)",
      name: "environments",
      options: [
        { value: "Production", label: "Production" },
        { value: "Staging", label: "Staging" },
        { value: "Development", label: "Development" },
      ],
    },
    {
      label: "Cost Center(s)",
      name: "Select Cost Center",
      options: [
        { value: "Cost Center1", label: "Cost Center1" },
        { value: "Cost Center2", label: "Cost Center2" },
        { value: "Cost Center3", label: "Cost Center3" },
      ],
    },
  ];

  useEffect(() => {
    const fetchDataAndFormat = async () => {
      try {
        const [monthBillData, totalResourcesData] = await Promise.all([
          api.getMonthBillAndIncreasedPercentage(),
          api.getTotalResouces(),
        ]);

        const { firstMonthCost, growthPercentage } = monthBillData[0];
        const { totalresources } = totalResourcesData;

        const formattedData = [
          {
            number: `$${(firstMonthCost / 1000).toFixed(1)}K`,
            text: "Previous Month Total Bill",
          },
          { number: `${growthPercentage}%`, text: "Increase Rate" },
          { number: totalresources.toString(), text: "Total Resources" },
        ];

        setDataSet1(formattedData);
      } catch (error) {
        console.error("Error fetching and formatting data:", error);
      }
    };

    fetchDataAndFormat();
  }, []);

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
          Inventory Cost Split
        </Typography>
        <Subheader onButtonClick={handleButtonClick}  onFiltersChange={handleFiltersChange} selectedCSP={selectedProvider}/>
        <NavigationBar />
      </Box>
      <NavigationBar />
      {/* ContainerBoxForInventory */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-35px",
        }}
      >
        <ContainerBox data={dataSet1} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "14px",
          marginLeft: "60px",
          marginBottom: "10px",
        }}
      >
        <CostInventory />
      </div>
    </div>
  );
};

export default InventoryCostSplit;
