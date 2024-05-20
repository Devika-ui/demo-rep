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
    width: '100%',
    maxWidth: 870,
    backgroundColor: 'white',
    padding: 20,
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: '1.5rem',
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  button: {
    fontSize: '0.8rem',
    padding: '6px 12px',
  },
});

const dummyData = [
  { name: 'Subscription 1', onDemandCost: '$100', reservedInstancesCost: '$200', simulatedPAYGO: '$150', savings: '$50', totalBill: '$400' },
  { name: 'Subscription 2', onDemandCost: '$120', reservedInstancesCost: '$180', simulatedPAYGO: '$130', savings: '$60', totalBill: '$490' },
  // Add more dummy data as needed
];

const InvoiceTableView = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Invoice View</h2>
        <div className={classes.buttons}>
          <IconButton color="primary" className={classes.button}>
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="primary" className={classes.button}>Customize Report</Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subscription/Account Name</TableCell>
              <TableCell colSpan={5} align="center">April - 24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>On Demand Cost</TableCell>
              <TableCell>Reserved Instances Cost</TableCell>
              <TableCell>Simpulated PAYGO</TableCell>
              <TableCell>Savings</TableCell>
              <TableCell>Total Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.onDemandCost}</TableCell>
                <TableCell>{row.reservedInstancesCost}</TableCell>
                <TableCell>{row.simulatedPAYGO}</TableCell>
                <TableCell>{row.savings}</TableCell>
                <TableCell>{row.totalBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceTableView;