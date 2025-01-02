import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomizedReportButton from "./CustomizedReportButton";
import ShareButton from "./ShareButton";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import "../css/components/InvoiceTableView.css";

const InvoiceTableView = ({
  title,
  dropdown,
  tableData: initialTableData,
  tableHeight,
  tableWidth,
  columns,
  columnTitle,
  headerLabels,
  headerClass,
  overlayHeight,
  columnData,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [tableData, setTableData] = useState(initialTableData);
  const [sortState, setSortState] = useState({ field: null, direction: null });

  // Reset tableData to initialTableData on prop change
  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);

  // Define the columns to always exclude
  const alwaysExcludedColumns = [
    "ownerName",
    "simulatedPayGoCost",
    "normalizedVariation",
    "rawVariation",
  ];

  // Create sort options while always excluding the defined columns
  const sortOptions = columns
    .filter((column) => !alwaysExcludedColumns.includes(column.key))
    .map((column) => ({
      label: column.label.replace(/\s\(\$\)/g, ""), // Removes " ($)" from the label
      value: column.key.replace(/\s\(\$\)/g, ""), // Removes " ($)" from the key
    }));

  const handleOverlayOpen = () => {
    setOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setOverlayOpen(false);
  };
  const tableRef = useRef(null);
  const isHierarchical = false;

  const handleSortData = (field, direction) => {
    // Clone the table data
    const sortedData = [...tableData];

    sortedData.sort((a, b) => {
      // Find the dynamic key for the field in each object
      const dynamicKeyA =
        Object.keys(a).find((key) => key.startsWith(field)) || "";
      const dynamicKeyB =
        Object.keys(b).find((key) => key.startsWith(field)) || "";

      // Get the corresponding values
      const valueA = parseFloat(a[dynamicKeyA] ?? 0); // Convert to number or default to 0
      const valueB = parseFloat(b[dynamicKeyB] ?? 0);

      // Perform sorting
      if (direction === "asc") {
        return valueA - valueB;
      } else if (direction === "desc") {
        return valueB - valueA;
      }
      return 0;
    });

    console.log("Sorted Data:", sortedData); // Debugging output to verify the result
    setTableData(sortedData);
  };

  return (
    <>
      <div
        className="cmpInvTv_container"
        style={{ width: tableWidth, height: tableHeight }}
      >
        <div className={headerClass}>
          <h2 className="cmpInvTv_title">{title}</h2>
          <div>
            {dropdown}
            <CustomizedReportButton
              handleSortData={handleSortData}
              sortOptions={sortOptions}
              currentSort={sortState}
            />
            <ShareButton
              tableData={tableData}
              tableRef={tableRef}
              isHierarchical={isHierarchical}
            />
            <IconButton
              onClick={handleOverlayOpen}
              className="cmpInvTv_fullscreenButton"
            >
              <FullscreenIcon />
            </IconButton>
          </div>
        </div>
        <TableContainer
          ref={tableRef}
          className="cmpInvTv_tableContainer"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <Table id="mytable" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
                >
                  {columnTitle}
                </TableCell>
                {headerLabels.map((label, labelIndex) => (
                  <TableCell
                    key={labelIndex}
                    className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
                    colSpan={columns.length}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headerLabels.flatMap((_, labelIndex) =>
                  columns.map((column, colIndex) => (
                    <TableCell
                      key={`${labelIndex}-${colIndex}`}
                      className="cmpInvTv_tableHeadCell"
                    >
                      {column.label}
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="cmpInvTv_tableRow">
                  <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
                    {Array.isArray(columnData) && columnData.length > 0 ? (
                      <div>{columnData[rowIndex] || ""}</div>
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                  {headerLabels.flatMap((_, labelIndex) =>
                    columns.map((column, colIndex) => (
                      <TableCell
                        key={`${labelIndex}-${colIndex}`}
                        className={`cmpInvTv_tableCell ${
                          column.key === "ownerName"
                            ? "cmpInvTv_smallColumn"
                            : ""
                        }`}
                        title={
                          column.key === "ownerName"
                            ? row[`${column.key}_${labelIndex}`]
                            : ""
                        }
                      >
                        {row[`${column.key}_${labelIndex}`]}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isOverlayOpen && (
        <div className="overlay overlay-mode">
          <div className="overlay-content" style={{ height: overlayHeight }}>
            <IconButton className="close-overlay" onClick={handleOverlayClose}>
              <CloseIcon />
            </IconButton>
            <TableContainer className="cmpInvTv_tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
                    >
                      Subscription Name
                    </TableCell>
                    {headerLabels.map((label, labelIndex) => (
                      <TableCell
                        key={labelIndex}
                        className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
                        colSpan={columns.length}
                      >
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {headerLabels.flatMap((_, labelIndex) =>
                      columns.map((column, colIndex) => (
                        <TableCell
                          key={`${labelIndex}-${colIndex}`}
                          className="cmpInvTv_tableHeadCell"
                        >
                          {column.label}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="cmpInvTv_tableRow">
                      <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
                        {Array.isArray(columnData) && columnData.length > 0 ? (
                          <div>{columnData[rowIndex] || " "}</div>
                        ) : (
                          <span> ""</span>
                        )}
                      </TableCell>
                      {headerLabels.flatMap((_, labelIndex) =>
                        columns.map((column, colIndex) => (
                          <TableCell
                            key={`${labelIndex}-${colIndex}`}
                            className={`cmpInvTv_tableCell ${
                              column.key === "ownerName"
                                ? "cmpInvTv_smallColumn"
                                : ""
                            }`}
                            title={
                              column.key === "ownerName"
                                ? row[`${column.key}_${labelIndex}`]
                                : ""
                            }
                          >
                            {row[`${column.key}_${labelIndex}`]}
                          </TableCell>
                        ))
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

InvoiceTableView.propTypes = {
  title: PropTypes.string.isRequired,
  dropdown: PropTypes.element.isRequired,
  tableData: PropTypes.array.isRequired,
  tableHeight: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.array.isRequired,
  columnTitle: PropTypes.string,
  headerLabels: PropTypes.array,
  headerClass: PropTypes.string.isRequired,
  overlayHeight: PropTypes.string,
  columnData: PropTypes.array,
};

InvoiceTableView.defaultProps = {
  tableHeight: "auto",
  tableWidth: "100%",
  headerLabels: ["April - 24"],
  overlayHeight: "82vh",
};

export default InvoiceTableView;

// import React, { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import TableContainer from "@mui/material/TableContainer";
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import IconButton from "@mui/material/IconButton";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import CloseIcon from "@mui/icons-material/Close";
// import "../css/components/InvoiceTableView.css";
// import CustomizedReportButton from "./CustomizedReportButton";
// import ShareButton from "./ShareButton";

// const InvoiceTableView = ({
//   title,
//   dropdown,
//   tableData: initialTableData,
//   tableHeight,
//   tableWidth,
//   columns,
//   columnTitle,
//   headerLabels,
//   headerClass,
//   overlayHeight,
//   columnData,
// }) => {
//   const [isOverlayOpen, setOverlayOpen] = useState(false);
//   const [tableData, setTableData] = useState(initialTableData); // State for table data

//   // Define sorting options
//   const sortOptions = columns.map((column) => ({
//     label: column.label,
//     value: column.key,
//   }));

//   const onSortColumn = (field, direction) => {
//     const sortedData = [...tableData]; // Create a copy to sort
//     const columnPrefix = field; // Column prefix (e.g., "age" or "score")

//     sortedData.sort((rowA, rowB) => {
//       // Dynamically pick the first matching key
//       const keyA = Object.keys(rowA).find((key) =>
//         key.startsWith(columnPrefix)
//       );
//       const keyB = Object.keys(rowB).find((key) =>
//         key.startsWith(columnPrefix)
//       );

//       const valueA = rowA[keyA] || ""; // Fallback to empty string
//       const valueB = rowB[keyB] || "";

//       // Apply sorting logic
//       if (valueA < valueB) return direction === "asc" ? -1 : 1;
//       if (valueA > valueB) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setTableData(sortedData); // Update state
//   };

//   const handleOverlayOpen = () => {
//     setOverlayOpen(true);
//   };

//   const handleOverlayClose = () => {
//     setOverlayOpen(false);
//   };

//   const tableRef = useRef(null);

//   return (
//     <>
//       <div
//         className="cmpInvTv_container"
//         style={{ width: tableWidth, height: tableHeight }}
//       >
//         <div className={headerClass}>
//           <h2 className="cmpInvTv_title">{title}</h2>
//           <div>
//             {dropdown}
//             <CustomizedReportButton
//               onSortColumn={onSortColumn}
//               sortOptions={sortOptions}
//             />
//             <ShareButton tableData={tableData} tableRef={tableRef} />

//             <IconButton
//               onClick={handleOverlayOpen}
//               className="cmpInvTv_fullscreenButton"
//             >
//               <FullscreenIcon />
//             </IconButton>
//           </div>
//         </div>
//         <TableContainer
//           ref={tableRef}
//           className="cmpInvTv_tableContainer"
//           style={{
//             backgroundColor: "#fff",
//           }}
//         >
//           <Table id="mytable" stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   rowSpan={2}
//                   className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
//                 >
//                   {columnTitle}
//                 </TableCell>
//                 {headerLabels.map((label, labelIndex) => (
//                   <TableCell
//                     key={labelIndex}
//                     className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
//                     colSpan={columns.length}
//                   >
//                     {label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {headerLabels.flatMap((_, labelIndex) =>
//                   columns.map((column, colIndex) => (
//                     <TableCell
//                       key={`${labelIndex}-${colIndex}`}
//                       className="cmpInvTv_tableHeadCell"
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((row, rowIndex) => (
//                 <TableRow key={rowIndex} className="cmpInvTv_tableRow">
//                   <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
//                     {Array.isArray(columnData) && columnData.length > 0 ? (
//                       <div>{columnData[rowIndex] || ""}</div>
//                     ) : (
//                       <span></span>
//                     )}
//                   </TableCell>
//                   {headerLabels.flatMap((_, labelIndex) =>
//                     columns.map((column, colIndex) => (
//                       <TableCell
//                         key={`${labelIndex}-${colIndex}`}
//                         className={`cmpInvTv_tableCell ${
//                           column.key === "ownerName"
//                             ? "cmpInvTv_smallColumn"
//                             : ""
//                         }`}
//                         title={
//                           column.key === "ownerName"
//                             ? row[`${column.key}_${labelIndex}`]
//                             : ""
//                         }
//                       >
//                         {row[`${column.key}_${labelIndex}`]}
//                       </TableCell>
//                     ))
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//       {isOverlayOpen && (
//         <div className="overlay overlay-mode">
//           <div className="overlay-content" style={{ height: overlayHeight }}>
//             <IconButton className="close-overlay" onClick={handleOverlayClose}>
//               <CloseIcon />
//             </IconButton>
//             <TableContainer className="cmpInvTv_tableContainer">
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       rowSpan={2}
//                       className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
//                     >
//                       Subscription Name
//                     </TableCell>
//                     {headerLabels.map((label, labelIndex) => (
//                       <TableCell
//                         key={labelIndex}
//                         className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
//                         colSpan={columns.length}
//                       >
//                         {label}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                   <TableRow>
//                     {headerLabels.flatMap((_, labelIndex) =>
//                       columns.map((column, colIndex) => (
//                         <TableCell
//                           key={`${labelIndex}-${colIndex}`}
//                           className="cmpInvTv_tableHeadCell"
//                         >
//                           {column.label}
//                         </TableCell>
//                       ))
//                     )}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {tableData.map((row, rowIndex) => (
//                     <TableRow key={rowIndex} className="cmpInvTv_tableRow">
//                       <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
//                         {Array.isArray(columnData) && columnData.length > 0 ? (
//                           <div>{columnData[rowIndex] || " "}</div>
//                         ) : (
//                           <span> ""</span>
//                         )}
//                       </TableCell>
//                       {headerLabels.flatMap((_, labelIndex) =>
//                         columns.map((column, colIndex) => (
//                           <TableCell
//                             key={`${labelIndex}-${colIndex}`}
//                             className={`cmpInvTv_tableCell ${
//                               column.key === "ownerName"
//                                 ? "cmpInvTv_smallColumn"
//                                 : ""
//                             }`}
//                             title={
//                               column.key === "ownerName"
//                                 ? row[`${column.key}_${labelIndex}`]
//                                 : ""
//                             }
//                           >
//                             {row[`${column.key}_${labelIndex}`]}
//                           </TableCell>
//                         ))
//                       )}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// InvoiceTableView.propTypes = {
//   title: PropTypes.string.isRequired,
//   dropdown: PropTypes.element.isRequired,
//   tableData: PropTypes.array.isRequired,
//   tableHeight: PropTypes.string,
//   tableWidth: PropTypes.string,
//   columns: PropTypes.array.isRequired,
//   columnTitle: PropTypes.string,
//   headerLabels: PropTypes.array,
//   headerClass: PropTypes.string.isRequired,
//   overlayHeight: PropTypes.string,
//   columnData: PropTypes.array,
// };

// InvoiceTableView.defaultProps = {
//   tableHeight: "auto",
//   tableWidth: "100%",
//   headerLabels: ["April - 24"],
//   overlayHeight: "82vh",
// };

// export default InvoiceTableView;
