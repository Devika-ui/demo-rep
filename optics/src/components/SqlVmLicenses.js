import React, { useState } from "react";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import PieChartContainer from "./PieChartContainer";
import ContainerBox from "./ContainerBox";
import GenericBarChart from "./GenericBarChart";
import ServiceCategory from "./ServiceCategory";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import CostsAmortized from "./CostsAmortized.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#63666A",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    position: "absolute",
    top: 235,
    left: 880,
    zIndex: 1000,
    margin: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    fontSize: "0.7rem",
    padding: "4px 8px",
    color: "#63666A",
    borderColor: "#63666A",
  },
  dialogPaper: {
    backgroundColor: "#D9D9D9",
    maxWidth: "280px", // Set a maximum width
    top: "140px",
    left: "280px",
    marginBottom: "200px",
    padding: "20px", // Add padding if needed
  },
  select: {
    fontSize: "0.7rem",
    padding: "2px 4px",
    color: "#63666A",
    borderColor: "#63666A",
    minWidth: "auto",
    "& .MuiSelect-select": {
      padding: "2px 4px", // Ensuring the inner padding is reduced
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px 4px", // Adjusting input padding
    },
  },
}));
const additionalFilters = [
  {
    label: 'Service Category(s)',
    name: 'Select Service Category',
    options: [
      { value: 'Service Category 1', label: 'Service Category 1' },
      { value: 'Service Category 2', label: 'Service Category 2' },
      { value: 'Service Category 3', label: 'Service Category 3' }
    ]
  },
  {
    label: 'Owner(s)',
    name: 'Select Owner',
    options: [
      { value: 'Owner 1', label: 'Owner 1' },
      { value: 'Owner 2', label: 'Owner 2' },
      { value: 'Owner 3', label: 'Owner 3' }
    ]
  },
  {
    label: 'Environment(s)',
    name: 'environments',
    options: [
      { value: 'Production', label: 'Production' },
      { value: 'Staging', label: 'Staging' },
      { value: 'Development', label: 'Development' }
    ]
  },
  {
    label:'Cost Center(s)',
    name:'Select Cost Center',
    options: [
          { value: 'Cost Center1', label: 'Cost Center1' },
          { value: 'Cost Center2', label: 'Cost Center2' },
          { value: 'Cost Center3', label: 'Cost Center3' },
        ]
  },
];

const SqlVmLicenses = () => {
  const classes = useStyles();
  const [showStackBars, setShowStackBars] = useState(true);
  const [groupBy, setGroupBy] = useState("");

  // Callback function to receive value from HeaderButton
  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false); // Hide StackBars and show AzureBars
    } else {
      setShowStackBars(true); // Show StackBars
    }
  };
  const data = [
    {
      name: "Subscription 1",
      "On Demand Cost": 400000,
      "Consumed Meter": 50000,
    },
    {
      name: "Subscription 2",
      "On Demand Cost": 250000,
      "Consumed Meter": 80000,
    },
    {
      name: "Subscription 3",
      "On Demand Cost": 90000,
      "Consumed Meter": 10000,
    },
    {
      name: "Subscription 4",
      "On Demand Cost": 50000,
      "Consumed Meter": 115000,
    },
    {
      name: "Subscription 5",
      "On Demand Cost": 25000,
      "Consumed Meter": 100000,
    },
    {
      name: "Subscription 6",
      "On Demand Cost": 15000,
      "Consumed Meter": 75000,
    },
  ];

  const data1 = [
    { name: "AHUB", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "DR", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "PAYGO", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    {
      name: "Windows_Server",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "SLES_BYOS",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const data2 = [
    {
      name: "AHUB",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "DR",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "PAYGO",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Windows_Server",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "SLES_BYOS",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const dataSet1 = [
    { number: "20", text: "Total Count Of AHUB License" },
    { number: "10", text: "Total count Of PAYGO License" },
  ];

  const dummyData = [
    {
      name: "Virtual Machine",
      totalBill: "$400",
      onDemandCost: "$100",
      commitmentsCost: "$200",
      savings: "$50",
      budget: "10",
      services: [
        {
          name: "VM1",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG1",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM1-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM1-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG2",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM2-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM2-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "VM2",
          totalBill: "$200",
          onDemandCost: "$50",
          commitmentsCost: "$100",
          savings: "$25",
          budget: "10",
          resourceGroups: [
            {
              name: "RG3",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM3-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM3-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG4",
              totalBill: "$100",
              onDemandCost: "$25",
              commitmentsCost: "$50",
              savings: "$12.5",
              budget: "10",
              resources: [
                {
                  name: "VM4-Resource1",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
                {
                  name: "VM4-Resource2",
                  totalBill: "$50",
                  onDemandCost: "$12.5",
                  commitmentsCost: "$25",
                  savings: "$6.25",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      totalBill: "$300",
      onDemandCost: "$120",
      commitmentsCost: "$180",
      savings: "$60",
      budget: "10",
      services: [
        {
          name: "Storage1",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG5",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage1-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage1-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG6",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage2-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage2-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
        {
          name: "Storage2",
          totalBill: "$150",
          onDemandCost: "$60",
          commitmentsCost: "$90",
          savings: "$30",
          budget: "10",
          resourceGroups: [
            {
              name: "RG7",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage3-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage3-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
            {
              name: "RG8",
              totalBill: "$75",
              onDemandCost: "$30",
              commitmentsCost: "$45",
              savings: "$15",
              budget: "10",
              resources: [
                {
                  name: "Storage4-Resource1",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
                {
                  name: "Storage4-Resource2",
                  totalBill: "$37.5",
                  onDemandCost: "$15",
                  commitmentsCost: "$22.5",
                  savings: "$7.5",
                  budget: "10",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const tableData = [
    {
      tableTitle: "On Demand Cost Allocation for licenses",
      columnHead1: "Item Name",
      columnHead2: " SQL Server License Type ",
      columnHead3: " Total Cost",
      columnHead4: " Owner name",
      columnHead5: "Application ",
      columnHead6: "Environment",
    },
  ];
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
  const bars = [
    {
      dataKey: 'On Demand Cost',
      fill: '#2CAFFE',
      name: 'On Demand Cost',
      barSize: 20,
    },
    {
      dataKey: 'Consumed Meter',
      fill: '#330072',
      name: 'Consumed Meter',
      barSize: 20,
    },
  ];

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
                className={classes.select}
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
        <div className={classes.buttonContainer}>
          <CostsAmortized dialogPaperClass={classes.dialogPaper} />
          <Button variant="contained" className={classes.button}>
            Customize Report
          </Button>
          <IconButton className={classes.button}>
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
          marginLeft: -70,
          marginTop: 12,
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
