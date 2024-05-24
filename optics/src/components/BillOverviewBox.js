import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from './Box';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap', // Do not allow wrapping
    width: '89%',
    overflow: 'hidden', // Prevent horizontal scroll
    marginLeft: '50px',
  },
  box: {
    flex: '1 1 0', // Allow boxes to shrink and grow as needed
    minWidth: '100px', // Minimum width to prevent boxes from becoming too small
    maxWidth: '200px', // Maximum width to maintain a reasonable size
    margin: theme.spacing(1),
    textAlign: 'center',
    fontSize: '1px',
  },
}));

const BillOverviewBox = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Box className={classes.box} number="$1.40M" text="Total Bill" />
      <Box className={classes.box} number="$2.00M" text="Simulated Bill" />
      <Box className={classes.box} number="$570K" text="Total Savings" />
      <Box className={classes.box} number="52.3%" text="%Savings over Bill" />
      <Box className={classes.box} number="61.3%" text="%Savings over Pay-as-you-go" />
      <Box className={classes.box} number="10.2%" text="Normalized Variation" />
      <Box className={classes.box} number="13.7%" text="%Raw Variation" />
    </Paper>
  );
};

export default BillOverviewBox;