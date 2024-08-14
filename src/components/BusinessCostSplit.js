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
  const [headerLabelsForBillAllocation, setHeaderLabelsForBillAllocation] = useState([]);
  const [uniqueBillAllocationData, setUniqueBillAllocationData] = useState([]);
 
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
          billAllocation,
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

          data.forEach((item) => {
            totalBill += item.totalBill || 0;
            onDemandCost += item.onDemandCost || 0;
            commitmentsCost += item.commitmentsCost || 0;
            savings += item.savings || 0;
          });

          return { totalBill, onDemandCost, commitmentsCost, savings };
        };

        const formattedServiceCategoryData = Object.keys(serviceCategoryCost).map(
          (serviceCategory) => {
            const services = Object.keys(
              serviceCategoryCost[serviceCategory]
            ).map((service) => {
              const resourceGroups = Object.keys(
                serviceCategoryCost[serviceCategory][service]
              ).map((resourceGroup) => {
                const resources = Object.keys(
                  serviceCategoryCost[serviceCategory][service][resourceGroup]
                ).map((resource) => ({
                  name: resource,
                  totalBill:
                    serviceCategoryCost[serviceCategory][service][resourceGroup][
                      resource
                    ].TotalBill || 0,
                  onDemandCost:
                    serviceCategoryCost[serviceCategory][service][resourceGroup][
                      resource
                    ].OnDemandCost || 0,
                  commitmentsCost:
                    serviceCategoryCost[serviceCategory][service][resourceGroup][
                      resource
                    ].CommitmentsCost || 0,
                  savings:
                    serviceCategoryCost[serviceCategory][service][resourceGroup][
                      resource
                    ].Savings || 0,
                }));

                const { totalBill, onDemandCost, commitmentsCost, savings } =
                  aggregateData(resources);

                return {
                  name: resourceGroup,
                  totalBill,
                  onDemandCost,
                  commitmentsCost,
                  savings,
                  resources,
                };
              });

              const { totalBill, onDemandCost, commitmentsCost, savings } =
                aggregateData(resourceGroups);

              return {
                name: service,
                totalBill,
                onDemandCost,
                commitmentsCost,
                savings,
                resourceGroups,
              };
            });

            const { totalBill, onDemandCost, commitmentsCost, savings } =
              aggregateData(services);

            return {
              name: serviceCategory,
              totalBill,
              onDemandCost,
              commitmentsCost,
              savings,
              services,
            };
          }
        );
 
        const billAllocationMap = billAllocation.billAllocation.reduce(
          (acc, item) => {
            const modifiedDate = new Date(item.modifieddate);
            const monthString = modifiedDate.toLocaleString("en-US", {
              month: "long",
            });
            const yearString = modifiedDate.getFullYear().toString().slice(-2);
            const formattedDate = `${monthString}-${yearString}`;

            if (!acc[formattedDate]) {
              acc[formattedDate] = [];
            }

            acc[formattedDate].push({
              name: item.tags_AppID_AppName || "null",
              ownerName: item.tags_owner || "null",
              totalBill: item.totalBill ? `$${item.totalBill.toFixed(2)}` : "$0.00",
              normalizedVariation:
                item.Normalized_Variation_MoM !== null
                  ? `${item.Normalized_Variation_MoM}%`
                  : "null",
              rawVariation: item.rawVariation !== null ? `${item.rawVariation}%` : "null",
              savings: item.savings ? `$${item.savings.toFixed(2)}` : "$0.00",
            });

            return acc;
          },
          {}
        );

        const uniqueModifiedDatesForBillAllocation = Object.keys(billAllocationMap);
        const flattenedBillAllocationData = uniqueModifiedDatesForBillAllocation.reduce(
          (acc, date, dateIndex) => {
            billAllocationMap[date].forEach((item, itemIndex) => {
              if (!acc[itemIndex]) acc[itemIndex] = {};
              columns1.forEach((col) => {
                acc[itemIndex][`${col.key}_${dateIndex}`] = item[col.key];
              });
            });
            return acc;
          },
          []
        );
        // Extract unique application names from flattenedBillAllocationData
        const uniqueNamesSet = new Set();
        flattenedBillAllocationData.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (key.startsWith("name_")) {
              uniqueNamesSet.add(item[key]);
            }
          });
        });
        const uniqueNames = [...uniqueNamesSet];

        console.log("uniqueNames", uniqueNames);
 
        console.log("formattedBoxData", formattedBoxData);
        console.log("flattenedBillAllocationData", flattenedBillAllocationData);
        console.log("formattedServiceCategoryData", formattedServiceCategoryData);
 
        setBoxData(formattedBoxData);
        setServiceCategoryData(formattedServiceCategoryData);
        setBillAllocationData(flattenedBillAllocationData);
        setFilteredBillAllocationData(flattenedBillAllocationData);
        setHeaderLabelsForBillAllocation(uniqueModifiedDatesForBillAllocation);
        setUniqueBillAllocationData(uniqueNames);
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
        (item) => {
          return Object.keys(item).some(key => key.startsWith('name_') && item[key] === selectedReportType);
        }
      );
      setFilteredBillAllocationData(filteredData);
    } else {
      setFilteredBillAllocationData(billAllocationData);
    }
  };
 
 
  const columns1 = [
    { key: "name", label: "Application Name" },
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

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "0px" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: "18px" }}>Cost & Usage/</span>
              <span style={{ color: "#5f249f", fontSize: "18px" }}>
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
          marginLeft: "-12px",
          paddingRight : "0px",
          paddingLeft : "10px",
        }}
      >
        <ContainerBox data={boxData} />
      </div>
      <div
        style={{
          marginBottom: "30px",
          textAlign: "left",
          width: "100%",
          marginLeft: "-268px",
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
          marginLeft: "-537px",
          marginTop: "-23px",
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
                    {uniqueBillAllocationData.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name === "null" ? "null" : name}
                      </MenuItem>
                    ))}
                </Select>
            </FormControl>
          }
          tableData={filteredBillAllocationData}
          tableHeight="auto"
          tableWidth="524px"
          columns={columns1}
          headerLabels={headerLabelsForBillAllocation}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "630px",
          marginTop: "-794px",
          marginBottom: "30px",
        }}
      >
        <ServiceCategory
          dummyData={serviceCategoryData}
          height="754px"
          width="575px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};
 
export default BusinessCostSplit;