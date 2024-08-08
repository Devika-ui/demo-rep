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
}) => {
  const [activeIndex1, setActiveIndex1] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const onPieEnter1 = (_, index) => setActiveIndex1(index);
  const onPieLeave1 = () => setActiveIndex1(null);

  const onPieEnter2 = (_, index) => setActiveIndex2(index);
  const onPieLeave2 = () => setActiveIndex2(null);

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

  const renderLabel = (entry) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = entry;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "12px" }}
      >
        {formatValue(value)}
      </text>
    );
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
              <Tooltip />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                wrapperStyle={{ bottom: 5, fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="cmpPieChart_chartContainer" style={chartStyle}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className="cmpPieChart_title"
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
              <Tooltip />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                wrapperStyle={{ bottom: 0, fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Paper>
  );
};

export default PieChartContainer;
