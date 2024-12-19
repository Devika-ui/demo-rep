import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customerselection from "./components/Customerselection";
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
import UserInfo from "./components/UserInfo";

const UserWrappedApp = ({ token, userInfo }) => {
  const [dataPreload, setDataPreload] = useState(false);
  const selectionHandler = async() =>{
    setDataPreload(true);
  };
  const setUserData = async () => {
    if (!dataPreload) sessionStorage.clear();
    let accessToken = await componentUtil.getAccessToken(token);
    if (accessToken !== token) {
      await componentUtil.setAccessToken(token);
    }
    const customerId = await componentUtil.getSelectedCustomerID();
    if (customerId > 0) {
      setDataPreload(true);
    }
  };
  useEffect(() => {
    setUserData();
  }, [dataPreload]);

  return (
    dataPreload === true ? (
      <BrowserRouter>
        <Routes>
          <Route path="/Customerselection" element={<Customerselection />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billOverview" element={<BillOverview />} />
          <Route path="/businessCostSplit" element={<BusinessCostSplit />} />
          <Route path="/inventoryCostSplit" element={<InventoryCostSplit />} />

          <Route path="/recommendations" element={<RecommendationSPA />} />
          <Route path="/orphanedSnapshots" element={<OrphanedSnapshots />} />
          <Route path="/unattachedManagedDisks" element={<UnattachedManagedDisks />} />
          <Route path="/hyperScalarAdvisor" element={<HyperScalarAdvisor />} />
          <Route path="/sqlVmLicenses" element={<SqlVmLicenses />} />
          <Route path="/orphanedrsvbackups" element={<OrphanedRSVBackups />} />
          <Route path="/ondemandCostStudy" element={<OnDemandCostStudy />} />
          <Route path="/userInfo" element={<UserInfo userInfo={userInfo} />} />
        </Routes>
      </BrowserRouter>
    ) : (<BrowserRouter><Customerselection  selectionHandler={selectionHandler}/></BrowserRouter>)
  );
};

export default UserWrappedApp;
