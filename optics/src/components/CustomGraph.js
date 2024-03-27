import React from "react";
import { Line } from "react-chartjs-2";

const CustomGraph = ({ type }) => {
  // Dummy data, replace with actual data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: type === "coverage" ? "% Coverage" : "% Usage",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: type === "coverage" ? "#0079B9" : "#FF5733",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default CustomGraph;