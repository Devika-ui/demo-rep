import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UnattachedManagedDisks from "./UnattachedManagedDisks";
import OrphanedSnapshots from "./OrphanedSnapshots";
import HyperScalarAdvisor from "./HyperScalarAdvisor";
import SqlVmLicenses from "./SqlVmLicenses";
import OrphanedRSVBackups from "./OrphanedRSVBackups";

const RecommendationSPA = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("unattachedManagedDisks");

  useEffect(() => {
    const hash = location.hash.substring(1); // Removes the "#" from the hash
    //location.hash retrieves the part of the URL after #
    setActiveSection(hash);
  }, [location]);

  //unattachedManagedDisks

  const additionalFilters_UnattachedManagedDisks = [
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

  const tableData_UnattachedManagedDisks = [
    {
      tableTitle: "On-Demand Cost Allocation for Unattached Managed Disks",
      columnHead1: "Application/Project Name",
      columnHead2: "Owner Name ",
      columnHead3: "Total Cost",
      columnHead4: "Count of Disks",
      columnHead5: "Environment",
    },
  ];

  const dummyData_UnattachedManagedDisks = [
    {
      name: "Subscription 1",
      ownerName: "A",
      totalCost: "$1000",
      countOfDisks: 50,
      environment: "Production",
      children: [
        {
          name: "Storage",
          ownerName: "B",
          totalCost: "$500",
          countOfDisks: 30,
          environment: "Production",
          children: [
            {
              name: "Premium LRS",
              ownerName: "C",
              totalCost: "$300",
              countOfDisks: 20,
              environment: "Production",
              children: [
                {
                  name: "Resource Group 1",
                  ownerName: "D",
                  totalCost: "$200",
                  countOfDisks: 10,
                  environment: "Production",
                  children: [
                    {
                      name: "Resource 1",
                      ownerName: "E",
                      totalCost: "$100",
                      countOfDisks: 5,
                      environment: "Production",
                    },
                    {
                      name: "Resource 2",
                      totalCost: "$100",
                      ownerName: "F",

                      countOfDisks: 5,
                      environment: "Production",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // Add more data here as needed
    {
      name: "Subscription 2",
      ownerName: "A1",
      totalCost: "$1500",
      countOfDisks: 70,
      environment: "Development",
      children: [
        {
          name: "Storage",
          ownerName: "A2",
          totalCost: "$800",
          countOfDisks: 40,
          environment: "Development",
          children: [
            {
              name: "Standard LRS",
              ownerName: "A3",
              totalCost: "$400",
              countOfDisks: 25,
              environment: "Development",
              children: [
                {
                  name: "Resource Group 2",
                  ownerName: "A4",
                  totalCost: "$250",
                  countOfDisks: 15,
                  environment: "Development",
                  children: [
                    {
                      name: "Resource 3",
                      ownerName: "A5",
                      totalCost: "$150",
                      countOfDisks: 8,
                      environment: "Development",
                    },
                    {
                      name: "Resource 4",
                      ownerName: "A6",
                      totalCost: "$100",
                      countOfDisks: 7,
                      environment: "Development",
                    },
                  ],
                },
                {
                  name: "Resource Group 3",
                  ownerName: "A7",
                  totalCost: "$150",
                  countOfDisks: 10,
                  environment: "Development",
                  children: [
                    {
                      name: "Resource 5",
                      ownerName: "B1",
                      totalCost: "$80",
                      countOfDisks: 5,
                      environment: "Development",
                    },
                    {
                      name: "Resource 6",
                      ownerName: "B2",
                      totalCost: "$70",
                      countOfDisks: 5,
                      environment: "Development",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const dataSet1_UnattachedManagedDisks = [
    { number: "$75.4K", text: "Total On Demand Cost" },
    { number: "12", text: "Count Of Snapshots" },
    { number: "10", text: "Impacted Applications" },
  ];

  const data_UnattachedManagedDisks = [
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

  //unattachedManagedDisks ends

  //orphanedSnapshots
  const additionalFilters_OrphanedSnapshots = [
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

  const dummyData_OrphanedSnapshots = [
    {
      name: "Subscription 1",
      ownerName: "A",
      totalCost: "$1000",
      countOfDisks: 50,
      environment: "Production",
      children: [
        {
          name: "Storage",
          ownerName: "B",
          totalCost: "$500",
          countOfDisks: 30,
          environment: "Production",
          children: [
            {
              name: "Premium LRS",
              ownerName: "C",
              totalCost: "$300",
              countOfDisks: 20,
              environment: "Production",
              children: [
                {
                  name: "Resource Group 1",
                  ownerName: "D",
                  totalCost: "$200",
                  countOfDisks: 10,
                  environment: "Production",
                  children: [
                    {
                      name: "Resource 1",
                      ownerName: "E",
                      totalCost: "$100",
                      countOfDisks: 5,
                      environment: "Production",
                    },
                    {
                      name: "Resource 2",
                      totalCost: "$100",
                      ownerName: "F",

                      countOfDisks: 5,
                      environment: "Production",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // Add more data here as needed
    {
      name: "Subscription 2",
      ownerName: "A1",
      totalCost: "$1500",
      countOfDisks: 70,
      environment: "Development",
      children: [
        {
          name: "Storage",
          ownerName: "A2",
          totalCost: "$800",
          countOfDisks: 40,
          environment: "Development",
          children: [
            {
              name: "Standard LRS",
              ownerName: "A3",
              totalCost: "$400",
              countOfDisks: 25,
              environment: "Development",
              children: [
                {
                  name: "Resource Group 2",
                  ownerName: "A4",
                  totalCost: "$250",
                  countOfDisks: 15,
                  environment: "Development",
                  children: [
                    {
                      name: "Resource 3",
                      ownerName: "A5",
                      totalCost: "$150",
                      countOfDisks: 8,
                      environment: "Development",
                    },
                    {
                      name: "Resource 4",
                      ownerName: "A6",
                      totalCost: "$100",
                      countOfDisks: 7,
                      environment: "Development",
                    },
                  ],
                },
                {
                  name: "Resource Group 3",
                  ownerName: "A7",
                  totalCost: "$150",
                  countOfDisks: 10,
                  environment: "Development",
                  children: [
                    {
                      name: "Resource 5",
                      ownerName: "B1",
                      totalCost: "$80",
                      countOfDisks: 5,
                      environment: "Development",
                    },
                    {
                      name: "Resource 6",
                      ownerName: "B2",
                      totalCost: "$70",
                      countOfDisks: 5,
                      environment: "Development",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const dataSet1_OrphanedSnapshots = [
    { number: "$75.4K", text: "Total On Demand Cost" },
    { number: "12", text: "Count Of Snapshots" },
    { number: "10", text: "Impacted Applications" },
  ];

  const data_OrphanedSnapshots = [
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
  const tableData_OrphanedSnapshots = [
    {
      tableTitle: "On-Demand Cost Allocation for Orphaned Snapshots",
      columnHead1: "Application/Project Name",
      columnHead2: "Owner Name ",
      columnHead3: "Total Cost",
      columnHead4: "Count of Disks",
      columnHead5: "Environment",
    },
  ];

  const data1_OrphanedSnapshots = [
    {
      name: "Disk 1",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "Disk 2",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "Disk 3",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Disk 4",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "Disk 5",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const data2_OrphanedSnapshots = [
    {
      name: "Disk 1",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    {
      name: "Disk 2",
      value: Math.floor(Math.random() * 100),
      color: "#BA741A",
    },
    {
      name: "Disk 3",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Disk 4",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    {
      name: "Disk 5",
      value: Math.floor(Math.random() * 100),
      color: "#5F249F",
    },
  ];

  const horizontaldata_OrphanedSnapshots = [
    { name: "North Europe", count: 100 },
    { name: "East US 2", count: 150 },
    { name: "South East Asia", count: 200 },
    { name: "West Europe", count: 75 },
    { name: "West US 2", count: 125 },
  ];

  const bars_OrphanedSnapshots = [
    {
      dataKey: "On Demand Cost",
      fill: "#2CAFFE",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "Consumed Meter",
      fill: "#330072",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];

  //orphanedSnapshots ends

  //HyperScalarAdvisor

  const bars_HyperScalarAdvisor = [
    {
      dataKey: "High",
      fill: "#2CAFFE",
      name: "High",
      barSize: 20,
    },
    {
      dataKey: "Medium",
      fill: "#006975",
      name: "Medium",
      barSize: 20,
    },
    {
      dataKey: "Low",
      fill: "#330072",
      name: "Low",
      barSize: 20,
    },
  ];

  const tableData_HyperScalarAdvisor = [
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

  const dummyData_HyperScalarAdvisor = [
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

  const data2_HyperScalarAdvisor = [
    {
      name: "Virtual Machines",
      value: Math.floor(Math.random() * 100),
      color: "#0099C6",
    },
    { name: "DR", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    {
      name: "Storage",
      value: Math.floor(Math.random() * 100),
      color: "#FFCD00",
    },
    {
      name: "Bandwidth",
      value: Math.floor(Math.random() * 100),
      color: "#00968F",
    },
    { name: "ANF", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];
  const data1_HyperScalarAdvisor = [
    { name: "App 1", value: Math.floor(Math.random() * 100), color: "#0099C6" },
    { name: "App 2", value: Math.floor(Math.random() * 100), color: "#BA741A" },
    { name: "App 3", value: Math.floor(Math.random() * 100), color: "#FFCD00" },
    { name: "App 4", value: Math.floor(Math.random() * 100), color: "#00968F" },
    { name: "App 5", value: Math.floor(Math.random() * 100), color: "#5F249F" },
  ];
  const dataSet1_HyperScalarAdvisor = [
    { number: "50", text: "Number of Recommendations" },
    { number: "10", text: "High Impact Recommendations" },
  ];
  const data_HyperScalarAdvisor = [
    { name: "Subscription 1", High: 400000, Medium: 50000, Low: 2000 },
    { name: "Subscription 2", High: 250000, Medium: 80000, Low: 5000 },
    { name: "Subscription 3", High: 90000, Medium: 10000, Low: 3000 },
    { name: "Subscription 4", High: 50000, Medium: 115000, Low: 10000 },
    { name: "Subscription 5", High: 25000, Medium: 100000, Low: 10000 },
    { name: "Subscription 6", High: 15000, Medium: 75000, Low: 7000 },
  ];

  const additionalFilters_HyperScalarAdvisor = [
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

  // HyperScalarAdvisor ends

  //SqlVmLicenses

  const bars_SqlVmLicenses = [
    {
      dataKey: "On Demand Cost",
      fill: "#2CAFFE",
      name: "On Demand Cost",
      barSize: 20,
    },
    {
      dataKey: "Consumed Meter",
      fill: "#330072",
      name: "Consumed Meter",
      barSize: 20,
    },
  ];

  const tableData_SqlVmLicenses = [
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

  const dummyData_SqlVmLicenses = [
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
  const data_SqlVmLicenses = [
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

  const data1_SqlVmLicenses = [
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

  const data2_SqlVmLicenses = [
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

  const dataSet1_SqlVmLicenses = [
    { number: "20", text: "Total Count Of AHUB License" },
    { number: "10", text: "Total count Of PAYGO License" },
  ];

  const additionalFilters_SqlVmLicenses = [
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

  //SqlVmLicenses ends

  //OrphanedRSVBackups
  const dataSet1_OrphanedRSVBackups = [
    { number: "50", text: "Count of Unhealthy Backups" },
    { number: "10", text: "Count of Orphan Backups" },
  ];

  const horizontaldata_OrphanedRSVBackups = [
    { name: "Subscription 1", count: 100 },
    { name: "Subscription 2", count: 150 },
    { name: "Subscription 3", count: 200 },
    { name: "Subscription 4", count: 75 },
    { name: "Subscription 5", count: 125 },
  ];

  const data1_OrphanedRSVBackups = [
    { name: "SQL Database", Unhealthy: "9" },
    { name: "Virtual Machine", Unhealthy: "11" },
    { name: "Azure File Share", Unhealthy: "19" },
    { name: "Azure NetApp Files", Unhealthy: "22" },
  ];

  const tableData_OrphanedRSVBackups = [
    {
      tableTitle: "On Demand Cost for Recommendations",
      columnHead1: "Item Name",
      columnHead2: " Protection Status ",
      columnHead3: " Protection State",
      columnHead4: " Application",
      columnHead5: "Retention Period ",
      columnHead6: "Last backup Date",
      columnHead7: "Archive Enabled",
    },
  ];
  const dummyData_OrphanedRSVBackups = [
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
  const bars_OrphanedRSVBackups = [
    {
      dataKey: "Unhealthy",
      fill: "#2CAFFE",
      name: "Unhealthy",
      barSize: 20,
    },
  ];

  //OrphanedRSVBackups ends
  return (
    <div>
      {activeSection === "unattachedManagedDisks" && (
        <UnattachedManagedDisks
          additionalFilters={additionalFilters_UnattachedManagedDisks}
          tableData={tableData_UnattachedManagedDisks}
          dummyData={dummyData_UnattachedManagedDisks}
          dataSet1={dataSet1_UnattachedManagedDisks}
          data={data_UnattachedManagedDisks}
        />
      )}
      {activeSection === "orphanedSnapshots" && (
        <OrphanedSnapshots
          additionalFilters={additionalFilters_OrphanedSnapshots}
          tableData={tableData_OrphanedSnapshots}
          dummyData={dummyData_OrphanedSnapshots}
          dataSet1={dataSet1_OrphanedSnapshots}
          data={data_OrphanedSnapshots}
          data1={data1_OrphanedSnapshots}
          data2={data2_OrphanedSnapshots}
          horizontaldata={horizontaldata_OrphanedSnapshots}
          bars={bars_OrphanedSnapshots}
        />
      )}
      {activeSection === "hyperScalarAdvisor" && (
        <HyperScalarAdvisor
          additionalFilters={additionalFilters_HyperScalarAdvisor}
          tableData={tableData_HyperScalarAdvisor}
          dummyData={dummyData_HyperScalarAdvisor}
          dataSet1={dataSet1_HyperScalarAdvisor}
          data={data_HyperScalarAdvisor}
          data1={data1_HyperScalarAdvisor}
          data2={data2_HyperScalarAdvisor}
          bars={bars_HyperScalarAdvisor}
        />
      )}
      {activeSection === "sqlVmLicenses" && (
        <SqlVmLicenses
          additionalFilters={additionalFilters_SqlVmLicenses}
          tableData={tableData_SqlVmLicenses}
          dummyData={dummyData_SqlVmLicenses}
          dataSet1={dataSet1_SqlVmLicenses}
          data={data_SqlVmLicenses}
          data1={data1_SqlVmLicenses}
          data2={data2_SqlVmLicenses}
          bars={bars_SqlVmLicenses}
        />
      )}
      {activeSection === "orphanedRSVBackups" && (
        <OrphanedRSVBackups
          tableData={tableData_OrphanedRSVBackups}
          dummyData={dummyData_OrphanedRSVBackups}
          dataSet1={dataSet1_OrphanedRSVBackups}
          data1={data1_OrphanedRSVBackups}
          bars={bars_OrphanedRSVBackups}
          horizontaldata={horizontaldata_OrphanedRSVBackups}
        />
      )}
    </div>
  );
};

export default RecommendationSPA;
