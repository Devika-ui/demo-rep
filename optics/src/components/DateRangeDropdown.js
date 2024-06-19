import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale'; // import English locale

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },
}));

const DateRangeDropdown = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const toggleMonth = (month) => {
    const isSelected = selectedMonths.some(
      (selectedMonth) =>
        selectedMonth.getFullYear() === month.getFullYear() &&
        selectedMonth.getMonth() === month.getMonth()
    );
    if (isSelected) {
      setSelectedMonths(
        selectedMonths.filter(
          (selectedMonth) =>
            selectedMonth.getFullYear() !== month.getFullYear() ||
            selectedMonth.getMonth() !== month.getMonth()
        )
      );
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="date-range-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {selectedMonths.length === 0
          ? 'Select Months'
          : selectedMonths
              .map((month) => format(month, 'MMMM yyyy', { locale: enUS }))
              .join(', ')}
      </Button>
      <Menu
        id="date-range-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Array.from({ length: 12 }, (_, i) => {
          const month = new Date(new Date().getFullYear(), i, 1);
          const isSelected = selectedMonths.some(
            (selectedMonth) =>
              selectedMonth.getFullYear() === month.getFullYear() &&
              selectedMonth.getMonth() === month.getMonth()
          );
          return (
            <MenuItem
              key={i}
              selected={isSelected}
              onClick={() => toggleMonth(month)}
            >
              {format(month, 'MMMM yyyy', { locale: enUS })}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default DateRangeDropdown;