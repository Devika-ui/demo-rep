import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "./Header.js";
import SubHeader from "./SubHeader.js";
import NavigationBar from "./NavigationBar.js";
import ContainerBox from "./ContainerBox.js";
import PieChartContainer from "./PieChartContainer.js";
import MonthlyCostTrends from "./MonthlyCostTrends";
import SavingsRecommendations from "./SavingsRecommendations.js";
import RightsizingRecommendationsTable from "./Rightsizing.js";
import componentUtil from "../componentUtil.js";
import api from "../api.js";

const TrustedAdvisor = () => {
  const [selectedProvider, setSelectedProvider] = useState(110);
  const [recommendationCount, setRecommendationCount] = useState([]);
  const [estimatedMonthlySavings, setEstimatedMonthlySavings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showStackBars, setShowStackBars] = useState(true);
  const [pieChartData, setPieChartData] = useState([]);
  const [costTrendData, setCostTrendData] = useState(null);
  const [billingMonth, setBillingMonth] = useState([]);

  const titleStyle1 = {
    fontSize: "1rem",
    marginLeft: "-2rem",
    position: "absolute",
    marginTop: "-0.6rem",
    whiteSpace: "nowrap",
    zIndex: 1000,
  };

  const colorPalette = ["#0099C6", "#BA741A", "#FFCD00", "#00968F", "#5F249F"];

  const handleButtonClick = (value) => {
    componentUtil.setSelectedCSP(value);
    setSelectedProvider(value);
    setShowStackBars(value !== 1);
  };

  const handleFiltersChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleMonthChange = (months) => {
    setBillingMonth(months);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await api.getTotalRecommendations();
        const recommendations = [
          { number: response.recommendationcount, text: "No of recommendations" },
        ];
        const monthlySavings = estimatedMonthlySavings
          ? [{ number: estimatedMonthlySavings, text: "Estimated monthly savings" }]
          : [];
        setRecommendationCount([...recommendations, ...monthlySavings]);
      } catch (error) {
        console.error("Error fetching total recommendations:", error);
        setRecommendationCount([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchMonthlySavings = async () => {
      try {
        const response = await api.getMonthlySavings();
        setEstimatedMonthlySavings(parseFloat(response.estimatedmonthlysavings).toFixed(2));
      } catch (error) {
        console.error("Error fetching Monthly Savings:", error);
      }
    };

    fetchRecommendations();
    fetchMonthlySavings();
  }, [selectedProvider, estimatedMonthlySavings]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await api.getServicemonthlysavings();
        setPieChartData(
          response.topServices.map((service, index) => ({
            name: service.ServiceCategory,
            value: service.TotalCost,
            color: colorPalette[index % colorPalette.length],
          }))
        );
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    fetchPieChartData();
  }, []);

  useEffect(() => {
    const fetchCostTrendData = async () => {
      setLoading(true);
      try {
        const response = await api.getCosttrend();
        const mappedData = {
          labels: response.map((item) => item.instance_type),
          datasets: [
            {
              label: "14 Day Avg CPU Utilization",
              data: response.map((item) =>
                parseFloat(item["14_day_avg_cpu_utilization"].replace("%", ""))
              ),
              borderColor: "#00bfa5",
              borderWidth: 2,
              pointBackgroundColor: "#00bfa5",
              pointBorderColor: "#fff",
              pointRadius: 4,
              tension: 0.4,
              fill: false,
            },
          ],
        };
        setCostTrendData(mappedData);
      } catch (error) {
        console.error("Error fetching cost trend data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCostTrendData();
  }, [selectedProvider]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 9.5,
          paddingRight: "10px",
          maxWidth: "100%",
        }}
      >
        <Header />
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#5f249f",
            marginTop: "-1rem", // Adjust this as needed
            fontWeight: "bold",
          }}
        >
          AWS Trusted Advisor
        </Typography>
        <SubHeader
          onButtonClick={handleButtonClick}
          onFiltersChange={handleFiltersChange}
          selectedCSP={selectedProvider}
          onMonthChange={handleMonthChange}
        />
        <NavigationBar />
      </Box>
      <NavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-33px",
          marginRight: "2px",
          marginTop: "-5px",
        }}
      >
        <ContainerBox
           data={recommendationCount}
            savings={estimatedMonthlySavings}
           loading={loading}
         />
      </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
            // margin: "2px 0px",
            marginTop: "-1rem"
          }}
        >
          <PieChartContainer
            title1={"Service with estimated monthly savings"}
            data1={pieChartData}
            containerStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "540px",
              marginTop: "1.3rem",
              height: "39.3vh",
              marginRight: "-2.5rem"
            }}
            chartStyle={{
              width: "100%",
              maxWidth: "250px",
              height: "auto",
              marginTop: "5px",    
            }}
            pieChartHeight1={220}
            titleStyle1={titleStyle1}
            currencySymbol="$"
            currencyPreference="start"
            loading={loading}
          />

          <div style={{ height: "400px", width: "600px", marginLeft: "4rem" }}>
          <MonthlyCostTrends 
          dummyData={costTrendData || { labels: [], datasets: [] }} 
          loading={loading} />
         </div>

        </Box>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem"}}>
  <SavingsRecommendations />
  <RightsizingRecommendationsTable />
</div>     
    </div>
  );
};

export default TrustedAdvisor;