import React from "react";
import PropTypes from "prop-types";
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
    maxWidth: 500,
    marginTop: -430,
    marginRight: 30,
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

const HorizontalBarGraph = ({ data, title, width, height }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.container}
      style={{ width: width, height: height }}
    >
      <Typography className={classes.heading}>{title}</Typography>
      <ResponsiveContainer width="100%" height={height - 50}>
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
            domain={[0, Math.max(...data.map((item) => item.count))]}
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

HorizontalBarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
};

HorizontalBarGraph.defaultProps = {
  title: "Orphaned Snapshots across locations",
  width: "50%",
  height: 373,
};

export default HorizontalBarGraph;
