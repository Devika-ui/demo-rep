import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import CostInventory from "./CostInventory";
import ContainerBox from "./ContainerBox";
import api from "../api";

const InventoryCostSplit = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [dataSet1, setDataSet1] = useState([]);
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
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
      <Header onButtonClick={handleButtonClick} />
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "18px" }}>Cost & Usage/</span>
            <span style={{ color: "#5f249f", fontSize: "18px" }}>
              Inventory Cost Split
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
