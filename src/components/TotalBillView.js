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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "../css/components/TotalBillView.css"


const dummyData = [
  { name: 'Subscription 1', onDemandCost: '$100', reservedInstancesCost: '$200', simulatedPAYGO: '$150', savings: '$50', totalBill: '$400' },
  { name: 'Subscription 2', onDemandCost: '$120', reservedInstancesCost: '$180', simulatedPAYGO: '$130', savings: '$60', totalBill: '$490' },
  // Add more dummy data as needed
];

const TotalBillView = () => {
  const [groupBy, setGroupBy] = useState('');

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className="cmpTBV_container">
      <div className="cmpTBV_header">
        <h2 className="cmpTBV_title">Total Bill Allocation across Application/Project</h2>
        <div className="cmpTBV_buttons">
          <Select
            value={groupBy}
            onChange={handleGroupByChange}
            displayEmpty
            className="cmpTBV_select"
          >
            <MenuItem value="">Group by Application</MenuItem>
            <MenuItem value="app1">Application 1</MenuItem>
            <MenuItem value="app2">Application 2</MenuItem>
            <MenuItem value="app3">Application 3</MenuItem>
            {/* Add more MenuItem components as needed */}
          </Select>
          <IconButton color="#f0f0f0" className="cmpTBV_button">
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="inherit" className="cmpTBV_button">Customize Report</Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
          <TableCell className="cmpTBV_tableHeadCell" colSpan={6}>
                April - 24
              </TableCell>
            <TableRow>
              <TableCell className="cmpTBV_tableHeadCell">Subscription Name</TableCell>
              <TableCell className="cmpTBV_tableHeadCell">On Demand Cost</TableCell>
              <TableCell className="cmpTBV_tableHeadCell">Reserved Instances Cost</TableCell>
              <TableCell className="cmpTBV_tableHeadCell">Simulated PAYGO</TableCell>
              <TableCell className="cmpTBV_tableHeadCell">Savings</TableCell>
              <TableCell className="cmpTBV_tableHeadCell">Total Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index} className="cmpTBV_tableRow">
                <TableCell className="cmpTBV_tableCell">{row.name}</TableCell>
                <TableCell className="cmpTBV_tableCell">{row.onDemandCost}</TableCell>
                <TableCell className="cmpTBV_tableCell">{row.reservedInstancesCost}</TableCell>
                <TableCell className="cmpTBV_tableCell">{row.simulatedPAYGO}</TableCell>
                <TableCell className="cmpTBV_tableCell">{row.savings}</TableCell>
                <TableCell className="cmpTBV_tableCell">{row.totalBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TotalBillView;
