import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '1 1 auto', // Adjusts the box to be responsive
    // height: '20px',
    // width: '274px',
  },
}));

const Box = ({ number, text }) => {
  const classes = useStyles();

  // Calculate width based on text length
  const getTextWidth = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '16px Arial'; // You can adjust the font size as needed
    return context.measureText(text).width + 40; // Adding some extra padding
  };

  const boxWidth = getTextWidth(text);

  return (
    <Paper className={classes.box} style={{ width: boxWidth }}>
      <Typography style={{ fontSize: '17px', fontWeight:'normal' }} variant="h5">{number}</Typography>
      <Typography style={{ fontSize: '12px',color: '#63666A' }} variant="body1">{text}</Typography>
    </Paper>
  );
};

export default Box;