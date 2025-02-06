import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Sector,
} from "recharts";
import "../css/components/PieChartContainer.css";

const PieChartContainer = ({
  title1,
  data1 = [],
  title2,
  data2 = [],
  containerStyle,
  chartStyle,
  pieChartHeight1 = 250,
  pieChartHeight2 = 250,
  titleStyle1 = {},
  titleStyle2 = {},
  currencySymbol,
  currencyPreference,
  loading = false,
}) => {
  const [activeIndex1, setActiveIndex1] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const onPieEnter1 = (_, index) => setActiveIndex1(index);
  const onPieLeave1 = () => setActiveIndex1(null);
  const onPieEnter2 = (_, index) => setActiveIndex2(index);
  const onPieLeave2 = () => setActiveIndex2(null);

  // Highlight max value in Pie Chart
  const getMaxValueData = (data) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    return data.map((d) => ({ ...d, displayValue: d.value === maxValue ? d.value : "" }));
  };

  const processedData1 = getMaxValueData(data1);
  const processedData2 = getMaxValueData(data2);

  // Adjust legend font size based on screen width
  const getLegendFontSize = () => {
    const width = window.innerWidth;
    if (width <= 600) return "8px";
    if (width < 990) return "6px";
    return "10px";
  };

  const legendFontSize1 = getLegendFontSize();
  const legendFontSize2 = getLegendFontSize();

  // Active Pie Slice Animation
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  // Format large numbers
  const formatValue = (value) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
  };

  // Adjust font size based on screen width
  const getResponsiveFontSize = () => {
    const width = window.innerWidth;
    if (width <= 600) return "10px";
    if (width < 990) return "8px";
    return "12px";
  };

  // Custom Pie Chart Label
  const renderLabel = (entry) => {
    const { cx, cy, midAngle, outerRadius, displayValue } = entry;
    if (!displayValue) return null;

    const radius = outerRadius * 0.47;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    const fontSize = getResponsiveFontSize();

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize }}
      >
        {currencyPreference === "start"
          ? `${currencySymbol}${formatValue(displayValue)}`
          : `${formatValue(displayValue)}${currencySymbol}`}
      </text>
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0 }}>
            {payload[0].name} : {currencySymbol}
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Paper className="cmpPieChart_container" style={containerStyle}>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* First Pie Chart */}
          <div className="cmpPieChart_chartContainer" style={chartStyle}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className="cmpPieChart_title"
              style={titleStyle1}
            >
              {title1}
            </Typography>
            <div className="cmpPieChart_chart">
              <ResponsiveContainer width="100%" height={pieChartHeight1}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex1}
                    activeShape={renderActiveShape}
                    data={processedData1}
                    dataKey="value"
                    nameKey="name"
                    onMouseEnter={onPieEnter1}
                    onMouseLeave={onPieLeave1}
                    label={renderLabel}
                    labelLine={false}
                  >
                    {processedData1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} />
                  <Legend
                    align="center"
                    verticalAlign="bottom"
                    layout="horizontal"
                    wrapperStyle={{ fontSize: legendFontSize1 }}
                    formatter={(value) => (
                      <span
                        title={value} style={{ cursor: "pointer"}}
                        onClick={() => alert(value)} > {value.length > 20 ? `${value.substring(0, 20)}...` : value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Pie Chart */}
          <div className="cmpPieChart_chartContainer" style={chartStyle}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className="cmpPieChart_title1"
              style={titleStyle2}
            >
              {title2}
            </Typography>
            <div className="cmpPieChart_chart">
              <ResponsiveContainer width="100%" height={pieChartHeight2}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex2}
                    activeShape={renderActiveShape}
                    data={processedData2}
                    dataKey="value"
                    nameKey="name"
                    onMouseEnter={onPieEnter2}
                    onMouseLeave={onPieLeave2}
                    label={renderLabel}
                    labelLine={false}
                  >
                    {processedData2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} />
                  <Legend
                    align="center"
                    verticalAlign="bottom"
                    layout="horizontal"
                    wrapperStyle={{ fontSize: legendFontSize2 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
};

// Default Props
PieChartContainer.defaultProps = {
  legendWrapperStyle1: { bottom: 5, fontSize: "12px" },
  legendWrapperStyle2: { bottom: 5, fontSize: "12px" },
};

export default PieChartContainer;
