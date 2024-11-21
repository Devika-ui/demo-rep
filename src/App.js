import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BillOverview from "./components/BillOverview";
import BusinessCostSplit from "./components/BusinessCostSplit";
import InventoryCostSplit from "./components/InventoryCostSplit";
import OrphanedSnapshots from "./components/OrphanedSnapshots";
import UnattachedManagedDisks from "./components/UnattachedManagedDisks";
//import { useAuth } from "./components/useAuth";
import HyperScalarAdvisor from "./components/HyperScalarAdvisor";
import SqlVmLicenses from "./components/SqlVmLicenses";
import OrphanedRSVBackups from "./components/OrphanedRSVBackups";
import "./App.css";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";
import OnDemandCostStudy from "./components/OnDemandCostStudy";
import RecommendationSPA from "./components/RecommendationSPA";
import api from "./api";
import componentUtil from "./componentUtil";

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
      const fetchData = async () => {
        try {
          if(initialized)
          {
            const data = await api.getAssignedCustomerIds();
            console.log("API response:", data);
            if (data.length > 0) {
              componentUtil.setSelectedCustomerID(data[0].customerId);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
  }, [keycloak.authenticated]); 

  if (initialized) {
    if (keycloak.authenticated) {
      componentUtil.setAccessToken(keycloak.token);
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/billOverview" element={<BillOverview />} />
            <Route path="/businessCostSplit" element={<BusinessCostSplit />} />
            <Route
              path="/inventoryCostSplit"
              element={<InventoryCostSplit />}
            />

            <Route path="/recommendations" element={<RecommendationSPA />} />
            <Route path="/orphanedSnapshots" element={<OrphanedSnapshots />} />
            <Route
              path="/unattachedManagedDisks"
              element={<UnattachedManagedDisks />}
            />
            <Route
              path="/hyperScalarAdvisor"
              element={<HyperScalarAdvisor />}
            />
            <Route path="/sqlVmLicenses" element={<SqlVmLicenses />} />
            <Route
              path="/orphanedrsvbackups"
              element={<OrphanedRSVBackups />}
            />
            <Route path="/ondemandCostStudy" element={<OnDemandCostStudy />} />
          </Routes>
        </BrowserRouter>
      );
    } else {
      keycloak.login();
    }
  }
};

const WrappedApp = () => (
  <ReactKeycloakProvider authClient={keycloak} on>
    <App />
  </ReactKeycloakProvider>
);

export default WrappedApp;
