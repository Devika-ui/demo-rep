import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
  data1,
  title2,
  data2,
  containerStyle,
  chartStyle,
  pieChartHeight1 = 250,
  pieChartHeight2 = 250,
  titleStyle1 = {},
  titleStyle2 = {},
  legendWrapperStyle1 = {},
  legendWrapperStyle2 = {},
  currencySymbol,
}) => {
  const [activeIndex1, setActiveIndex1] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const onPieEnter1 = (_, index) => setActiveIndex1(index);
  const onPieLeave1 = () => setActiveIndex1(null);

  const onPieEnter2 = (_, index) => setActiveIndex2(index);
  const onPieLeave2 = () => setActiveIndex2(null);

  const getLegendFontSize = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      return "8px";
    } else if (width < 990) {
      return "6px";
    }
    return "10px";
  };

  const legendFontSize1 = getLegendFontSize();
  const legendFontSize2 = getLegendFontSize();

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
    } = props;
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

  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  const getResponsiveFontSize = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      return "10px"; // Smaller screens
    } else if (width < 990) {
      return "8px"; // Medium screens
    }
    return "12px"; // Larger screens
  };

  const renderLabel = (entry) => {
    const { cx, cy, midAngle, outerRadius, value } = entry;

    // Adjust radius and move labels towards the outer part of the chart
    const radius = outerRadius * 0.57; // Move the label a bit further outwards
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Get responsive font size
    const fontSize = getResponsiveFontSize();

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"} // Align labels to prevent overflow
        dominantBaseline="central"
        style={{ fontSize }} // Apply the responsive font size
      >
        {`${currencySymbol}${formatValue(value)}`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, currencySymbol }) => {
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
            {payload[0].name} : {`${currencySymbol}${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Paper className="cmpPieChart_container" style={containerStyle}>
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
                data={data1}
                dataKey="value"
                nameKey="name"
                onMouseEnter={onPieEnter1}
                onMouseLeave={onPieLeave1}
                label={renderLabel}
                labelLine={false}
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip currencySymbol={currencySymbol} />}
              />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                wrapperStyle={{ fontSize: legendFontSize1 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
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
                data={data2}
                dataKey="value"
                nameKey="name"
                onMouseEnter={onPieEnter2}
                onMouseLeave={onPieLeave2}
                label={renderLabel}
                labelLine={false}
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip currencySymbol={currencySymbol} />}
              />
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
    </Paper>
  );
};
PieChartContainer.defaultProps = {
  legendWrapperStyle1: { bottom: 5, fontSize: "12px" },
  legendWrapperStyle2: { bottom: 5, fontSize: "12px" }, // Default style for legend 2
};
export default PieChartContainer;
