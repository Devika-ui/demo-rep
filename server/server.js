// server.js
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());

app.get('/subscription', (req, res) => {
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
    console.log(subscriptions);

    res.json(subscriptions);
});

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
