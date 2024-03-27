import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: 'ap-south-1_epLzkbxUQ',
  ClientId: '2pgt9a7fnndioriosu4ultmaig',
};
export default new CognitoUserPool(poolData);