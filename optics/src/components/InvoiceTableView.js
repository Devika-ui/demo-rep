import React from 'react';
import PropTypes from 'prop-types';
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
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
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
    whiteSpace: 'pre-wrap',
    paddingRight:"10px",

  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginTop: 10,
    alignItems: 'center', // Align buttons vertically in the center
  },
  button: {
    fontSize: '0.7rem',
    //padding: '4px 10px',
    color: '#63666A',
  },
  dropdown: {
    marginLeft: '-10px', // Adjust this value to move the dropdown left or right
    '& select': {
      height: 0,
      width: 50,
      fontSize: '0.9rem',
    },
  },
  tableCell: {
    color: '#63666A',
    fontSize: '0.8rem',
    padding: '13px 16px', // Adjusted padding for better spacing
    borderBottom: 'none', // Remove bottom border for cleaner look
    verticalAlign: 'top', // Align text to the top of the cell
    borderBottom: '1px solid black',
    borderTop: '1px solid Black',
    borderBlockEnd: '1px solid Black',
  },
  tableHeadCell: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    borderTop: '1px solid Black',
    borderRight: '1px solid Black',
    padding: '8px 16px', // Adjusted padding for better spacing
  },
  tableRow: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
    },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InvoiceTableView = ({
  title,
  dropdown,
  tableData,
  tableHeight,
  tableWidth,
  columns
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container} style={{ width: tableWidth, height: tableHeight }}>
      <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        <div>
          {dropdown}
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
              <TableCell className={classes.tableHeadCell} colSpan={columns.length}>
                April - 24
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className={classes.tableHeadCell}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} className={classes.tableRow}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={classes.tableCell}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

InvoiceTableView.propTypes = {
  title: PropTypes.string.isRequired,
  dropdown: PropTypes.element,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableHeight: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

InvoiceTableView.defaultProps = {
  tableHeight: 'auto',
  tableWidth: '94%',
};

export default InvoiceTableView;
