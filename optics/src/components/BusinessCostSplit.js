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
            number: (applicationsWithTags?.Applicationswithtags?.[0] !== undefined && applicationsWithTags.Applicationswithtags[0] !== null) 
              ? applicationsWithTags.Applicationswithtags[0] 
              : "NA",
            text: "Applications with Tags",
          },
          {
            number: (applicationsWithoutTags?.Applicationswithouttags?.[0] !== undefined && applicationsWithoutTags.Applicationswithouttags[0] !== null) 
              ? applicationsWithoutTags.Applicationswithouttags[0] 
              : "NA",
            text: "Applications without Tags",
          },
          {
            number: (projectsWithTags?.projectwithtags?.[0] !== undefined && projectsWithTags.projectwithtags[0] !== null) 
              ? projectsWithTags.projectwithtags[0] 
              : "NA",
            text: "Project with Tags",
          },
          {
            number: (projectsWithoutTags?.Projectwithouttags?.[0] !== undefined && projectsWithoutTags.Projectwithouttags[0] !== null) 
              ? projectsWithoutTags.Projectwithouttags[0] 
              : "NA",
            text: "Project without Tags",
          },
        ];

        const aggregateData = (data) => {
          let totalBill = 0;
          let onDemandCost = 0;
          let commitmentsCost = 0;
          let savings = 0;

          Object.keys(data).forEach((key) => {
            if (typeof data[key] === "object" && data[key] !== null) {
              const { totalBill: t, onDemandCost: o, commitmentsCost: c, savings: s } = aggregateData(data[key]);
              totalBill += t;
              onDemandCost += o;
              commitmentsCost += c;
              savings += s;
            } else {
              totalBill += data.TotalBill || 0;
              onDemandCost += data.OnDemandCost || 0;
              commitmentsCost += data.CommitmentsCost || 0;
              savings += data.Savings || 0;
            }
          });

          return { totalBill, onDemandCost, commitmentsCost, savings };
        };

        const formattedServiceCategoryData = Object.keys(serviceCategoryCost).map(
          (serviceCategory) => {
            const { totalBill, onDemandCost, commitmentsCost, savings } = aggregateData(serviceCategoryCost[serviceCategory]);

            return {
              name: serviceCategory,
              totalBill,
              onDemandCost,
              commitmentsCost,
              savings,
              services: Object.keys(serviceCategoryCost[serviceCategory]).map((service) => {
                const { totalBill, onDemandCost, commitmentsCost, savings } = aggregateData(serviceCategoryCost[serviceCategory][service]);

                return {
                  name: service,
                  totalBill,
                  onDemandCost,
                  commitmentsCost,
                  savings,
                  resourceGroups: Object.keys(serviceCategoryCost[serviceCategory][service]).map(
                    (resourceGroup) => {
                      const { totalBill, onDemandCost, commitmentsCost, savings } = aggregateData(serviceCategoryCost[serviceCategory][service][resourceGroup]);

                      return {
                        name: resourceGroup,
                        totalBill,
                        onDemandCost,
                        commitmentsCost,
                        savings,
                        resources: Object.keys(serviceCategoryCost[serviceCategory][service][resourceGroup]).map((resource) => ({
                          name: resource,
                          totalBill: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].TotalBill || "",
                          onDemandCost: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].OnDemandCost || "",
                          commitmentsCost: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].CommitmentsCost || "",
                          savings: serviceCategoryCost[serviceCategory][service][resourceGroup][resource].Savings || ""
                        })),
                      };
                    }
                  ),
                };
              }),
            };
          }
        );

        const formattedBillAllocationData = billAllocation.billAllocation.map(
          (item) => ({
            name: item.tags_AppID_AppName || "null",
            ownerName: item.tags_owner || "null",
            totalBill: item.totalBill ? `$${item.totalBill.toFixed(2)}` : "$0.00",
            normalizedVariation: item.Normalized_Variation_MoM !== null
              ? `${item.Normalized_Variation_MoM}%`
              : "null",
            rawVariation: item.rawVariation !== null ? `${item.rawVariation}%` : "null",
            savings: item.savings ? `$${item.savings.toFixed(2)}` : "$0.00",
          })
        );

        console.log("formattedBoxData", formattedBoxData);
        console.log("formattedBillAllocationData", formattedBillAllocationData);
        console.log("formattedServiceCategoryData", formattedServiceCategoryData);

        setBoxData(formattedBoxData);
        setServiceCategoryData(formattedServiceCategoryData);
        setBillAllocationData(formattedBillAllocationData);
        setFilteredBillAllocationData(formattedBillAllocationData);

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
      columnHead2: "Total Bill",
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
