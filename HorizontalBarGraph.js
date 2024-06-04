import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    maxWidth: 500,
    marginTop: -420,
    marginRight: 30,
    height: 373,
    margin: theme.spacing(4, "auto"),
    padding: theme.spacing(3),
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "#63666A",
    marginBottom: theme.spacing(2),
  },
  legend: {
    fontSize: "12px",
    color: "#63666A", // Ensure the legend text color matches the heading
    display: "flex",
    justifyContent: "flex-end",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(-2),
  },
  legendColorBox: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
}));

// Dummy data
const data = [
  { name: "North Europe", count: 100 },
  { name: "East US 2", count: 150 },
  { name: "South East Asia", count: 200 },
  { name: "West Europe", count: 75 },
  { name: "West US 2", count: 125 },
];

// Custom Legend Component
const CustomLegend = (props) => {
  const { payload } = props;
  const classes = useStyles();

  return (
    <div className={classes.legend}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className={classes.legendItem}>
          <div
            className={classes.legendColorBox}
            style={{ backgroundColor: entry.color }}
          ></div>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const HorizontalBarGraph = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography className={classes.heading}>
        Orphaned Snapshots across locations
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={15}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            label={{
              value: "Count of Snapshots",
              position: "insideBottomRight",
              offset: -10,
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12 }}
            label={{
              value: "Location",
              angle: -90,
              position: "insideLeft",
              dx: -20, // Adjust this value to move the label further to the left
              fontSize: 12,
            }}
          />
          <Tooltip />
          <Legend
            content={<CustomLegend />}
            verticalAlign="top"
            align="right"
          />
          <Bar dataKey="count" fill="#330072" name="Disk Count" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default HorizontalBarGraph;
