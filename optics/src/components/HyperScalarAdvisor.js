import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Subheader from './SubHeader';
import NavigationBar from './NavigationBar';
import ContainerBox from './ContainerBox';
import PieChartContainer from './PieChartContainer';
import ServiceCategory from './ServiceCategory';
import HyperScalarBarChart from './HyperScalarBarChart';
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
  chartContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingLeft: "65px",
    width: "100%",
    height: "auto", // Adjust the height as desired
  },
  barChartContainer: {
    flex: 1,
    marginRight: "-50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pieChartContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight:"60px",
    paddingLeft:"30px",
    marginTop: "50px", // Add this to increase top margin
    marginBottom: "50px", // Add this to increase bottom margin
  },
}));

const HyperScalarAdvisor = () => {
  const [showStackBars, setShowStackBars] = useState(true);
  const classes = useStyles();
  const [groupBy, setGroupBy] = useState("");

  const handleButtonClick = (value) => {
    if (value === "Azure") {
      setShowStackBars(false);
    } else {
      setShowStackBars(true);
    }
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

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

  const data = [
    { name: "Subscription 1", "High": 400000, "Medium": 50000, "Low": 2000 },
    { name: "Subscription 2", "High": 250000, "Medium": 80000, "Low": 5000 },
    { name: "Subscription 3", "High": 90000, "Medium": 10000, "Low": 3000 },
    { name: "Subscription 4", "High": 50000, "Medium": 115000, "Low": 10000 },
    { name: "Subscription 5", "High": 25000, "Medium": 100000, "Low": 10000 },
    { name: "Subscription 6", "High": 15000, "Medium": 75000, "Low": 7000 },
  ];

  const dataSet1 = [
    { number: "50", text: "Number of Recommendations" },
    { number: "10", text: "High Impact Recommendations" },
  ];

  const data1 = [
    { name: "App 1", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "App 2", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "App 3", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    { name: "App 4", value: Math.floor(Math.random() * 100), color: "#00968F" },
    { name: "App 5", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];

  const data2 = [
    { name: "Virtual Machines", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "DR", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "Storage", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    { name: "Bandwidth", value: Math.floor(Math.random() * 100), color: "#00968F" },
    { name: "ANF", value: Math.floor(Math.random() * 100), color: "#5F249F" },
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
           <HyperScalarBarChart
            title="Comparison of Subscriptions Vs Impact"
            data={data}
          >
              <Select
                value={groupBy}
                onChange={handleGroupByChange}
                displayEmpty
                className={classes.select}
              >
                <MenuItem value="">Choose Recommendation Category</MenuItem>
              <MenuItem value="auto-scale">Auto-Scale</MenuItem>
              <MenuItem value="rightsize">Right size</MenuItem>
              </Select>
            </HyperScalarBarChart>
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
export default HyperScalarAdvisor;
