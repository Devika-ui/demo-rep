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
import CircularProgress from "@mui/material/CircularProgress";

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
  data,
  yAxisLabel,
  yAxisTicks = [0, 1000, 2000, 3000],
  yAxisDomain = [0, 1000],
  bars,
  children,
  chartStyle = {},
  containerStyle = {},
  loading = false,
  marginTop = 0,
  currencySymbol,
  currencyPreference,
}) => {
  const formatYAxis = (tickItem) => {
    if (yAxisTicks.some((tick) => tick >= 1000)) {
      return `${tickItem / 1000}k`;
    }
    return tickItem.toString();
  };

  return (
    <Paper className="cmpGBChart_container" style={containerStyle}>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography
            className="cmpPieChart_title"
            style={{ marginTop: "-15px" }}
          >
            {title}
          </Typography>
          <ResponsiveContainer
            width={chartStyle.width || "100%"}
            height={chartStyle.height || "350"}
            style={{ marginTop }}
          >
            <BarChart
              data={data}
              margin={{ top: 40, right: 30, left: 20, bottom: -30 }}
              barGap={8} // Adjust the value to increase or decrease the gap between bars
            >
              <XAxis dataKey="subscriptionName" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={yAxisDomain}
                ticks={yAxisTicks}
                tickFormatter={formatYAxis}
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                  dy: 30,
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />{" "}
              <Tooltip
                formatter={(value, name) => {
                  const formattedValue = Number(value).toFixed(2);

                  // Remove currency preference logic for "Consumed Meter"
                  if (name === "Consumed Meter") {
                    return formattedValue;
                  }

                  return currencyPreference === "start"
                    ? `${currencySymbol}${formattedValue}`
                    : `${formattedValue}${currencySymbol}`;
                }}
                itemStyle={{ fontSize: 14 }}
              />
              <Tooltip />
              <Legend content={<CustomLegend />} />
              {bars.map((bar, index) => (
                <Bar key={index} {...bar} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </Paper>
  );
};

export default GenericBarChart;
