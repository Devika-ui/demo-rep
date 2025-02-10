import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import TableChartIcon from "@mui/icons-material/TableChart";
import LinkIcon from "@mui/icons-material/Link";
import TeamsIcon from "@mui/icons-material/Chat";
import PowerPointIcon from "@mui/icons-material/Slideshow";
import DownloadIcon from "@mui/icons-material/Download";
import PptxGenJS from "pptxgenjs";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../css/components/ShareButton.css";
import * as XLSX from "xlsx";

const ShareButton = ({
  tableData,
  tableRef,
  isHierarchical,
  dataType,
  className,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [exportAnchorEl, setExportAnchorEl] = React.useState(null);
  const [csvMenuAnchorEl, setCsvMenuAnchorEl] = React.useState(null);

  const aggregateValues = (children) => {
    // Aggregate values recursively for child nodes
    return children.reduce(
      (totals, child) => {
        if (child.children && child.children.length > 0) {
          // Recursively aggregate values from descendants
          const childTotals = aggregateValues(child.children);
          totals.TotalBill += childTotals.TotalBill;
          totals.OnDemandCost += childTotals.OnDemandCost;
          totals.CommitmentsCost += childTotals.CommitmentsCost;
          totals.Savings += childTotals.Savings || 0;
        } else {
          // Leaf node: Add values directly
          totals.TotalBill += child.TotalBill || 0;
          totals.OnDemandCost += child.OnDemandCost || 0;
          totals.CommitmentsCost += child.CommitmentsCost || 0;
          totals.Savings += child.Savings || 0;
        }
        return totals;
      },
      { TotalBill: 0, OnDemandCost: 0, CommitmentsCost: 0, Savings: 0 }
    );
  };

  const flattenHierarchicalData = (data) => {
    return data
      .filter((row) => row.type === "category")
      .map((category) => {
        // Aggregate values for the category
        const aggregatedValues = aggregateValues(category.children || []);
        return {
          name: category.name,
          TotalBill: aggregatedValues.TotalBill,
          OnDemandCost: aggregatedValues.OnDemandCost,
          CommitmentsCost: aggregatedValues.CommitmentsCost,
          Savings: aggregatedValues.Savings,
        };
      });
  };

  const getMaxDepth = (node) => {
    if (!node.children || node.children.length === 0) {
      return 1;
    }
    return 1 + Math.max(...node.children.map(getMaxDepth));
  };

  const flattenHierarchyToColumns = (
    node,
    levels = [],
    levelIndex = 0,
    maxDepth = 0
  ) => {
    const rows = [];
    const columns = ["TotalBill", "OnDemandCost", "CommitmentsCost", "Savings"];

    // Ensure the levels array is extended to match the max depth
    const currentLevels = [...levels];
    currentLevels[levelIndex] = node.name;

    // Fill empty levels to match max depth
    const row = {
      ...Array.from({ length: maxDepth }).reduce(
        (acc, _, index) => ({
          ...acc,
          [`Level${index + 1}`]: currentLevels[index] || "",
        }),
        {}
      ),
      ...columns.reduce((acc, col) => ({ ...acc, [col]: node[col] || 0 }), {}),
    };
    rows.push(row);

    // Process children recursively
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        rows.push(
          ...flattenHierarchyToColumns(
            child,
            currentLevels,
            levelIndex + 1,
            maxDepth
          )
        );
      });
    }

    return rows;
  };

  const generateSummarizedCsvWithLevels = (data) => {
    const maxDepth = Math.max(...data.map(getMaxDepth)); // Calculate max depth of hierarchy
    const rows = data.flatMap((node) =>
      flattenHierarchyToColumns(node, [], 0, maxDepth)
    );

    // Dynamically generate headers based on levels and fixed columns
    const levelHeaders = Array.from(
      { length: maxDepth },
      (_, index) => `Level${index + 1}`
    );
    const valueHeaders = [
      "TotalBill",
      "OnDemandCost",
      "CommitmentsCost",
      "Savings",
    ];
    const headers = [...levelHeaders, ...valueHeaders];

    // Build CSV content
    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) =>
        headers.map((header) => `"${row[header] || ""}"`).join(",")
      ), // Data rows
    ];

    return csvContent.join("\n");
  };

  const flattenHierarchy = (node, level = 0, parentPath = "") => {
    const rows = [];
    const columns = ["TotalBill", "OnDemandCost", "CommitmentsCost", "Savings"];

    // Create a row for the current node
    const row = {
      Level: level,
      Path: parentPath ? `${parentPath} > ${node.name}` : node.name,
      ...columns.reduce((acc, col) => ({ ...acc, [col]: node[col] || 0 }), {}),
    };
    rows.push(row);

    // Process children recursively
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        rows.push(...flattenHierarchy(child, level + 1, row.Path));
      });
    }

    return rows;
  };

  // Function to handle CSV generation for currentLayout  hierarchical data
  function generateCurrentLayoutCsv(tableData) {
    let csvContent = [];

    const flattenedData = flattenHierarchicalData(tableData);
    const newHeaders = [
      "Name",
      "TotalBill",
      "OnDemandCost",
      "CommitmentsCost",
      "Savings",
    ];
    csvContent = [
      newHeaders.join(","), // Add headers as the first row
      ...flattenedData.map((row) =>
        [
          row.name,
          row.TotalBill,
          row.OnDemandCost,
          row.CommitmentsCost,
          row.Savings,
        ]
          .map((val) => `"${val}"`) // Escape values
          .join(",")
      ),
    ];

    return csvContent;
  }

  const open = Boolean(anchorEl);
  const exportOpen = Boolean(exportAnchorEl);
  const csvMenuOpen = Boolean(csvMenuAnchorEl);

  const handleMainMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMainMenuClose = () => {
    setAnchorEl(null);
    setExportAnchorEl(null);
    setCsvMenuAnchorEl(null);
  };
  const handleExportMenuClick = (event) =>
    setExportAnchorEl(event.currentTarget);
  const handleExportMenuClose = () => setExportAnchorEl(null);

  const handleCsvMenuClick = (event) => setCsvMenuAnchorEl(event.currentTarget);
  const handleCsvMenuClose = () => setCsvMenuAnchorEl(null);

  const handleDownload = () => {
    const tableElement = tableRef.current;

    if (!tableElement) return;

    html2canvas(tableElement).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "table-data.png";
      link.click();
    });
  };

  const handleLinkToVisual = () => {
    const baseUrl = window.location.origin;
    const visualPath = "/visual";
    const queryParams = new URLSearchParams({ filter: "active" });

    const link = `${baseUrl}${visualPath}?${queryParams.toString()}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleOpenInPowerPoint = () => {
    const pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    const rowsPerSlide = 4;
    const rowHeight = 1.1;
    const fontSize = 15;
    const rowSpacing = 15;

    let currentY = 1;

    for (let i = 0; i < tableData.length; i++) {
      if (i > 0 && i % rowsPerSlide === 0) {
        slide = pptx.addSlide();
        currentY = 1;
      }

      slide.addText(JSON.stringify(tableData[i]), {
        x: 1,
        y: currentY,
        fontSize: fontSize,
        color: "000000",
        maxWidth: 9,
        lineSpacing: rowSpacing,
        align: "left",
        valign: "top",
      });

      currentY += rowHeight;
    }

    pptx.writeFile("table-data.pptx");
  };

  const handleChatInTeams = () => {
    const message =
      "Here is the table data: \n" + JSON.stringify(tableData, null, 2);
    navigator.clipboard.writeText(message).then(() => {
      alert("Data copied to clipboard! Paste it in Microsoft Teams.");
    });
  };

  const generateCurrentLayoutCsvCI = (tableData) => {
    const headers = [
      "Name",
      "Type",
      "TotalBill",
      "OnDemandCost",
      "MarketPurachseCost",
      "ReservationCost",
      "SavingsPlanCost",
    ];

    const csvContent = [
      headers.join(","),
      ...tableData.flatMap((row) => {
        const monthEntries = Object.entries(row).filter(
          ([key]) => key !== "name" && key !== "type"
        );

        return monthEntries.map(([monthName, monthData]) => {
          return [
            row.name,
            row.type,
            monthData.TotalBill || 0,
            monthData.OnDemandCost || 0,
            monthData.SavingsPlanCost || 0,
            monthData.RerservationCost || 0,
            monthData.MarketPurchaseCost || 0,
          ]
            .map((val) => `"${val}"`)
            .join(",");
        });
      }),
    ];

    return csvContent;
  };

  const flattenData = (data, result = [], parentName = "", parentType = "") => {
    data.forEach((item) => {
      if (item.type === "month") {
        // Add the month data along with its parent resource name and type
        result.push({
          name: parentName, // Resource name
          type: parentType, // Resource type
          ...item, // Spread month-specific data
        });
      } else if (item.children) {
        // Recursively flatten nested data
        flattenData(
          item.children,
          result,
          item.name || parentName, // Pass the current name if available
          item.type || parentType // Pass the current type if available
        );
      }
    });
    return result;
  };

  const generateCsvSummarizedTBA = (data) => {
    const headers = [
      "Application",
      "Category",
      "Subcategory",
      "ResourceGroup",
      "Resource",
      "Month",
      "TotalBill",
      "OnDemandCost",
      "ReservedInstanceCost",
      "Savings",
      "DeltaNormalizedVariationMoM",
      "Normalized_Variation_MoM",
    ];

    const flattenData = (node, parentNames = []) => {
      if (!node) return []; // Ensure node exists

      if (node.type === "month") {
        return [
          [
            ...parentNames,
            node.name, // Month Name
            node.totalBill || 0,
            node.onDemandCost || 0,
            node.reservedInstanceCost || 0,
            node.savings || 0,
            node.deltaNormalizedVariationMoM || 0,
            node.Normalized_Variation_MoM || 0,
          ],
        ];
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.flatMap((child) =>
          flattenData(child, [...parentNames, node.name])
        );
      }

      return []; // Return an empty array if no children exist
    };

    const rows = data.flatMap((root) => flattenData(root));

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(",")), // Ensure row is an array
    ];

    return csvContent;
  };

  const generateCsvCurrentLayoutTBA = (data) => {
    const headers = [
      "Application",
      "TotalBill",
      "OnDemandCost",
      "ReservedInstanceCost",
      "Savings",
      "DeltaNormalizedVariationMoM",
      "Normalized_Variation_MoM",
    ];

    const aggregateData = (node) => {
      if (!node || !node.children) return null; // Ignore if no children

      let summary = {
        name: node.name,
        totalBill: 0,
        onDemandCost: 0,
        reservedInstanceCost: 0,
        savings: 0,
        deltaNormalizedVariationMoM: 0,
        Normalized_Variation_MoM: 0,
      };

      const traverseAndSum = (child) => {
        if (child.type === "month") {
          // Aggregate only numerical values
          summary.totalBill += child.totalBill || 0;
          summary.onDemandCost += child.onDemandCost || 0;
          summary.reservedInstanceCost += child.reservedInstanceCost || 0;
          summary.savings += child.savings || 0;
          summary.deltaNormalizedVariationMoM +=
            child.deltaNormalizedVariationMoM || 0;
          summary.Normalized_Variation_MoM +=
            child.Normalized_Variation_MoM || 0;
        } else if (child.children) {
          child.children.forEach(traverseAndSum);
        }
      };

      node.children.forEach(traverseAndSum);
      return summary;
    };

    const rows = data
      .map(aggregateData)
      .filter((row) => row !== null) // Remove empty nodes
      .map((row) =>
        [
          `"${row.name}"`,
          row.totalBill.toFixed(2),
          row.onDemandCost.toFixed(2),
          row.reservedInstanceCost.toFixed(2),
          row.savings.toFixed(2),
          row.deltaNormalizedVariationMoM.toFixed(2),
          row.Normalized_Variation_MoM.toFixed(2),
        ].join(",")
      );

    const csvContent = [headers.join(","), ...rows];
    return csvContent;
  };

  // const generateSummarizedCsvWithLevelsCI = (tableData) => {
  //   const headers = [
  //     "Level 1 Name",
  //     "Level 1 Type",
  //     "Level 2 Name",
  //     "Level 2 Type",
  //     "Level 3 Name",
  //     "Level 3 Type",
  //     "Level 4 Name",
  //     "Level 4 Type",
  //     "Level 5 Name",
  //     "Level 5 Type",
  //     "Month Name",
  //     "TotalBill",
  //     "OnDemandCost",
  //     "MarketPurchaseCost",
  //     "ReservationCost",
  //     "SavingsPlanCost",
  //   ];

  //   const flattenData = (data, parentLevels = []) => {
  //     return data.flatMap((row) => {
  //       console.log("Flattening row: ", row);

  //       const currentLevels = [
  //         ...parentLevels,
  //         { name: row.name, type: row.type },
  //       ];

  //       if (row.children && row.children.length > 0) {
  //         return flattenData(row.children, currentLevels);
  //       } else {
  //         return (
  //           Object.entries(row)
  //             .filter(([key]) => key !== "name" && key !== "type")
  //             .map(([monthName, monthData]) => {
  //               console.log("Month Data: ", monthData);

  //               return [
  //                 currentLevels[0]?.name || "",
  //                 currentLevels[0]?.type || "",
  //                 currentLevels[1]?.name || "",
  //                 currentLevels[1]?.type || "",
  //                 currentLevels[2]?.name || "",
  //                 currentLevels[2]?.type || "",
  //                 currentLevels[3]?.name || "",
  //                 currentLevels[3]?.type || "",
  //                 currentLevels[4]?.name || "",
  //                 currentLevels[4]?.type || "",
  //                 monthName, // Month name (e.g., "2024-07")
  //                 monthData.TotalBill || 0,
  //                 monthData.OnDemandCost || 0,
  //                 monthData.MarketPurchaseCost || 0,
  //                 monthData.ReservationCost || 0,
  //                 monthData.SavingsPlanCost || 0,
  //               ]
  //                 .map((val) => `"${val}"`) // Escape values
  //                 .join(","); // Join for CSV row
  //             }) || []
  //         );
  //       }
  //     });
  //   };

  //   const csvContent = [
  //     headers.join(","),
  //     ...flattenData(tableData),
  //   ];

  //   console.log("Generated CSV Content: ", csvContent);

  //   return csvContent;
  // };

  const handleExportCsv = (type) => {
    const headers = Object.keys(tableData[0]);
    let csvContent = [];
    if (type === "currentLayout") {
      // For non-hierarchical and parent rows in hierarchical data
      if (isHierarchical) {
        if (dataType === "ServiceCategory") {
          csvContent = generateCurrentLayoutCsv(tableData);
        } else if (dataType === "CostInventory") {
          csvContent = generateCurrentLayoutCsvCI(tableData);
        } else if (dataType === "TotalBillAllocation") {
          csvContent = generateCsvCurrentLayoutTBA(tableData);
        }
      } else {
        // Non-hierarchical case (same as current)
        csvContent = [
          headers.join(","),
          ...tableData.map((row) =>
            Object.values(row)
              .map((val) => `"${val}"`)
              .join(",")
          ),
        ];
      }
    } else if (type === "summarizedData") {
      // Generate summarized data for hierarchical data
      if (isHierarchical) {
        if (dataType === "ServiceCategory") {
          csvContent = generateSummarizedCsvWithLevels(tableData).split("\n");
        } else if (dataType === "TotalBillAllocation") {
          csvContent = generateCsvSummarizedTBA(tableData);
        }
      } else {
        alert(
          "Summarized data export is only applicable to hierarchical data."
        );
        return;
      }
    }

    const blob = new Blob([csvContent.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}-data.csv`;
    link.click();
    handleCsvMenuClose();
  };

  const handleExport = (format) => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    if (format === "PDF") {
      const opt = {
        margin: 10,
        filename: "table-data.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      let csvContent;
      if (isHierarchical) {
        if (dataType === "ServiceCategory") {
          // Generate the CSV content for hierarchical data
          csvContent = generateCurrentLayoutCsv(tableData, isHierarchical);

          const tableElement = document.createElement("table");
          const tableHeader = tableElement.createTHead();
          const headerRow = tableHeader.insertRow();
          const headers = [
            "Name",
            "TotalBill",
            "OnDemandCost",
            "CommitmentsCost",
            "Savings",
          ];
          headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
          });

          const tableBody = tableElement.createTBody();
          if (csvContent && csvContent.length > 1) {
            csvContent.slice(1).forEach((row) => {
              const tr = tableBody.insertRow();
              const rowValues = row.split(",");
              rowValues.forEach((val) => {
                const td = tr.insertCell();
                td.textContent = val.replace(/"/g, "");
              });
            });
          }
        } else if (dataType === "TotalBillAllocation") {
          csvContent = generateCsvCurrentLayoutTBA(tableData, isHierarchical);

          const tableElement = document.createElement("table");
          const tableHeader = tableElement.createTHead();
          const headerRow = tableHeader.insertRow();
          const headers = [
            "Name",
            "TotalBill",
            "OnDemandCost",
            "ReservationCost",
            "Savings",
            "%Normalized Variation",
            "%Raw Variation",
          ];

          headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
          });

          const tableBody = tableElement.createTBody();
          if (csvContent && csvContent.length > 1) {
            csvContent.slice(1).forEach((row) => {
              const tr = tableBody.insertRow();
              const rowValues = row.split(",");
              rowValues.forEach((val) => {
                const td = tr.insertCell();
                td.textContent = val.replace(/"/g, "");
              });
            });
          }
        } else if (dataType === "CostInventory") {
          csvContent = generateCurrentLayoutCsvCI(tableData, isHierarchical);

          const tableElement = document.createElement("table");
          const tableHeader = tableElement.createTHead();
          const headerRow = tableHeader.insertRow();
          const headers = [
            "Name",
            "TotalBill",
            "OnDemandCost",
            "ReservationCost",
            "SavingsPlanCost",
            "MarketPurchaseCost",
          ];

          headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
          });

          const tableBody = tableElement.createTBody();
          if (csvContent && csvContent.length > 1) {
            csvContent.slice(1).forEach((row) => {
              const tr = tableBody.insertRow();
              const rowValues = row.split(",");
              rowValues.forEach((val) => {
                const td = tr.insertCell();
                td.textContent = val.replace(/"/g, "");
              });
            });
          }
        } else {
          console.error("csvContent is empty or invalid.");
        }

        // Generate the PDF from the table
        html2pdf().from(tableElement).set(opt).save();
      }
    } else if (["PNG", "JPG"].includes(format)) {
      html2canvas(tableElement, { scrollY: 0, useCORS: true }).then(
        (canvas) => {
          canvas.toBlob((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `table-data.${format.toLowerCase()}`;
            link.click();
          });
        }
      );
    } else if (format === "CSV") {
      if (isHierarchical) {
        setCsvMenuAnchorEl(exportAnchorEl);
      } else {
        handleExportCsv("currentLayout");
      }
      handleExportMenuClose();
    }
  };

  return (
    <>
      <IconButton
        className={className || "cmpInvTv_shareButton"}
        onClick={handleMainMenuClick}
      >
        <ShareIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMainMenuClose}
        className="cmpInvTv_shareButton_popup"
      >
        <MenuItem onClick={handleExportMenuClick}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText>Export Data </ListItemText>
          <ListItemIcon style={{ marginLeft: "auto" }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleLinkToVisual}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText>Link to the Visual</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleChatInTeams}>
          <ListItemIcon>
            <TeamsIcon />
          </ListItemIcon>
          <ListItemText>Chat in Teams</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenInPowerPoint}>
          <ListItemIcon>
            <PowerPointIcon />
          </ListItemIcon>
          <ListItemText>Open in PowerPoint</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
      </Menu>

      {/* Export Data Submenu */}
      <Menu
        anchorEl={exportAnchorEl}
        open={exportOpen}
        onClose={handleExportMenuClose}
        className="cmpInvTv_shareButton_popup"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleExport("PDF")}>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText>Export as PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport("CSV")}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport("PNG")}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText>Export as PNG</ListItemText>
        </MenuItem>
      </Menu>

      {/* CSV Export Submenu (for hierarchical data) */}
      {isHierarchical && (
        <Menu
          anchorEl={csvMenuAnchorEl}
          open={csvMenuOpen}
          onClose={handleCsvMenuClose}
          className="cmpInvTv_shareButton_popup"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleExportCsv("currentLayout")}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText>Data with Current Layout</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleExportCsv("summarizedData")}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText>Summarized Data</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

ShareButton.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableRef: PropTypes.object.isRequired,
  isHierarchical: PropTypes.bool,
  className: PropTypes.string,
  dataType: PropTypes.oneOf([
    "ServiceCategory",
    "CostInventory",
    "TotalBillAllocation",
  ]).isRequired,
};

ShareButton.defaultProps = {
  className: "", // Default to empty string if no className is provided
};

export default ShareButton;
