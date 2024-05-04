import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { enUS } from 'date-fns/locale'; // import English locale

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },
}));

const DateRangeDropdown = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="date-range-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {dateRange[0].startDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })} - {dateRange[0].endDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </Button>
      <Menu
        id="date-range-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(event) => event.stopPropagation()}>
          <DateRange
            ranges={dateRange}
            onChange={handleSelect}
            locale={enUS}
            months={2}
            showSelectionPreview={true}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DateRangeDropdown;