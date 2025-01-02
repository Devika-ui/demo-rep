import React, { useState } from "react";
import {
  Popover,
  Button,
  MenuItem,
  MenuList,
  ListItemIcon,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CustomizedReportButton = ({
  handleSortData,
  sortOptions,
  currentSort,
  className,
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // For the main button popover
  const [sortFieldAnchorEl, setSortFieldAnchorEl] = useState(null); // For the field selection popover
  const [sortDirection, setSortDirection] = useState(""); // Track sort direction

  // Open the main popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the main popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSortFieldAnchorEl(null);
  };

  // Open sort field popover
  const handleSortFieldOpen = (event, direction) => {
    setSortFieldAnchorEl(event.currentTarget);
    setSortDirection(direction);
  };

  // Close sort field popover
  const handleSortFieldClose = () => {
    setSortFieldAnchorEl(null);
  };

  // Handle sorting for a specific column
  const handleSortFieldSelection = (field) => {
    // Check if the requested sort matches the current state
    if (
      currentSort.field === field &&
      currentSort.direction === sortDirection
    ) {
      handleSortFieldClose(); // Close the popover without sorting
      return;
    }

    handleSortData(field, sortDirection); // Trigger sorting
    handleSortFieldClose(); // Close the popover
  };

  return (
    <>
      <Button
        variant="contained"
        className={className || "cmpInvTv_customizeButton"}
        color="inherit"
        onClick={handlePopoverOpen}
      >
        Customize Report
      </Button>

      {/* Main Pop-up for Customize Report */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuList>
          <MenuItem onClick={(event) => handleSortFieldOpen(event, "asc")}>
            <ArrowUpwardIcon />
            Sort Ascending
            <ListItemIcon style={{ marginLeft: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={(event) => handleSortFieldOpen(event, "desc")}>
            <ArrowDownwardIcon />
            Sort Descending
            <ListItemIcon style={{ marginLeft: "auto" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Sort Field List Pop-up */}
      <Popover
        open={Boolean(sortFieldAnchorEl)}
        anchorEl={sortFieldAnchorEl}
        onClose={handleSortFieldClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortFieldSelection(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default CustomizedReportButton;
