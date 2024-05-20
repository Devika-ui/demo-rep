import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data1 = [
  { name: 'App 1', value: Math.floor(Math.random() * 100) },
  { name: 'App 2', value: Math.floor(Math.random() * 100) },
  { name: 'App 3', value: Math.floor(Math.random() * 100) },
  { name: 'App 4', value: Math.floor(Math.random() * 100) },
  { name: 'App 5', value: Math.floor(Math.random() * 100) },
];

const data2 = [
  { name: 'Service 1', value: Math.floor(Math.random() * 100) },
  { name: 'Service 2', value: Math.floor(Math.random() * 100) },
  { name: 'Service 3', value: Math.floor(Math.random() * 100) },
  { name: 'Service 4', value: Math.floor(Math.random() * 100) },
  { name: 'Service 5', value: Math.floor(Math.random() * 100) },
];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 656,
    margin: theme.spacing(2, 'auto'),
  },
  chartContainer: {
    width: '48%', // Adjust as needed
  },
  chart: {
    width: '100%',
    position: 'relative',
  },
  legend: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));

const PieChartContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div className={classes.chartContainer}>
        <Typography variant="h6" gutterBottom>
          Top 5 Applications
        </Typography>
        <div className={classes.chart}>
          <ResponsiveContainer width="100%" height={339}>
            <PieChart>
              <Pie data={data1} dataKey="value" nameKey="name" fill="#8884d8" />
              <Tooltip />
              <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{ right: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <Typography variant="h6" gutterBottom>
          Top 5 Services
        </Typography>
        <div className={classes.chart}>
          <ResponsiveContainer width="100%" height={339}>
            <PieChart>
              <Pie data={data2} dataKey="value" nameKey="name" fill="#82ca9d" />
              <Tooltip />
              <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{ right: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Paper>
  );
};

export default PieChartContainer;
