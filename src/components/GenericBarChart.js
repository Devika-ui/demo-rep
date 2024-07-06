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
} from "recharts";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "86%",
    maxWidth: 860,
    height: 350, // Increased height to accommodate the dropdown
    margin: theme.spacing(4, "auto"),
    padding: theme.spacing(3),
    backgroundColor: "#f9f9f9",
  },
  heading: {
    color: "#63666A",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  legendContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
  },
  legend: {
    fontSize: "12px", // Set the desired font size for the legend
    display: "flex",
    alignItems: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendColor: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  dropdownContainer: {
    display: "flex",
    justifyContent: "left",
    marginBottom: theme.spacing(2),
  },
}));

// Custom legend component
const CustomLegend = ({ payload }) => {
  const classes = useStyles();
  return (
    <div className={classes.legendContainer}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className={classes.legendItem}>
          <span
            className={classes.legendColor}
            style={{ backgroundColor: entry.color }}
          />
          <span className={classes.legend}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const GenericBarChart = ({
  title,
  data,
  yAxisLabel,
  yAxisTicks = [0, 100000, 200000, 300000, 400000, 500000],
  yAxisDomain = [0, 500000],
  bars,
  children,
}) => {
  const classes = useStyles();

  // Custom tick formatter for YAxis
  const formatYAxis = (tickItem) => {
    if (yAxisTicks.some(tick => tick >= 1000)) {
      return `${tickItem / 1000}k`;
    }
    return tickItem.toString();
  };

  return (
    <Paper className={classes.container}>
      <div className={classes.dropdownContainer}>{children}</div>
      <Typography className={classes.heading}>{title}</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8} // Adjust the value to increase or decrease the gap between bars
        >
          <XAxis dataKey="name" tick={{ fontSize: 8 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={yAxisDomain}
            ticks={yAxisTicks}
            tickFormatter={formatYAxis}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          {bars.map((bar, index) => (
            <Bar key={index} {...bar} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GenericBarChart;
