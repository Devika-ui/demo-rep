// Install AWS Amplify and dependencies
// npm install aws-amplify @aws-amplify/ui-react

import React, { useState } from 'react';

import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      Navigate('/dashboard');
      console.log('User successfully logged in');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <AmplifyAuthenticator>
        <AmplifySignIn
          slot="sign-in"
          formFields={[
            {
              type: 'username',
              label: 'Username',
              placeholder: 'Enter your username',
              required: true,
            },
            {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
              required: true,
            },
          ]}
          handleSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        ></AmplifySignIn>
      </AmplifyAuthenticator>
    </div>
  );
};

export default Login;
