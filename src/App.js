import React, { useEffect } from "react";

import "./App.css";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";
import UserWrappedApp from "./UserWrappedApp";

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  if (initialized) {
    if (keycloak.authenticated) {
      const userInfo = keycloak.idTokenParsed;
      return <UserWrappedApp token={keycloak.token} userInfo={userInfo} />;
    } else {
      keycloak.login();
    }
  }
};

const KeyCloakWrappedApp = () => (
  <ReactKeycloakProvider authClient={keycloak} on>
    <App />
  </ReactKeycloakProvider>
);

export default KeyCloakWrappedApp;
