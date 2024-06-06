import React, { useEffect, useState } from 'react';
import Header from './Header';
import Subheader from './SubHeader';
import BillAllocation from './BillAllocation';
import Ondemand from './Ondemand';
import NavigationBar from './NavigationBar';
import ServiceCategory from './ServiceCategory';
import ContainerBox from './ContainerBox'; 

const BusinessCostSplit = () => {
    const [showStackBars, setShowStackBars] = useState(true);
    const handleButtonClick = (value) => {
        if (value === "Azure") {
            setShowStackBars(false); // Hide StackBars and show AzureBars
        } else {
            setShowStackBars(true); // Show StackBars
        }
    };
    const dataSet = [
        { number: 55, text: "Applications with Tags" },
        { number: 47, text: "Applications without Tags" },
        { number: 2, text: "Project with Tags" },
        { number: "NA", text: "Project without Tags" },
      ];


const dummyData = [
  {
    name: "Virtual Machine",
    totalBill: "$400",
    onDemandCost: "$100",
    commitmentsCost: "$200",
    savings: "$50",
    services: [
      {
        name: "VM1",
        totalBill: "$200",
        onDemandCost: "$50",
        commitmentsCost: "$100",
        savings: "$25",
        resourceGroups: [
          {
            name: "RG1",
            totalBill: "$100",
            onDemandCost: "$25",
            commitmentsCost: "$50",
            savings: "$12.5",
            resources: [
              {
                name: "VM1-Resource1",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
              {
                name: "VM1-Resource2",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
            ],
          },
          {
            name: "RG2",
            totalBill: "$100",
            onDemandCost: "$25",
            commitmentsCost: "$50",
            savings: "$12.5",
            resources: [
              {
                name: "VM2-Resource1",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
              {
                name: "VM2-Resource2",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
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
        resourceGroups: [
          {
            name: "RG3",
            totalBill: "$100",
            onDemandCost: "$25",
            commitmentsCost: "$50",
            savings: "$12.5",
            resources: [
              {
                name: "VM3-Resource1",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
              {
                name: "VM3-Resource2",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
            ],
          },
          {
            name: "RG4",
            totalBill: "$100",
            onDemandCost: "$25",
            commitmentsCost: "$50",
            savings: "$12.5",
            resources: [
              {
                name: "VM4-Resource1",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
              },
              {
                name: "VM4-Resource2",
                totalBill: "$50",
                onDemandCost: "$12.5",
                commitmentsCost: "$25",
                savings: "$6.25",
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
    services: [
      {
        name: "Storage1",
        totalBill: "$150",
        onDemandCost: "$60",
        commitmentsCost: "$90",
        savings: "$30",
        resourceGroups: [
          {
            name: "RG5",
            totalBill: "$75",
            onDemandCost: "$30",
            commitmentsCost: "$45",
            savings: "$15",
            resources: [
              {
                name: "Storage1-Resource1",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
              {
                name: "Storage1-Resource2",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
            ],
          },
          {
            name: "RG6",
            totalBill: "$75",
            onDemandCost: "$30",
            commitmentsCost: "$45",
            savings: "$15",
            resources: [
              {
                name: "Storage2-Resource1",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
              {
                name: "Storage2-Resource2",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
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
        resourceGroups: [
          {
            name: "RG7",
            totalBill: "$75",
            onDemandCost: "$30",
            commitmentsCost: "$45",
            savings: "$15",
            resources: [
              {
                name: "Storage3-Resource1",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
              {
                name: "Storage3-Resource2",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
            ],
          },
          {
            name: "RG8",
            totalBill: "$75",
            onDemandCost: "$30",
            commitmentsCost: "$45",
            savings: "$15",
            resources: [
              {
                name: "Storage4-Resource1",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
              },
              {
                name: "Storage4-Resource2",
                totalBill: "$37.5",
                onDemandCost: "$15",
                commitmentsCost: "$22.5",
                savings: "$7.5",
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
          tableTitle: "Service Category Cost Allocation",
          columnHead1: "Service Category",
          columnHead2: " Total Bill ",
          columnHead3: "On Demand Cost",
          columnHead4: "Commitments Cost",
          columnHead5: "Savings",
          //columnHead6: "Environment",
        },
      ];

    return (
        <div>
            <Header onButtonClick={handleButtonClick} />
            <Subheader
                title={
                    <div>
                        <span style={{ fontSize: '18px' }}>Cost & Usage/</span>
                        <span style={{ color: '#0070C0', fontSize: '18px' }}>Business Cost Split</span>
                    </div>
                }
            />
            <NavigationBar />
            {/* ContainerBox */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContainerBox data={dataSet} />
            </div>
            <div style={{ marginBottom: '30px', textAlign: 'left', width: '100%', marginLeft: '-271px', marginTop: '-20px' }}> {/* Align Ondemand component to the left */}
                <Ondemand />
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '90px' }}> {/* Center align InvoiceTableView component */}
                <BillAllocation/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '630px', marginTop: '-715px',marginBottom: '30px' }}>
            <ServiceCategory
          dummyData={dummyData}
          height="700px"
          width="600px"
          tableData={tableData}
        />
            </div>
        </div>
    );
};

export default BusinessCostSplit;
