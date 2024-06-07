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

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#63666A",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  select: {
    fontSize: "0.7rem",
    padding: "2px 4px",
    color: "#63666A",
    borderColor: "#63666A",
    minWidth: "auto",
    "& .MuiSelect-select": {
      padding: "2px 4px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px 4px",
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  chart: {
    width: '50%',
    padding: theme.spacing(1),
  },
  pieChart: {
    width: '48%',
    padding: theme.spacing(5),
    marginLeft :'-60px',
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

  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <div style={{ marginLeft: "-12px", width: "200%" }}>
        <Subheader
          title={
            <div>
              <span style={{ fontSize: '18px' }}>Recommendations/</span>
              <span style={{ color: '#0070C0', fontSize: '18px' }}>Hyper-ScalarAdvisor</span>
            </div>
          }
        />
      </div>
      <NavigationBar />
      <div style={{ display: 'flex', justifyContent: 'center',marginLeft:'-20px' }}>
        <ContainerBox data={dataSet1} />
      </div>
      <div className={classes.container} style={{display:'flex',width:"100%",justifyContent: "center",paddingLeft:'43px'}}>
        <div className={classes.chart}>
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
        <div className={classes.pieChart}>
          <PieChartContainer
            title1="Applications with High Impact Recommendations"
            data1={data1}
            title2="Service Category with High Impact Recommendations"
            data2={data2}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: "100px" }}>
        <ServiceCategory
          dummyData={dummyData}
          height="350px"
          width="1100px"
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default HyperScalarAdvisor;
