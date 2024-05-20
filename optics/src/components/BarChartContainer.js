import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: 656,
    margin: theme.spacing(2, 'auto'),
  },
}));

const BarChartContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <ResponsiveContainer width="100%" height={339}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartContainer;
