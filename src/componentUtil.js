const componentUtil = {
    setSelectedCustomerID: async (customerId) => {
        sessionStorage.setItem("selectedCustomerId", customerId);
    },
    getSelectedCustomerID: async () => {
        return Number(sessionStorage["selectedCustomerId"] !== undefined ? sessionStorage.getItem("selectedCustomerId") : 0);
    },
    setAccessToken: async (accessToken) => {
        sessionStorage.setItem("accessToken", accessToken);
    },
    getAccessToken: async () => {
        return (sessionStorage["accessToken"] !== undefined ? sessionStorage.getItem("accessToken") : "");
    },
    setSelectedCSP: async (cps_id) => {
        sessionStorage.setItem("cspId", cps_id);
    },
    getSelectedCSP: async () => {
        return Number(sessionStorage["cspId"] !== undefined ? sessionStorage.getItem("cspId") : 1);
    },
    populateFilterData: (selectedFilters, subscriptionsData) => {
        const hasFilters =  selectedFilters &&   (selectedFilters.subscriptions?.length > 0 ||
            selectedFilters.businessUnits?.length > 0 ||
            selectedFilters.locations?.length > 0 ||
            selectedFilters.applications?.length > 0 ||
            selectedFilters.projects?.length > 0 ||
            selectedFilters.environments?.length > 0);
          let inputData ='';
          if (hasFilters || subscriptionsData.length > 0) {
            inputData = hasFilters
                  ? {
                      Subscriptions: selectedFilters.subscriptions.map(
                        (sub) => sub.value
                      ),
                      BusinessUnits:
                        selectedFilters.businessUnits?.map((bu) => bu.value) || [],
                      Locations:
                        selectedFilters.locations?.map((loc) => loc.value) || [],
                      Applications:
                        selectedFilters.applications?.map((app) => app.value) || [],
                      Projects:
                        selectedFilters.projects?.map((proj) => proj.value) || [],
                      Environments:
                        selectedFilters.environments?.map((env) => env.value) || [],
                    }
                  : subscriptionsData;
          }
    }
};

export default componentUtil;