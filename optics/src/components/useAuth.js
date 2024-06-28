// import React, { useState, useEffect, useRef } from "react";
// import Keycloak from "keycloak-js";

// export const useAuth = () => {
//   const isRun = useRef(false);
//   const [isLogin, setLogin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isRun.current) return;
//     isRun.current = true;
//     const client = new Keycloak({
//       url: "http://127.0.0.1:8180/",
//       realm: "Finpos",
//       clientId: "Optics",
//     });

//     client.init({ onLoad: "login-required" }).then((res) => {
//       setLogin(res);
//       setLoading(false);
//     });
//   }, []);

//   return { isLogin, loading };
// };

import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const keycloak = new Keycloak({
      url: "http://127.0.0.1:8080/",
      realm: "Finops",
      clientId: "Optics",
    });

    keycloak
      .init({ onLoad: "login-required" })
      .then(async (authenticated) => {
        console.log("Keycloak initialized, authenticated:", authenticated);
        if (authenticated) {
          const code = new URLSearchParams(window.location.search).get("code");
          console.log("Authorization code:", code);
          if (code) {
            try {
              const response = await axios.post("http://localhost:3001/auth", {
                code: code,
                redirectUri: window.location.origin,
              });
              console.log("Token exchange response:", response.data);
              // Store tokens in local storage or context
              const { access_token } = response.data;
              localStorage.setItem("accessToken", access_token);

              // Decode the access token to get roles
              const decodedToken = jwtDecode(access_token);
              console.log("Decoded token:", decodedToken);

              const userRoles = decodedToken.realm_access?.roles || [];
              console.log("User roles:", userRoles);
              setRoles(userRoles);

              setLogin(true);
            } catch (error) {
              console.error("Authentication failed", error);
              setLogin(false);
            }
          } else {
            setLogin(true);
          }
        } else {
          setLogin(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
        setLoading(false);
      });
  }, []);

  return { isLogin, loading, roles };
};
