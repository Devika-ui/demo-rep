
import React from "react";
import Paper from "@mui/material/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";
import "../css/components/GenericBarChart.css";

const CustomLegend = ({ payload }) => {
  return (
    <div className="cmpGBChart_legendContainer">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpGBChart_legendItem">
          <span
            className="cmpGBChart_legendColor"
            style={{ backgroundColor: entry.color }}
          />
          <span className="cmpGBChart_legend">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const GenericBarChart = ({
  title,
  data = [],
  yAxisLabel,
  yAxisTicks = [0, 1000, 2000, 3000],
  yAxisDomain = [0, 1000],
  bars = [],
  chartStyle = {},
  containerStyle = {},
}) => {
  const formatYAxis = (tickItem) => {
    return yAxisTicks.some((tick) => tick >= 1000) ? `${tickItem / 1000}k` : tickItem.toString();
  };

  return (
    <Paper className="cmpGBChart_container" style={containerStyle}>
      <Typography className="cmpGBChart_heading">{title}</Typography>
      <ResponsiveContainer width={chartStyle.width || "100%"} height={chartStyle.height || 350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={chartStyle.barGap || 8}
        >
          <XAxis dataKey="name" />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }} tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          {bars.map((bar, index) => (
            <Bar key={index} dataKey={bar.key} fill={bar.color} stackId={bar.stackId} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GenericBarChart;
