import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data1 = [
  { name: 'App 1', value: Math.floor(Math.random() * 100), color: '#0099C6'  },
  { name: 'App 2', value: Math.floor(Math.random() * 100), color:'#BA741A' },
  { name: 'App 3', value: Math.floor(Math.random() * 100),color:'#FFCD00' },
  { name: 'App 4', value: Math.floor(Math.random() * 100),color:'#00968F' },
  { name: 'App 5', value: Math.floor(Math.random() * 100),color:'#5F249F' },
];

const data2 = [
  { name: 'Virtual Machines', value: Math.floor(Math.random() * 100),color: '#0099C6' },
  { name: 'Storage', value: Math.floor(Math.random() * 100), color:'#BA741A' },
  { name: 'Azure NetApp Files', value: Math.floor(Math.random() * 100),color:'#FFCD00' },
  { name: 'Bandwidth', value: Math.floor(Math.random() * 100),color:'#00968F' },
  { name: 'Files', value: Math.floor(Math.random() * 100),color:'#5F249F' },
];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1300px',
    maxWidth: 550, // Adjust the maxWidth to your desired value
    margin: theme.spacing(2, 'auto'),
    marginBottom : '30px',   
  },
  chartContainer: {
    width: '50%', // Adjust as needed
  },
  chart: {
    width: '100%',
    height: 200, // Adjust the height of the pie charts
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
        <Typography variant="subtitle1" gutterBottom>
          Top 5 Applications
        </Typography>
        <div className={classes.chart}>
          <ResponsiveContainer width="90%" height={300}>
            <PieChart>
              <Pie data={data1} dataKey="value" nameKey="name">
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{ right: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <Typography variant="subtitle1" gutterBottom>
          Top 5 Services
        </Typography>
        <div className={classes.chart}>
          <ResponsiveContainer width="101%" height={300}>
            <PieChart>
              <Pie data={data2} dataKey="value" nameKey="name">
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
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
