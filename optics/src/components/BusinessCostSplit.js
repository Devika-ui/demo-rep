import React, { useState } from 'react';
import Header from './Header';
import Subheader from './SubHeader';
import Ondemand from './Ondemand';
import NavigationBar from './NavigationBar';
import ServiceCategory from './ServiceCategory';
import ContainerBox from './ContainerBox'; 
import InvoiceTableView from './InvoiceTableView';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const BusinessCostSplit = () => {
    const [showStackBars, setShowStackBars] = useState(true);
    const [reportType, setReportType] = useState('');

    const handleButtonClick = (value) => {
        if (value === "Azure") {
            setShowStackBars(false); // Hide StackBars and show AzureBars
        } else {
            setShowStackBars(true); // Show StackBars
        }
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
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

    const dummyData1 = [
        { name: 'Project 1', ownerName: 'Owner A', totalBill: '$400', normalizedVariation: '10%', rawVariation: '5%', savings: '$50' },
        { name: 'Project 2', ownerName: 'Owner B', totalBill: '$490', normalizedVariation: '8%', rawVariation: '6%', savings: '$60' },
        { name: 'Project 3', ownerName: 'Owner C', totalBill: '$495', normalizedVariation: '10%', rawVariation: '8%', savings: '$70' },
        // Add more dummy data as needed
    ];

    const columns1 = [
        { key: 'name', label: 'Application/Project Name' },
        { key: 'ownerName', label: 'Owner Name' },
        { key: 'totalBill', label: 'Total Bill' },
        { key: 'normalizedVariation', label: '%Normalized Variation' },
        { key: 'rawVariation', label: '%Raw Variation' },
        { key: 'savings', label: 'Savings' },
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
            <div style={{marginLeft:'-13px'}}>
            <Subheader
                title={
                    <div>
                        <span style={{ fontSize: '18px' }}>Cost & Usage/</span>
                        <span style={{ color: '#0070C0', fontSize: '18px' }}>Business Cost Split</span>
                    </div>
                }
            />
            </div>
            <NavigationBar />
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-25px' }}>
                <ContainerBox data={dataSet} />
            </div>
            <div style={{ marginBottom: '30px', textAlign: 'left', width: '100%', marginLeft: '-280px', marginTop: '-20px' }}>
                <Ondemand />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: '-558px', marginTop:'-20px' }}>
                <InvoiceTableView
                    title={
                        <>
                            Total Bill Allocation
                            <br />
                            across
                            <br/>
                            Application/Project
                        </>
                    }
                    dropdown={
                      <FormControl variant="outlined" style={{ minWidth: 110, marginLeft: '0px' }}>
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
                              display: 'flex',
                              flexDirection: 'column',
                            },
                          },
                        }}
                      >
                        {/* <MenuItem value="">Group by Application</MenuItem> */}
                        <MenuItem value="app1">Application 1</MenuItem>
                        <MenuItem value="app2">Application 2</MenuItem>
                        <MenuItem value="app3">Application 3</MenuItem>
                      </Select>
                    </FormControl>
                    }
                    tableData={dummyData1}
                    tableHeight="auto"
                    tableWidth="528px"
                    columns={columns1}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '630px', marginTop: '-833px', marginBottom: '30px' }}>
                <ServiceCategory
                    dummyData={dummyData}
                    height="790px"
                    width="600px"
                    tableData={tableData}
                />
            </div>
        </div>
    );
};

export default BusinessCostSplit;
