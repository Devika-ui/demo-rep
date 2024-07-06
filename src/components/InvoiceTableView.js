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
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    paddingRight: "10px",
  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    fontSize: '0.7rem',
    color: '#63666A',
  },
  dropdown: {
    marginLeft: '-10px',
    '& select': {
      height: 10,
      width: 50,
      fontSize: '0.9rem',
    },
  },
  tableCell: {
    color: '#63666A',
    fontSize: '0.8rem',
    padding: '13px 16px',
    verticalAlign: 'top',
    borderBottom: '1px solid black',
    borderTop: '1px solid black',
  },
  tableHeadCell: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    padding: '8px 16px',
  },
  tableContainer: {
    maxHeight: 300,
    overflowY: 'auto',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
  },
}));

const InvoiceTableView = ({
  title,
  dropdown,
  tableData,
  tableHeight,
  tableWidth,
  columns,
  headerLabel // new prop
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
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.tableHeadCell} ${classes.stickyHeader}`} colSpan={columns.length}>
                {headerLabel} {/* using the new prop */}
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className={`${classes.tableHeadCell} ${classes.stickyHeader}`}>{column.label}</TableCell>
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
  headerLabel: PropTypes.string // new prop type
};

InvoiceTableView.defaultProps = {
  tableHeight: 'auto',
  tableWidth: '94%',
  headerLabel: 'April - 24' // default value for the prop
};

export default InvoiceTableView;
