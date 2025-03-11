import React, { useState } from "react";
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
import PowerPointIcon from "@mui/icons-material/Slideshow";
import PptxGenJS from "pptxgenjs";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../css/components/ShareButton.css";

const ShareButtonCO = ({
  charts,
  horizontaldata,

  className,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const exportOpen = Boolean(exportAnchorEl);

  const handleMainMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportMenuClick = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportAnchorEl(null);
  };

  const handleOpenInPowerPoint = () => {
    let pptx = new PptxGenJS();

    charts.forEach((chart, index) => {
      if (Array.isArray(chart.data) && chart.data.length > 0) {
        let slide = pptx.addSlide();
        slide.addText(`Chart ${index + 1}: ${chart.title}`, {
          x: 0.5,
          y: 0.2,
          fontSize: 18,
          bold: true,
        });

        let tableData = [
          chart.headers,
          ...chart.data.map((row) => chart.mapData(row)),
        ];
        slide.addTable(tableData, { x: 0.5, y: 1, colW: [3, 3], fontSize: 14 });
      }
    });

    pptx.writeFile("Exported_Presentation.pptx");
    handleMainMenuClose();
  };

  const handleExport = async (format) => {
    if (format === "PDF" || format === "PNG") {
      const pdf = new jsPDF("landscape");
      const chartElements = document.querySelectorAll(".export-container");

      for (let i = 0; i < chartElements.length; i++) {
        const canvas = await html2canvas(chartElements[i]);
        const imgData = canvas.toDataURL("image/png");

        if (format === "PDF") {
          pdf.addImage(imgData, "PNG", 10, 10, 270, 150);
          if (i !== chartElements.length - 1) pdf.addPage();
        } else {
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `exportedData_${i + 1}.png`;
          link.click();
        }
      }

      if (format === "PDF") pdf.save("exportedData.pdf");
    } else if (format === "CSV") {
      exportChartDataToCSV();
    }
  };

  const exportChartDataToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    charts.forEach((chart, index) => {
      if (Array.isArray(chart.data) && chart.data.length > 0) {
        csvContent += `Chart ${index + 1}: ${chart.title}\n`;
        csvContent += chart.headers.join(",") + "\n";
        csvContent +=
          chart.data.map((row) => chart.mapData(row).join(",")).join("\n") +
          "\n\n";
      }
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <IconButton className={className} onClick={handleMainMenuClick}>
        <ShareIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMainMenuClose}>
        <MenuItem onClick={handleExportMenuClick}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText>Export Data</ListItemText>
          <ListItemIcon style={{ marginLeft: "auto" }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleOpenInPowerPoint}>
          <ListItemIcon>
            <PowerPointIcon />
          </ListItemIcon>
          <ListItemText>Open in PowerPoint</ListItemText>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={exportAnchorEl}
        open={exportOpen}
        onClose={handleExportMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
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
    </>
  );
};

ShareButtonCO.propTypes = {
  tableRef: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.array,
  data1: PropTypes.array,
  data2: PropTypes.array,
  horizontaldata: PropTypes.array,
};

export default ShareButtonCO;
