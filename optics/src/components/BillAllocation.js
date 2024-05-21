import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: 500, // Fixed width
    height: 337, // Fixed height
    backgroundColor: 'white',
    padding: 10, // Adjusted padding
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // Prevent scrollbar
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0, // Remove margin between header and table
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: 0, // Remove bottom margin from title
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  button: {
    fontSize: '0.8rem',
    padding: '6px 12px',
  },
  table: {
    tableLayout: 'fixed', // Fixed table layout
  },
  cell: {
    padding: '4px 8px', // Reduce padding
    overflow: 'hidden',
    textAlign: 'center', // Center-align text
  },
  columnHeader: {
    textAlign: 'center',
    padding: '4px 8px', // Reduce padding
  },
});

const dummyData = [
  { name: 'Project 1', ownerName: 'Owner A', totalBill: '$400', normalizedVariation: '10%', rawVariation: '5%', savings: '$50' },
  { name: 'Project 2', ownerName: 'Owner B', totalBill: '$490', normalizedVariation: '8%', rawVariation: '6%', savings: '$60' },
  // Add more dummy data as needed
];

const BillAllocation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Bill Allocation</h2>
        <div className={classes.buttons}>
          <IconButton color="primary" className={classes.button}>
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="primary" className={classes.button}>Customize Report</Button>
        </div>
      </div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} align="center">April - 24</TableCell>
            </TableRow>
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
    </div>
  );
};

export default BillAllocation;
