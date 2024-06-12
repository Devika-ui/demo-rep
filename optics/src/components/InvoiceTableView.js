import React, { useEffect, useState } from 'react';
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
import api from '../api.js'; // Adjust the path as needed

const useStyles = makeStyles({
  container: {
    width: '94%',
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
  tableCell: {
    color: '#63666A',
    fontSize: '0.8rem',
    padding: '13px 16px',
    borderBottom: 'none',
    verticalAlign: 'top',
    borderBottom : '1px solid black',
    borderTop : '1px solid Black',
    borderBlockEnd : '1px solid Black',
  },
  tableHeadCell: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderBottom: '1px solid black',
    borderLeft : '1px solid black',
    borderTop : '1px solid Black',
    borderRight : '1px solid Black',
    padding: '8px 16px',
  },
  tableRow: {},
});

const InvoiceTableView = () => {
  const classes = useStyles();
  const [invoiceData, setInvoiceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const data = await api.getInvoiceView();
        console.log('Fetched invoice data:', data);
        setInvoiceData(data);
      } catch (error) {
        console.error('Error in useEffect:', error);
        setError(error);
      }
    };

    fetchInvoiceData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Invoice View</h2>
        <div className={classes.buttons}>
          <IconButton className={classes.button}>
            <ShareIcon />
          </IconButton>
          <Button variant="contained" className={classes.button}>Customize Report</Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} colSpan={6}>
                April - 24
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>Subscription/Account Name</TableCell>
              <TableCell className={classes.tableCell}>On Demand Cost</TableCell>
              <TableCell className={classes.tableCell}>Reserved Instances Cost</TableCell>
              <TableCell className={classes.tableCell}>Simulated PAYGO</TableCell>
              <TableCell className={classes.tableCell}>Savings</TableCell>
              <TableCell className={classes.tableCell}>Total Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((row, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{row.Subscription}</TableCell>
                <TableCell className={classes.tableCell}>${row.OnDemandCost}</TableCell>
                <TableCell className={classes.tableCell}>${row.ReservedInstancesCost}</TableCell>
                <TableCell className={classes.tableCell}>${row.SimulatedPAYGO}</TableCell>
                <TableCell className={classes.tableCell}>${row.Savings}</TableCell>
                <TableCell className={classes.tableCell}>${row.TotalBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceTableView;
