import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BillOverview from './components/BillOverview';
import BusinessCostSplit from './components/BusinessCostSplit';
import InventoryCostSplit from './components/InventoryCostSplit';
import OrphanedSnapshots from "./components/OrphanedSnapshots";

import './App.css';
import userpool from './userpool';

function App() {
  useEffect(() => {
    let user = userpool.getCurrentUser();
    if (user) {
      // <Navigate to="/dashboard" replace />
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/billOverview' element={<BillOverview/>} />
        <Route path='/businessCostSplit' element={<BusinessCostSplit/>}/>
        <Route path='/inventoryCostSplit' element={<InventoryCostSplit/>}/>
        <Route path="/orphanedSnapshots" element={<OrphanedSnapshots />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
