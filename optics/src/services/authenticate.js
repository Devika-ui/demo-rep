import { AuthenticationDetails, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from '../userpool';

export const authenticate = (Email, Password) => {
    return new Promise((resolve, reject) => {
        // Check if the provided email is valid
        if (!isValidEmail(Email)) {
           // reject("Invalid email address");
            //return;
        }

        const user = new CognitoUser({
            Username: Email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const groups = result.accessToken.payload["cognito:groups"];
                const serializedGroups = JSON.stringify(groups);
                window.sessionStorage.setItem("cognitoGroups", serializedGroups);
                alert("login success");
                user.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error("Error fetching user attributes:", err);
                        reject(err);
                    } else {
                        console.log("User attributes:", attributes);
                        // You can process the user attributes here as needed
                        resolve(result);
                    }
                });

                console.log("Login successful");
                resolve(result);
            },
            newPasswordRequired: (userAttributes) => {
                alert("Entered new password required");
                // Check if the email attribute is required
                if (userAttributes && userAttributes.requiredAttributes && userAttributes.requiredAttributes.includes('email')) {
                    // Adding email attribute if it's required
                    const emailAttribute = new CognitoUserAttribute({
                        Name: 'email',
                        Value: Email
                    });

                    user.completeNewPasswordChallenge(Password, [emailAttribute], {
                        onSuccess: (result) => {
                            console.log("New password set successfully");
                            resolve(result);
                        },
                        onFailure: (err) => {
                            console.error("Failed to set new password", err);
                            reject(err);
                        }
                    });
                } else {
                    // If email attribute is not required, complete the challenge without it
                    user.completeNewPasswordChallenge(Password, [], {
                        onSuccess: (result) => {
                            console.log("New password set successfully");
                            resolve(result);
                        },
                        onFailure: (err) => {
                            console.error("Failed to set new password", err);
                            reject(err);
                        }
                    });
                }
            },
            onFailure: (err) => {
                console.log("Login failed", err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
};

// Function to check if the provided email is valid
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
