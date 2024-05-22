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
      marginLeft:"87px",
      marginRight: "20px",
      alignItems: 'center',
      justifyContent: 'center',
      width: '1600px', // Adjust the width as needed
      height: '80px', // Adjust the height as needed
    },
  }));
  

const BillOverviewBox = () => {
    const classes = useStyles();

    return (
      <Paper className={classes.container}>
                <Box number="$1.40M" text="Total Bill" />
                <Box number="$2.00M" text="Simulated Bill" />
                <Box number="$570K" text="Total Savings" />
                <Box number="52.3%" text="%Savings over Bill" />
                <Box number="61.3%" text="%Savings over Pay-as-you-go" />
                <Box number="10.2%" text="Normalized Variation"/>
                <Box number="13.7%" text="%Raw Variation" />
      </Paper>
    );
  };

export default BillOverviewBox;