import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  realm: 'dxc-finops-test',
  url: 'https://keycloak-finopstest.azurewebsites.net/',
  clientId: 'optics-ui'
});

export default keycloak;