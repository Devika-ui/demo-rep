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
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  container: {
    width: 520, // Fixed width
    height: 337, // Fixed height
    backgroundColor: 'white',
    padding: 10, // Adjusted padding
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // Prevent scrollbar
  },
  header: {
    display: 'flex',
    flexDirection: 'column', // Use column direction to stack title and buttons
    marginBottom: 10, // Add margin between header and table
  },
  title: {
    fontFamily: 'Inter, sans-serif', // Font family
    fontSize: '16px', // Font size
    fontWeight: 700, // Font weight
    lineHeight: '19.36px', // Line height
    textAlign: 'left', // Text align
    color: '#63666A', // Text color
    marginBottom: '19px', // Add some space between title and buttons
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end', // Move buttons to the right
    gap: 10,
  },
  button: {
    fontSize: '0.7rem', // Reduce font size
    padding: '4px 8px', // Reduce padding
    color: '#63666A', // Button text color
    borderColor: '#63666A', // Button border color
  },
  tableContainer: {
    border: '1px solid #ddd', // Border around the table
    borderRadius: '0', // Rounded corners
    overflow: 'hidden', // Prevent overflow
  },
  tableHeader: {
    padding: '4px 8px', // Padding inside the box
    textAlign: 'center',
    color: '#63666A', // Text color
  },
  table: {
    tableLayout: 'fixed', // Fixed table layout
  },
  cell: {
    padding: '4px 8px', // Reduce padding
    overflow: 'hidden',
    textAlign: 'center', // Center-align text
    color: '#63666A', // Text color
  },
  columnHeader: {
    textAlign: 'center',
    padding: '4px 8px', // Reduce padding
    color: '#63666A', // Text color
    borderBottom: '2px solid #63666A', // Thicker bottom border
  },
  select: {
    fontSize: '0.7rem',
    padding: '2px 4px',
    color: '#63666A',
    borderColor: '#63666A',
    minWidth: 'auto',
    '& .MuiSelect-select': {
      padding: '2px 4px', // Ensuring the inner padding is reduced
    },
    '& .MuiOutlinedInput-input': {
      padding: '2px 4px', // Adjusting input padding
    },
  },
});

const dummyData = [
  { name: 'Project 1', ownerName: 'Owner A', totalBill: '$400', normalizedVariation: '10%', rawVariation: '5%', savings: '$50' },
  { name: 'Project 2', ownerName: 'Owner B', totalBill: '$490', normalizedVariation: '8%', rawVariation: '6%', savings: '$60' },
  { name: 'Project 3', ownerName: 'Owner C', totalBill: '$495', normalizedVariation: '10%', rawVariation: '8%', savings: '$70' },
  // Add more dummy data as needed
];

const BillAllocation = () => {
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
        
          <Button variant="contained" className={classes.button}>Customize Report</Button>
          <IconButton className={classes.button}>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <Box className={classes.tableContainer}>
        <div className={classes.tableHeader}>April - 24</div>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.columnHeader}>Application/ ProjectName</TableCell>
                <TableCell className={classes.columnHeader}>Owner Name</TableCell>
                <TableCell className={classes.columnHeader}>Total Bill</TableCell>
                <TableCell className={classes.columnHeader}>%Normalized Variation</TableCell>
                <TableCell className={classes.columnHeader}>%Raw Variation</TableCell>
                <TableCell className={classes.columnHeader}>Savings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.cell}>{row.name}</TableCell>
                  <TableCell className={classes.cell}>{row.ownerName}</TableCell>
                  <TableCell className={classes.cell}>{row.totalBill}</TableCell>
                  <TableCell className={classes.cell}>{row.normalizedVariation}</TableCell>
                  <TableCell className={classes.cell}>{row.rawVariation}</TableCell>
                  <TableCell className={classes.cell}>{row.savings}</TableCell>
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
