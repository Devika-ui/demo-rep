import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import api from "../api.js";
import "../css/components/DateRangeDropdown.css";

const DateRangeDropdown = ({selectedCSP}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await api.getFilterForDropDown();
        const modifiedDates =  selectedCSP ==1 ? data.modifieddate.map((date) => new Date(date)): data.BillingPeriodStart.map((date) => new Date(date));
        const uniqueMonths = Array.from(
          new Set(
            modifiedDates.map((date) =>
              format(date, "MMMM yyyy", { locale: enUS })
            )
          )
        );
        setMonths(uniqueMonths);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, [selectedCSP]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMonth = (month) => {
    const isSelected = selectedMonths.includes(month);
    if (isSelected) {
      setSelectedMonths(
        selectedMonths.filter((selectedMonth) => selectedMonth !== month)
      );
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  return (
    <div>
      <Button
        className="cmpDateRangePick_button"
        aria-controls="date-range-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        style={{ fontSize: "16px" }}
      >
        {selectedMonths.length === 0
          ? "Select Months"
          : selectedMonths.join(", ")}
      </Button>
      <Menu
        id="date-range-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {months.map((month, index) => (
          <MenuItem
            key={index}
            selected={selectedMonths.includes(month)}
            onClick={() => toggleMonth(month)}
          >
            {month}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DateRangeDropdown;