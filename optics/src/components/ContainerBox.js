// ContainerBox.js
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
    width: '1100px', // Adjust the width as needed
    height: '30px', // Adjust the height as needed
  },
}));

const ContainerBox = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Box number={55} text="Applications with Tags" />
      <Box number={47} text="Applications without Tags" />
      <Box number={2} text="Project with Tags" />
      <Box number="NA" text="Project without Tags" />
    </Paper>
  );
};

export default ContainerBox;
