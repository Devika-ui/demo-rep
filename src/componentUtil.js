const componentUtil = {
    setSelectedCustomerID: async (customerId) => {
        console.log("Setting the CustomerId",customerId);
        window.selectedCustomerId = customerId;
    },
    getSelectedCustomerID: async () => {
        return window.selectedCustomerId;
    },
    setAccessToken: async (accessToken) => {
        console.log("Setting Access Token");
        window.accessToken = accessToken;
    },
    getAccessToken: async () => {
        return window.accessToken.toString();
    }

};

export default componentUtil;