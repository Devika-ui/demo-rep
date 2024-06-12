import React, { useState} from "react";
import { makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";
import HorizontalBarGraph from "./HorizontalBarGraph";
import CategoriesBarChart from "./CategoriesBarChart";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import ServiceCategory from "./ServiceCategory";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#63666A",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    position: "absolute",
    top: 235,
    left: 1000,
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
}));

const OrphanedRSVBackups = () => {
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
  
    // Handle change for the dropdown
    const handleGroupByChange = (event) => {
      setGroupBy(event.target.value);
    };
    const dataSet1 = [
        { number: "50", text: "Count of Unhealthy Backups" },
        { number: "10", text: "Count of Orphan Backups" },
      ];

      const horizontaldata = [
        { name: "Subscription 1", count: 100 },
        { name: "Subscription 2", count: 150 },
        { name: "Subscription 3", count: 200 },
        { name: "Subscription 4", count: 75 },
        { name: "Subscription 5", count: 125 },
      ];

      const data = [
        { name: "SQL Database", 
      "Unhealthy" : "9" },
       { name: "Virtual Machine", 
      "Unhealthy" : "11" },
       { name: "Azure File Share", 
      "Unhealthy" : "19" },
       { name: "Azure NetApp Files", 
      "Unhealthy" : "22" },
       ];
       const tableData = [
        {
          tableTitle: "On Demand Cost for Recommendations",
          columnHead1: "Item Name",
          columnHead2: " Protection Status ",
          columnHead3: " Protection State",
          columnHead4: " Application",
          columnHead5: "Retention Period ",
          columnHead6: "Last backup Date",
          columnHead7:"Archive Enabled",
        },
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
      
      return (
        <div>
          <Header onButtonClick={handleButtonClick} />
          <Subheader
            title={
              <div>
                <span style={{ fontSize: "15px" }}>Recommendations/</span>
                <span style={{ color: "#0070C0", fontSize: "15px" }}>
                  Orphaned RSV Backups
                </span>
              </div>
            }
          />
          <NavigationBar />
          <div style={{ display: "flex", justifyContent: "center", paddingRight:'15px' }}>
            <ContainerBox data={dataSet1} />
          </div>
          <div
  style={{
    display: "flex",
    marginBottom: 20,
    paddingLeft: "0px",
    height: "300px", // Adjust the height as desired
    width: "100%",
    alignItems: "center", // Add this to vertically center the graphs
    marginTop:"50px",
  }}
>
  <div style={{ width: "50%",marginTop:"480px",paddingLeft :"85px" }}>
    <HorizontalBarGraph
      data={horizontaldata}
      title="Comparison of Subscriptions Vs Orphan Backup Counts "
      width="100%"
      height={373}
    />
  </div>
  <div style={{ width: "55%",marginLeft:"-20px" }}>
    <CategoriesBarChart
      title="Categories with Unhealthy Protection Status"
      data={data}
      //yAxisLabel="Cost (in thousands)"
    />
  </div>
  {/* Separate container for buttons */}
  <div className={classes.buttonContainer}>
    <Button variant="contained" className={classes.button}>
      Customize Report
    </Button>
    <IconButton className={classes.button}>
      <ShareIcon />
    </IconButton>
  </div>
</div>
<div
        style={{
          marginLeft: -70,
          marginTop: 0,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "140px",
          paddingTop: "70px",
        }}
      >
        <ServiceCategory
          dummyData={dummyData}
          height="400px"
          width="1140px"
          tableData={tableData}
        />
      </div>
      </div>
      
      );
    };

export default OrphanedRSVBackups;