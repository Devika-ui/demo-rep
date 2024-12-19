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
    getCurrencySymbol: async () => {
        return sessionStorage["currencySymbol"] !== undefined ? sessionStorage.getItem("currencySymbol") : "$";
    },
    setCurrencySymbol: async (symbol) => {
      sessionStorage.setItem("currencySymbol", symbol);
    },
    getCurrencyPreference: async () => {
        return sessionStorage["currencyPreference"] !== undefined ? sessionStorage.getItem("currencyPreference") : "start";
    },
    setCurrencyPreference: async (loc) => {
      sessionStorage.setItem("currencyPreference", loc);
    },
    getSelectedCSP: async () => {
        return Number(sessionStorage["cspId"] !== undefined ? sessionStorage.getItem("cspId") : 1);
    },
    transformFiltersOptionsToObject: (selectedFilters) => {
      let toRet = {};
      for (const key in selectedFilters) {
        toRet[key] = selectedFilters[key].map((selected) => selected.value);
        }
        return toRet;
    }
};

export default componentUtil;