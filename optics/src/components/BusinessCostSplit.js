import React, { useEffect, useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import Ondemand from "./Ondemand";
import NavigationBar from "./NavigationBar";
import ServiceCategory from "./ServiceCategory";
import ContainerBox from "./ContainerBox";
import InvoiceTableView from "./InvoiceTableView";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import api from "../api";

const BusinessCostSplit = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const [reportType, setReportType] = useState("");
  const [boxData, setBoxData] = useState([]);
  const [billAllocationData, setBillAllocationData] = useState([]);
  const [serviceCategoryData, setServiceCategoryData] = useState([]);
  const [filteredBillAllocationData, setFilteredBillAllocationData] = useState([]);

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
      label: "Select Cost",
      name: "Select Cost",
      options: [
        { value: "Actual Cost", label: "Actual Cost" },
        { value: "Amortized Cost", label: "Amortized Cost" },
        { value: "Cost Unblended", label: "Cost Unblended" },
        { value: "Cost Blended", label: "Cost Blended" },
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

  const dataSet = [
    { number: 55, text: "Applications with Tags" },
    { number: 47, text: "Applications without Tags" },
    { number: 2, text: "Project with Tags" },
    { number: "NA", text: "Project without Tags" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          applicationsWithTags,
          applicationsWithoutTags,
          projectsWithTags,
          projectsWithoutTags,
          serviceCategoryCost,
          billAllocation
        ] = await Promise.all([
          api.getApplicationWithTags(),
          api.getApplicationWithoutTags(),
          api.getProjectWithTags(),
          api.getProjectWithoutTags(),
          api.getServiceCategoryCost(),
          api.getBillAllocation(),
        ]);

        const formattedBoxData = [
          {
            number: applicationsWithTags.Applicationswithtags[0],
            text: "Applications with Tags",
          },
          {
            number: applicationsWithoutTags.Applicationswithouttags[0],
            text: "Applications without Tags",
          },
          {
            number: projectsWithTags.projectwithtags[0] || "NA",
            text: "Project with Tags",
          },
          {
            number: projectsWithoutTags.Projectwithouttags[0],
            text: "Project without Tags",
          },
        ];

        const formattedServiceCategoryData = Object.keys(serviceCategoryCost).map(
          (serviceCategory) => ({
            name: serviceCategory,
            totalBill: serviceCategoryCost[serviceCategory].TotalBill,
            onDemandCost: serviceCategoryCost[serviceCategory].OnDemandCost,
            commitmentsCost: serviceCategoryCost[serviceCategory].CommitmentsCost,
            savings: serviceCategoryCost[serviceCategory].Savings,
            services: Object.keys(serviceCategoryCost[serviceCategory]).map((service) => ({
              name: service,
              totalBill: serviceCategoryCost[serviceCategory][service].TotalBill,
              onDemandCost: serviceCategoryCost[serviceCategory][service].OnDemandCost,
              commitmentsCost: serviceCategoryCost[serviceCategory][service].CommitmentsCost,
              savings: serviceCategoryCost[serviceCategory][service].Savings,
              resourceGroups: Object.keys(serviceCategoryCost[serviceCategory][service]).map(
                (resourceGroup) => ({
                  name: resourceGroup,
                  totalBill: serviceCategoryCost[serviceCategory][service][resourceGroup].TotalBill,
                  onDemandCost: serviceCategoryCost[serviceCategory][service][resourceGroup].OnDemandCost,
                  commitmentsCost: serviceCategoryCost[serviceCategory][service][resourceGroup].CommitmentsCost,
                  savings: serviceCategoryCost[serviceCategory][service][resourceGroup].Savings,
                  resources: Object.keys(serviceCategoryCost[serviceCategory][service][resourceGroup]).map((resource) => ({
                    name: resource,
                    totalBill: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].TotalBill,
                    onDemandCost: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].OnDemandCost,
                    commitmentsCost: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].CommitmentsCost,
                    savings: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].Savings,
                  })),
                })
              ),
            })),
          })
        );

        const formattedBillAllocationData = billAllocation.billAllocation.map(
          (item) => ({
            name: item.ApplicationName || "null",
            ownerName: item.OwnerName || "null",
            totalBill: item.totalBill ? `$${item.totalBill.toFixed(2)}` : "$0.00",
            normalizedVariation: item.Normalized_Variation_MoM !== null
              ? `${item.Normalized_Variation_MoM}%`
              : "null",
            rawVariation: item.rawVariation !== null ? `${item.rawVariation}%` : "null",
            savings: item.savings ? `$${item.savings.toFixed(2)}` : "$0.00",
          })
        );

        setBoxData(formattedBoxData);
        setServiceCategoryData(formattedServiceCategoryData);
        setBillAllocationData(formattedBillAllocationData);
        setFilteredBillAllocationData(formattedBillAllocationData); // Initialize filtered data

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };

  const handleReportTypeChange = (event) => {
    const selectedReportType = event.target.value;
    setReportType(selectedReportType);

    if (selectedReportType) {
      const filteredData = billAllocationData.filter(
        (item) => item.name === selectedReportType
      );
      setFilteredBillAllocationData(filteredData);
    } else {
      setFilteredBillAllocationData(billAllocationData);
    }
  };

  const dummyData1 = [
    {
      name: "Project 1",
      ownerName: "Owner A",
      totalBill: "$400",
      normalizedVariation: "10%",
      rawVariation: "5%",
      savings: "$50",
    },
    {
      name: "Project 2",
      ownerName: "Owner B",
      totalBill: "$490",
      normalizedVariation: "8%",
      rawVariation: "6%",
      savings: "$60",
    },
    {
      name: "Project 3",
      ownerName: "Owner C",
      totalBill: "$495",
      normalizedVariation: "10%",
      rawVariation: "8%",
      savings: "$70",
    },
    // Add more dummy data as needed
  ];

  const columns1 = [
    { key: "name", label: "Application/Project Name" },
    { key: "ownerName", label: "Owner Name" },
    { key: "totalBill", label: "Total Bill" },
    { key: "normalizedVariation", label: "%Normalized Variation" },
    { key: "rawVariation", label: "%Raw Variation" },
    { key: "savings", label: "Savings" },
  ];

  const tableData = [
    {
      tableTitle: "Service Category Cost Allocation",
      columnHead1: "Service Category",
      columnHead2: " Total Bill ",
      columnHead3: "On Demand Cost",
      columnHead4: "Commitments Cost",
      columnHead5: "Savings",
    },
  ];

  // Remove duplicates for the dropdown options
  const uniqueBillAllocationData = Array.from(
    new Set(billAllocationData.map((item) => item.name))
  ).map((name) => billAllocationData.find((item) => item.name === name));

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "-13px" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: "18px" }}>Cost & Usage/</span>
              <span style={{ color: "#0070C0", fontSize: "18px" }}>
                Business Cost Split
              </span>
            </div>
          }
          additionalFilters={additionalFilters}
        />
      </div>
      <NavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-25px",
        }}
      >
        <ContainerBox data={boxData} />
      </div>
      <div
        style={{
          marginBottom: "30px",
          textAlign: "left",
          width: "100%",
          marginLeft: "-280px",
          marginTop: "-20px",
        }}
      >
        <Ondemand />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          marginLeft: "-558px",
          marginTop: "-20px",
        }}
      >
        <InvoiceTableView
          title={"Total Bill Allocation\nacross Application"}
          dropdown={
            <FormControl
              variant="outlined"
              style={{ minWidth: 110, marginLeft: "0px" }}
            >
              <InputLabel id="report-type-label">Group by</InputLabel>
              <Select
                labelId="report-type-label"
                id="report-type"
                value={reportType}
                onChange={handleReportTypeChange}
                label="Group by Application"
                MenuProps={{
                  PaperProps: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                }}
              >
                <MenuItem value="">All Applications</MenuItem>
                {uniqueBillAllocationData.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name === "null" ? "null" : item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          tableData={filteredBillAllocationData}
          tableHeight="auto"
          tableWidth="528px"
          columns={columns1}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "630px",
          marginTop: "-833px",
          marginBottom: "30px",
        }}
      >
        <ServiceCategory
          dummyData={serviceCategoryData}
          height="790px"
          width="600px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default BusinessCostSplit;
