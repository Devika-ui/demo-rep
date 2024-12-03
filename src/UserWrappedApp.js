import React, { useEffect,useState } from "react";
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


const UserWrappedApp = ({token}) => {
    const [dataPreload, setDataPreload] = useState(false);
    const setUserData = async() => {
        if(!dataPreload)
          sessionStorage.clear();
        let accessToken = await componentUtil.getAccessToken(token);
        if(accessToken !== token ) {
            await componentUtil.setAccessToken(token);
            accessToken = await componentUtil.getAccessToken(token);
        }
        const customerId = await componentUtil.getSelectedCustomerID();
        if(customerId == 0 && dataPreload == false) {
            const data =  await api.getAssignedCustomerIds();
            if (data.length > 0) {
                await componentUtil.setSelectedCustomerID(data[0].customerId);
                await componentUtil.setCurrencySymbol(data[0].currencySymbol);
                await componentUtil.setCurrencyPreference(data[0].currencyPreference);
                console.log("customerId:::", await componentUtil.getSelectedCustomerID())
                setDataPreload(true);
            }
        }
        else {
            setDataPreload(true);
        } 
        
    };
    useEffect(() => {      
        setUserData();
    }, [dataPreload]);

    return (
        dataPreload && <BrowserRouter>
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
};
  
  export default UserWrappedApp;