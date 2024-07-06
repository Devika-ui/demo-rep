const express = require('express');

const router = express.Router();
 
// Define endpoint to get billing details
router.get('/billing', (req, res) => {

    // Logic to fetch billing details from the database

    // Replace the following dummy response with actual data retrieval logic

    const billing = [

        {

			id_customer: 1600,

		    subscriptionName: 'sub1',
			
			subscriptionGuid: '3456',
			
		    serviceFamily: 'compute',
          
			resourceGroup:  'res1',
          
			tags_BU:  'bu1',
          
			tags_ProjectName:  'pro1',
          
			tags_Environment:   'env1',
          
			tags_AppName:  'app1',
          
			tags_Owner:  'owner1',
          

        },

        {
			id_customer: 1800,

		    subscriptionName: 'sub2',
			
			subscriptionGuid: '3456',
			
		    serviceFamily: 'compute',
          
			resourceGroup:  'res2',
          
			tags_BU:  'bu2',
          
			tags_ProjectName:  'pro2',
          
			tags_Environment:   'env2',
          
			tags_AppName:  'app2',
          
			tags_Owner:  'owner2',

        }

    ];
 
    res.json(billing);

});
 
// Define endpoint to get billing for a specific id_customer 

router.get('/billing/:id_customer', (req, res) => {

    const id_customer = req.params.id_customer;

    // Logic to fetch billing details for the specified customer ID from the database

    // Replace the following dummy response with actual data retrieval logic

    const billingForCustomer = [

        {

		    id_customer: 1600,

		    subscriptionName: 'sub1',
			
			subscriptionGuid: '3456',
			
		    serviceFamily: 'compute',
          
			resourceGroup:  'res1',
          
			tags_BU:  'bu1',
          
			tags_ProjectName:  'pro1',
          
			tags_Environment:   'env1',
          
			tags_AppName:  'app1',
          
			tags_Owner:  'owner1',

        }

    ];
 
    res.json(billingForCustomer);

});
 
// Define endpoint to get billing details by subscriptionName

router.get('/billing/:subscriptionName', (req, res) => {

    const subscriptionName = req.params.subscriptionName;

    // Logic to fetch billing details based on the specified subscriptionName from the database

    // Replace the following dummy response with actual data retrieval logic

    const billingBysubscriptionName = [

        {
			id_customer: 1600,

		    subscriptionName: 'sub1',
			
			subscriptionGuid: '3456',
			
		    serviceFamily: 'compute',
          
			resourceGroup:  'res1',
          
			tags_BU:  'bu1',
          
			tags_ProjectName:  'pro1',
          
			tags_Environment:   'env1',
          
			tags_AppName:  'app1',
          
			tags_Owner:  'owner1',

        }

    ];
 
    res.json(billingBysubscriptionName);

});

// Define endpoint to get billing details by subscriptionGuid

router.get('/billing/:subscriptionGuid', (req, res) => {

    const subscriptionGuid = req.params.subscriptionGuid;

    // Logic to fetch billing details based on the specified subscriptionGuid from the database

    // Replace the following dummy response with actual data retrieval logic

    const billingBysubscriptionGuid = [

        {

			id_customer: 1600,

		    subscriptionName: 'sub1',
			
			subscriptionGuid: '3456',
			
		    serviceFamily: 'compute',
          
			resourceGroup:  'res1',
          
			tags_BU:  'bu1',
          
			tags_ProjectName:  'pro1',
          
			tags_Environment:   'env1',
          
			tags_AppName:  'app1',
          
			tags_Owner:  'owner1',

        }

    ];
 
    res.json(billingBysubscriptionGuid);

});
 
module.exports = router; 

