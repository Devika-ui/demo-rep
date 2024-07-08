import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import "../css/components/ServiceCategory.css" 

 
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
 
  const indentLevel = level * indentIncrement;
 
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpSvcCat_nestedRow">
            <TableCell
              style={{ paddingLeft: indentLevel }}
              className="cmpSvcCat_tableCell"
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
                <TableCell key={cellIndex} className="cmpSvcCat_cell">
                  {item[key]}
                </TableCell>
              ))}
            {/*
            <TableCell className="cmpSvcCat_cell">{item.totalBill}</TableCell>
 
            <TableCell className="cmpSvcCat_cell">{item.onDemandCost}</TableCell>
 
            <TableCell className="cmpSvcCat_cell">
              {item.commitmentsCost}
            </TableCell>
 
            <TableCell className="cmpSvcCat_cell">{item.savings}</TableCell> */}
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
    <div className="cmpSvcCat_container" style={{ height: height, width: width }}>
      <div className="cmpSvcCat_header">
        <h2 className="cmpSvcCat_title">{tableData[0].tableTitle}</h2>
 
        <div className="cmpSvcCat_buttons">
          <Button variant="contained" className="cmpSvcCat_button" color="inherit">
            Customize Report
          </Button>
 
          <IconButton className="cmpSvcCat_button">
            <ShareIcon />
          </IconButton>
        </div>
      </div>
 
      <Box className="cmpSvcCat_tableContainer">
        <div className="cmpSvcCat_tableHeader">April - 24</div>
 
        <TableContainer>
          <Table>
            <TableHead>
              {/* <TableRow>
                <TableCell className="cmpSvcCat_columnHeader">
                  {tableData[0].columnHead1}
                </TableCell>
 
                <TableCell className="cmpSvcCat_columnHeader">
                  {tableData[0].columnHead2}
                </TableCell>
 
                <TableCell className="cmpSvcCat_columnHeader">
                  {tableData[0].columnHead3}
                </TableCell>
 
                <TableCell className="cmpSvcCat_columnHeader">
                  {tableData[0].columnHead4}
                </TableCell>
 
                <TableCell className="cmpSvcCat_columnHeader">
                  {tableData[0].columnHead5}
                </TableCell>
              </TableRow> */}
              <TableRow>
                {headers.map((headerKey, index) => (
                  <TableCell key={index} className="cmpSvcCat_columnHeader">
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