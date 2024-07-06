const express = require('express');
const router = express.Router();
//const cors = require('cors');
//router.use(cors());

//const express = require('express');
//const router = express.Router();


router.get('/subscription', (req, res) => {
    console.log('Received request for /subscription');

    const subscriptions = [
        {
            id_customer: 1600,
            id: '/sub1',
            tenantId: 'tenant1',
            subscriptionId: 'sub1',
            displayName: 'Subscription 1',
            state: 'Active',
            spendingLimit: '$100',
            domainName: 'cust1', 
            clientId: 'client1',       
            tenantId: 'tenant1',       
            agreement: 'Azure CSP'     
        },
        {
            id_customer: 1800,
            id: '/sub1',
            tenantId: 'tenant2',
            subscriptionId: 'sub2',
            displayName: 'Subscription 2',
            state: 'Inactive',
            spendingLimit: '$200',
            domainName: 'cust2', 
            clientId: 'client2',       
            tenantId: 'tenant2',       
            agreement: 'Azure CSP'     
        }
    ];

    res.json(subscriptions);
});


router.get('/subscription/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const subscriptionsForCustomer = [
        {
            id_customer: 1600,
            id: '/sub1',
            tenantId: 'tenant1',
            subscriptionId: 'sub1',
            displayName: 'Subscription 1',
            state: 'Active',
            spendingLimit: '$100',
            domainName: 'cust1', 
            clientId: 'client1',       
            tenantId: 'tenant1',       
            agreement: 'Azure CSP'     
        }
    ];

    res.json(subscriptionsForCustomer);
});


router.get('/subscription/agreement/:agreement', (req, res) => {
    const agreementId = req.params.agreement;
    const subscriptionsByAgreement = [
        {
            id_customer: 1600,
            id: '/sub1',
            tenantId: 'tenant1',
            subscriptionId: 'sub1',
            displayName: 'Subscription 1',
            state: 'Active',
            spendingLimit: '$100',
            domainName: 'cust1',
            clientId: 'client1',      
            tenantId: 'tenant1',      
            agreement: 'Azure CSP'    
			}
    ];

    res.json(subscriptionsByAgreement);
});


router.get('/subscription/domain/:domainName', (req, res) => {
    const domainName = req.params.domainName;
    const subscriptionsByDomain = [
        {
            id_customer: 1600,
            id: '/sub1',
            tenantId: 'tenant1',
            subscriptionId: 'sub1',
            displayName: 'Subscription 1',
            state: 'Active',
            spendingLimit: '$100',
            domainName: 'cust1', 
            clientId: 'client1',       
            tenantId: 'tenant1',       
            agreement: 'Azure CSP'     
        }
    ];

    res.json(subscriptionsByDomain);
});

module.exports = router;
