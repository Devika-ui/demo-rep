import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  container: {
    width: 560,
    height: 400,
    marginLeft: -510,
    marginTop: 12,
    backgroundColor: "white",
    padding: 10,
    border: "1px solid #ddd",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "19.36px",
    textAlign: "left",
    color: "#63666A",
    marginBottom: 8,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    fontSize: "0.7rem",
    padding: "4px 8px",
    color: "#63666A",
    borderColor: "#63666A",
  },
  tableContainer: {
    border: "1px solid #ddd",
    borderRadius: "0",
    overflow: "hidden",
  },
  tableHeader: {
    padding: "4px 8px",
    textAlign: "center",
    color: "#63666A",
  },
  table: {
    tableLayout: "fixed",
  },
  nestedRow: {
    backgroundColor: "#f9f9f9",
  },
  cell: {
    padding: "4px 8px",
    overflow: "hidden",
    textAlign: "center",
    color: "#63666A",
    borderRight: "1px solid #ddd",
  },
  columnHeader: {
    textAlign: "center",
    padding: "4px 8px",
    color: "#63666A",
    borderBottom: "2px solid #63666A",
  },
  indentedCell: {
    fontSize: "0.8rem",
  },
});

const orphanedData = [
  {
    name: "Subscription 1",
    totalCost: "$1000",
    countOfDisks: 50,
    environment: "Production",
    children: [
      {
        name: "Storage",
        totalCost: "$500",
        countOfDisks: 30,
        environment: "Production",
        children: [
          {
            name: "Premium LRS",
            totalCost: "$300",
            countOfDisks: 20,
            environment: "Production",
            children: [
              {
                name: "Resource Group 1",
                totalCost: "$200",
                countOfDisks: 10,
                environment: "Production",
                children: [
                  {
                    name: "Resource 1",
                    totalCost: "$100",
                    countOfDisks: 5,
                    environment: "Production",
                  },
                  {
                    name: "Resource 2",
                    totalCost: "$100",
                    countOfDisks: 5,
                    environment: "Production",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more data here as needed
  {
    name: "Subscription 2",
    totalCost: "$1500",
    countOfDisks: 70,
    environment: "Development",
    children: [
      {
        name: "Storage",
        totalCost: "$800",
        countOfDisks: 40,
        environment: "Development",
        children: [
          {
            name: "Standard LRS",
            totalCost: "$400",
            countOfDisks: 25,
            environment: "Development",
            children: [
              {
                name: "Resource Group 2",
                totalCost: "$250",
                countOfDisks: 15,
                environment: "Development",
                children: [
                  {
                    name: "Resource 3",
                    totalCost: "$150",
                    countOfDisks: 8,
                    environment: "Development",
                  },
                  {
                    name: "Resource 4",
                    totalCost: "$100",
                    countOfDisks: 7,
                    environment: "Development",
                  },
                ],
              },
              {
                name: "Resource Group 3",
                totalCost: "$150",
                countOfDisks: 10,
                environment: "Development",
                children: [
                  {
                    name: "Resource 5",
                    totalCost: "$80",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                  {
                    name: "Resource 6",
                    totalCost: "$70",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
}) => {
  const classes = useStyles();
  const indentLevel = level * indentIncrement;

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className={classes.nestedRow}>
            <TableCell
              style={{ paddingLeft: indentLevel }}
              className={classes.cell}
            >
              {item.children ? (
                <IconButton
                  size="small"
                  onClick={() => toggleRow(rowKey, index)}
                >
                  {expandedRows[rowKey]?.[index] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              ) : null}
              {item.name}
            </TableCell>
            <TableCell className={classes.cell}>{item.totalCost}</TableCell>
            <TableCell className={classes.cell}>{item.countOfDisks}</TableCell>
            <TableCell className={classes.cell}>{item.environment}</TableCell>
          </TableRow>
          {expandedRows[rowKey]?.[index] && (
            <TableRowComponent
              data={item.children || []}
              level={level + 1}
              toggleRow={toggleRow}
              expandedRows={expandedRows}
              rowKey={`${rowKey}-${index}`}
              indentIncrement={indentIncrement}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const TableforOrphaned = () => {
  const classes = useStyles();
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rowKey, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [index]: !prev[rowKey]?.[index],
      },
    }));
  };

  const indentIncrement = 30;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>
          On-Demand Cost Allocation for Orphaned Snapshots
        </h2>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.button}>
            Customize Report
          </Button>
          <IconButton className={classes.button}>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <Box className={classes.tableContainer}>
        <div className={classes.tableHeader}>April - 24</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.columnHeader}>
                  Application/Project Name
                </TableCell>
                <TableCell className={classes.columnHeader}>
                  Owner Name
                </TableCell>
                <TableCell className={classes.columnHeader}>
                  Total Cost
                </TableCell>
                <TableCell className={classes.columnHeader}>
                  Count of Disks
                </TableCell>
                <TableCell className={classes.columnHeader}>
                  Environment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowComponent
                data={orphanedData}
                level={0}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey="category"
                indentIncrement={indentIncrement}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TableforOrphaned;
