import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
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
import Typography from "@mui/material/Typography";
import "../css/components/HorizontalBarGraph.css";

// Custom Legend Component
const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="cmpHBgraph_legend">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpHBgraph_legendItem">
          <div
            className="cmpHBgraph_legendColorBox"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const HorizontalBarGraph = ({
  data,
  title,
  width,
  height,
  xAxisLabel,
  yAxisLabel,
  barName,
}) => {
  return (
    <Paper
      className="cmpHBgraph_container"
      style={{ width: width, height: height }}
    >
      <Typography className="cmpHBgraph_heading">{title}</Typography>
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
              value: xAxisLabel,
              position: "insideBottomRight",
              offset: -10,
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="location"
            tick={{ fontSize: 12 }}
            label={{
              value: yAxisLabel,
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
          <Bar dataKey="count" fill="#330072" name={barName} barSize={15} />
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
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  barName: PropTypes.string,
};

HorizontalBarGraph.defaultProps = {
  title: "Orphaned Snapshots across locations",
  width: "50%",
  height: 373,
  xAxisLabel: "Count of Snapshots",
  yAxisLabel: "Location",
  barName: "Disk Count",
};

export default HorizontalBarGraph;
