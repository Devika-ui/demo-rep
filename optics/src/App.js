// import React, { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import BillOverview from "./components/BillOverview";
// import BusinessCostSplit from "./components/BusinessCostSplit";
// import InventoryCostSplit from "./components/InventoryCostSplit";
// import OrphanedSnapshots from "./components/OrphanedSnapshots";
// import UnattachedManagedDisks from "./components/UnattachedManagedDisks";
// import { useAuth } from "./hooks/useAuth";

// import "./App.css";
// import userpool from "./userpool";

// function App() {
//   const { isLogin, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;
//   if (!isLogin) return <div>Not logged in</div>;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/billOverview" element={<BillOverview />} />
//         <Route path="/businessCostSplit" element={<BusinessCostSplit />} />
//         <Route path="/inventoryCostSplit" element={<InventoryCostSplit />} />
//         <Route path="/orphanedSnapshots" element={<OrphanedSnapshots />} />
//         <Route
//           path="/unattachedManagedDisks"
//           element={<UnattachedManagedDisks />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BillOverview from "./components/BillOverview";
import BusinessCostSplit from "./components/BusinessCostSplit";
import InventoryCostSplit from "./components/InventoryCostSplit";
import OrphanedSnapshots from "./components/OrphanedSnapshots";
import UnattachedManagedDisks from "./components/UnattachedManagedDisks";
import { useAuth } from "./components/useAuth";

import "./App.css";

function App() {
  const { isLogin, loading, roles } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isLogin) return <div>Not logged in</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billOverview" element={<BillOverview />} />
        <Route path="/businessCostSplit" element={<BusinessCostSplit />} />
        <Route path="/inventoryCostSplit" element={<InventoryCostSplit />} />
        <Route path="/orphanedSnapshots" element={<OrphanedSnapshots />} />
        <Route
          path="/unattachedManagedDisks"
          element={<UnattachedManagedDisks />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
