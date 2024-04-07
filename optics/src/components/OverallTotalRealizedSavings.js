// OverallTotalRealizedSavings.js
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import iIcon from '../images/Iicon.png';
import api from '../api.js';

const OverallTotalRealizedSavings = () => {

  const [subscriptions, setSubscriptions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [savings, setSavings] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getOverallSavings();
        setSubscriptions(subscriptionsData);
        const repeatedRecommendations = [subscriptionsData[0].Recommendations_percentage, subscriptionsData[1].Recommendations_percentage, subscriptionsData[2].Recommendations_percentage];
        setRecommendations(repeatedRecommendations);
        const repeatedReservations = [subscriptionsData[0].Reservations_percentage, subscriptionsData[1].Reservations_percentage, subscriptionsData[2].Reservations_percentage];
        setReservations(repeatedReservations);
        const repeatedSavingsPlan = [subscriptionsData[0].SavingsPlan_percentage, subscriptionsData[1].SavingsPlan_percentage, subscriptionsData[2].SavingsPlan_percentage];
        setSavings(repeatedSavingsPlan);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  // Data for the chart
  const data = {
    labels: ["June", "Jul", "Aug"],
    datasets: [
      {
        label: "Recommendations",
        backgroundColor: "rgba(0, 128, 0, 0.7)",
        data: recommendations,
      },
      {
        label: "Reservations",
        backgroundColor: "rgba(255, 140, 0, 0.7)",
        data: reservations,
      },
      {
        label: "Savings Plan",
        backgroundColor: "rgba(205, 205, 0, 0.7)",
        data: savings,
      },
    ],
  };

  // Trend line data
  const trendlineData = {
    labels: ["June Start", "June End", "Mid July", "Aug Start", "Aug End"],
    datasets: [
      {
        borderColor: "#0079B9",
        data: [55, 90, 65, 95, 100],
        fill: false,
        type: "line",
        pointRadius: 0, // Hide points
        showLine: true, // Show line
        borderWidth: 1, // Adjust line width
        label: "", // No legend for trend line
      },
    ],
  };

  // Combined data
  const combinedData = {
    labels: data.labels,
    datasets: [...data.datasets, ...trendlineData.datasets],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          filter: (legendItem, chartData) => {
            return legendItem.datasetIndex !== chartData.datasets.length - 1; // Exclude trendline from legend
          },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div style={{ width: "554px", height: "449px", borderRadius: "5px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", transition: "transform 0.3s, box-shadow 0.3s", position: "relative" }}>
    <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "20px", paddingRight: "10px", borderBottom: "1px solid #ccc" }}>
      <h4 style={{ margin: "0", lineHeight: "1" , color: '#5f249f'}}>Overall Total Realized Savings</h4>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <img style={{ height: '20px', width: '20px' }} src={iIcon} alt="I-icon" />
      </div>
    </div>
    <div style={{ height: "calc(100% - 51px)", overflow: "hidden", paddingTop :'40px' }}>
        <Bar data={combinedData} options={options} />
      </div>
    </div>
  );
};

export default OverallTotalRealizedSavings;