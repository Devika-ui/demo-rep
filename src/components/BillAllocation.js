import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import "../css/components/BillAllocation.css"

const dummyData = [
  { name: 'Project 1', ownerName: 'Owner A', totalBill: '$400', normalizedVariation: '10%', rawVariation: '5%', savings: '$50' },
  { name: 'Project 2', ownerName: 'Owner B', totalBill: '$490', normalizedVariation: '8%', rawVariation: '6%', savings: '$60' },
  { name: 'Project 3', ownerName: 'Owner C', totalBill: '$495', normalizedVariation: '10%', rawVariation: '8%', savings: '$70' },
  // Add more dummy data as needed
];

const BillAllocation = () => {

  const [groupBy, setGroupBy] = useState('');

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className="cmpBillAlloc_container">
      <div className="cmpBillAlloc_header">
        <h2 className="cmpBillAlloc_title">Total Bill Allocation across Application/Project</h2>
        <div className="cmpBillAlloc_buttons">
        <Select
            value={groupBy}
            onChange={handleGroupByChange}
            displayEmpty
            className="cmpBillAlloc_select"
          >
            <MenuItem value="">Group by Application</MenuItem>
            <MenuItem value="app1">Application 1</MenuItem>
            <MenuItem value="app2">Application 2</MenuItem>
            <MenuItem value="app3">Application 3</MenuItem>
            {/* Add more MenuItem components as needed */}
          </Select>
        
          <Button variant="contained" className="cmpBillAlloc_button" color="inherit">Customize Report</Button>
          <IconButton className="cmpBillAlloc_button">
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <Box className="cmpBillAlloc_tableContainer">
        <div className="cmpBillAlloc_tableHeader">April - 24</div>
        <TableContainer>
          <Table className="cmpBillAlloc_table">
            <TableHead>
              <TableRow>
                <TableCell className="cmpBillAlloc_columnHeader">Application/ ProjectName</TableCell>
                <TableCell className="cmpBillAlloc_columnHeader">Owner Name</TableCell>
                <TableCell className="cmpBillAlloc_columnHeader">Total Bill</TableCell>
                <TableCell className="cmpBillAlloc_columnHeader">%Normalized Variation</TableCell>
                <TableCell className="cmpBillAlloc_columnHeader">%Raw Variation</TableCell>
                <TableCell className="cmpBillAlloc_columnHeader">Savings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="cmpBillAlloc_cell">{row.name}</TableCell>
                  <TableCell className="cmpBillAlloc_cell">{row.ownerName}</TableCell>
                  <TableCell className="cmpBillAlloc_cell">{row.totalBill}</TableCell>
                  <TableCell className="cmpBillAlloc_cell">{row.normalizedVariation}</TableCell>
                  <TableCell className="cmpBillAlloc_cell">{row.rawVariation}</TableCell>
                  <TableCell className="cmpBillAlloc_cell">{row.savings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default BillAllocation;
