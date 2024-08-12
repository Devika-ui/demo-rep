import Keycloak from "keycloak-js";
const clientId = process.env.REACT_APP_KEYCLOAK_CLIENT;
const realm = process.env.REACT_APP_KEYCLOAK_REALM;
const url = process.env.REACT_APP_KEYCLOAK_URL;
const keycloak = new Keycloak({
  realm: realm,
  url: url,
  clientId: clientId
});

export default keycloak;