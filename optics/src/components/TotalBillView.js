import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '90%',
    maxWidth: 800,
    height: 'auto',
    backgroundColor: 'white',
    padding: 16,
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: '1.2rem',
    color: '#63666A',
  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginTop: 10,
  },
  button: {
    fontSize: '0.7rem',
    padding: '4px 10px',
    color: '#63666A',
  },
  select: {
    fontSize: '0.8rem',
    padding: '8px',
    color: '#63666A',
  },
  tableCell: {
    color: '#63666A',
    fontSize: '0.8rem',
    padding: '8px 16px', // Adjusted padding for better spacing
    borderBottom: '1px solid black', // Horizontal border only
    borderTop: '1px solid black', 
    verticalAlign: 'top', // Align text to the top of the cell
    borderLeft : '1px solid black',
    borderRight : '1px solid Black',
   
  },
  tableHeadCell: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderTop: '1px solid black', // Horizontal border only
    borderBottom: '1px solid black', // Horizontal border only
    borderLeft : '1px solid black',
    borderRight : '1px solid Black',
    padding: '8px 16px', // Adjusted padding for better spacing
  },
  tableRow: {
    '&:last-child td': { // Remove bottom border for the last row
    },
  },
});

const dummyData = [
  { name: 'Subscription 1', onDemandCost: '$100', reservedInstancesCost: '$200', simulatedPAYGO: '$150', savings: '$50', totalBill: '$400' },
  { name: 'Subscription 2', onDemandCost: '$120', reservedInstancesCost: '$180', simulatedPAYGO: '$130', savings: '$60', totalBill: '$490' },
  // Add more dummy data as needed
];

const TotalBillView = () => {
  const classes = useStyles();
  const [groupBy, setGroupBy] = useState('');

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Total Bill Allocation across Application/Project</h2>
        <div className={classes.buttons}>
          <Select
            value={groupBy}
            onChange={handleGroupByChange}
            displayEmpty
            className={classes.select}
          >
            <MenuItem value="">Group by Application</MenuItem>
            <MenuItem value="app1">Application 1</MenuItem>
            <MenuItem value="app2">Application 2</MenuItem>
            <MenuItem value="app3">Application 3</MenuItem>
            {/* Add more MenuItem components as needed */}
          </Select>
          <IconButton color="#f0f0f0" className={classes.button}>
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="#f0f0f0" className={classes.button}>Customize Report</Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
          <TableCell className={classes.tableHeadCell} colSpan={6}>
                April - 24
              </TableCell>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Subscription Name</TableCell>
              <TableCell className={classes.tableHeadCell}>On Demand Cost</TableCell>
              <TableCell className={classes.tableHeadCell}>Reserved Instances Cost</TableCell>
              <TableCell className={classes.tableHeadCell}>Simulated PAYGO</TableCell>
              <TableCell className={classes.tableHeadCell}>Savings</TableCell>
              <TableCell className={classes.tableHeadCell}>Total Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                <TableCell className={classes.tableCell}>{row.onDemandCost}</TableCell>
                <TableCell className={classes.tableCell}>{row.reservedInstancesCost}</TableCell>
                <TableCell className={classes.tableCell}>{row.simulatedPAYGO}</TableCell>
                <TableCell className={classes.tableCell}>{row.savings}</TableCell>
                <TableCell className={classes.tableCell}>{row.totalBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TotalBillView;
