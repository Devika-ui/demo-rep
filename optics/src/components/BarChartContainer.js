import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import Typography from '@material-ui/core/Typography';
import chartData from './chartData.json';
import trendData from './trendData.json';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '63%',
    maxWidth: 700,
    height: 350,
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(3),
    backgroundColor: '#f9f9f9',
    marginRight : '15px',
    paddingRight : 0,
    paddingLeft : 10,
    paddingTop : 4,
  },
  heading: {
    color: '#63666A',
    fontSize: '14px',
    marginBottom: theme.spacing(2),
  },
}));

const BarChartContainer = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const combinedData = chartData.map(item => {
      const trendItem = trendData.find(trend => trend.name === item.name);
      return { ...item, ...trendItem };
    });
    setData(combinedData);
  }, []);

  return (
    <Paper className={classes.container}>
      <Typography className={classes.heading}>
        Total Bill Cost Vs Simulated PayGO
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, left: 5, bottom: 20 }}>
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} /> {/* Decreased font size */}
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} /> {/* Decreased font size */}
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="left"
            wrapperStyle={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}
            iconSize={10} // Adjust the size of legend icons if needed
            contentStyle={{ fontSize: 10 }} // Adjust the font size of legend text
          />
          <Bar dataKey="Marketplace Cost" fill="rgba(95, 36, 159, 0.8)" name="Marketplace Cost" />
          <Bar dataKey="Pay as you go" fill="rgba(0, 150, 143, 0.8)" name="Pay as you go" />
          <Bar dataKey="Reservations" fill="rgba(0, 163, 225, 0.8)" name="Reservations" />
          <Bar dataKey="Savings Plan" fill="rgba(237, 155, 51, 0.8)" name="Savings Plan" />
          <Bar dataKey="Saas" fill="rgba(99, 102, 106, 0.8)" name="Saas" />
          <Line type="monotone" dataKey="Simulated PAYGO" stroke="rgba(0, 153, 198, 0.8)" strokeWidth={2} dot={false} name="Simulated PAYGO" />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartContainer;
