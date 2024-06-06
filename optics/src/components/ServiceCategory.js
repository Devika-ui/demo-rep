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
 
// const dummyData = [
//   {
//     name: "Virtual Machine",
//     totalBill: "$400",
//     onDemandCost: "$100",
//     commitmentsCost: "$200",
//     savings: "$50",
//     services: [
//       {
//         name: "VM1",
//         totalBill: "$200",
//         onDemandCost: "$50",
//         commitmentsCost: "$100",
//         savings: "$25",
//         resourceGroups: [
//           {
//             name: "RG1",
//             totalBill: "$100",
//             onDemandCost: "$25",
//             commitmentsCost: "$50",
//             savings: "$12.5",
//             resources: [
//               {
//                 name: "VM1-Resource1",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//               {
//                 name: "VM1-Resource2",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//             ],
//           },
//           {
//             name: "RG2",
//             totalBill: "$100",
//             onDemandCost: "$25",
//             commitmentsCost: "$50",
//             savings: "$12.5",
//             resources: [
//               {
//                 name: "VM2-Resource1",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//               {
//                 name: "VM2-Resource2",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "VM2",
//         totalBill: "$200",
//         onDemandCost: "$50",
//         commitmentsCost: "$100",
//         savings: "$25",
//         resourceGroups: [
//           {
//             name: "RG3",
//             totalBill: "$100",
//             onDemandCost: "$25",
//             commitmentsCost: "$50",
//             savings: "$12.5",
//             resources: [
//               {
//                 name: "VM3-Resource1",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//               {
//                 name: "VM3-Resource2",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//             ],
//           },
//           {
//             name: "RG4",
//             totalBill: "$100",
//             onDemandCost: "$25",
//             commitmentsCost: "$50",
//             savings: "$12.5",
//             resources: [
//               {
//                 name: "VM4-Resource1",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//               {
//                 name: "VM4-Resource2",
//                 totalBill: "$50",
//                 onDemandCost: "$12.5",
//                 commitmentsCost: "$25",
//                 savings: "$6.25",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Storage",
//     totalBill: "$300",
//     onDemandCost: "$120",
//     commitmentsCost: "$180",
//     savings: "$60",
//     services: [
//       {
//         name: "Storage1",
//         totalBill: "$150",
//         onDemandCost: "$60",
//         commitmentsCost: "$90",
//         savings: "$30",
//         resourceGroups: [
//           {
//             name: "RG5",
//             totalBill: "$75",
//             onDemandCost: "$30",
//             commitmentsCost: "$45",
//             savings: "$15",
//             resources: [
//               {
//                 name: "Storage1-Resource1",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//               {
//                 name: "Storage1-Resource2",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//             ],
//           },
//           {
//             name: "RG6",
//             totalBill: "$75",
//             onDemandCost: "$30",
//             commitmentsCost: "$45",
//             savings: "$15",
//             resources: [
//               {
//                 name: "Storage2-Resource1",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//               {
//                 name: "Storage2-Resource2",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Storage2",
//         totalBill: "$150",
//         onDemandCost: "$60",
//         commitmentsCost: "$90",
//         savings: "$30",
//         resourceGroups: [
//           {
//             name: "RG7",
//             totalBill: "$75",
//             onDemandCost: "$30",
//             commitmentsCost: "$45",
//             savings: "$15",
//             resources: [
//               {
//                 name: "Storage3-Resource1",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//               {
//                 name: "Storage3-Resource2",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//             ],
//           },
//           {
//             name: "RG8",
//             totalBill: "$75",
//             onDemandCost: "$30",
//             commitmentsCost: "$45",
//             savings: "$15",
//             resources: [
//               {
//                 name: "Storage4-Resource1",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//               {
//                 name: "Storage4-Resource2",
//                 totalBill: "$37.5",
//                 onDemandCost: "$15",
//                 commitmentsCost: "$22.5",
//                 savings: "$7.5",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
 
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
              className={classes.tableCell}
            >
              {item.services || item.resourceGroups || item.resources ? (
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
            {Object.keys(item)
              .filter(
                (key) =>
                  key !== "name" &&
                  key !== "services" &&
                  key !== "resourceGroups" &&
                  key !== "resources"
              )
              .map((key, cellIndex) => (
                <TableCell key={cellIndex} className={classes.cell}>
                  {item[key]}
                </TableCell>
              ))}
            {/*
            <TableCell className={classes.cell}>{item.totalBill}</TableCell>
 
            <TableCell className={classes.cell}>{item.onDemandCost}</TableCell>
 
            <TableCell className={classes.cell}>
              {item.commitmentsCost}
            </TableCell>
 
            <TableCell className={classes.cell}>{item.savings}</TableCell> */}
          </TableRow>
 
          {expandedRows[rowKey]?.[index] && (
            <TableRowComponent
              data={
                item.services || item.resourceGroups || item.resources || []
              }
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
 
const ServiceCategory = ({ dummyData, tableData, height, width }) => {
  const classes = useStyles();
  const headers = Object.keys(tableData[0]).filter((key) =>
    key.startsWith("columnHead")
  );
 
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
    <div className={classes.container} style={{ height: height, width: width }}>
      <div className={classes.header}>
        <h2 className={classes.title}>{tableData[0].tableTitle}</h2>
 
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
              {/* <TableRow>
                <TableCell className={classes.columnHeader}>
                  {tableData[0].columnHead1}
                </TableCell>
 
                <TableCell className={classes.columnHeader}>
                  {tableData[0].columnHead2}
                </TableCell>
 
                <TableCell className={classes.columnHeader}>
                  {tableData[0].columnHead3}
                </TableCell>
 
                <TableCell className={classes.columnHeader}>
                  {tableData[0].columnHead4}
                </TableCell>
 
                <TableCell className={classes.columnHeader}>
                  {tableData[0].columnHead5}
                </TableCell>
              </TableRow> */}
              <TableRow>
                {headers.map((headerKey, index) => (
                  <TableCell key={index} className={classes.columnHeader}>
                    {tableData[0][headerKey]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
 
            <TableBody>
              <TableRowComponent
                data={dummyData}
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
 
export default ServiceCategory;