import React, { useEffect, useState } from 'react';
import Header from './Header';
import Subheader from './SubHeader';
import NavigationBar from './NavigationBar';
import CostInventory from './CostInventory';
import ContainerBox from './ContainerBox';

const InventoryCostSplit = () => {
    const [showStackBars, setShowStackBars] = useState(true);
    const handleButtonClick = (value) => {
        if (value === "Azure") {
            setShowStackBars(false); // Hide StackBars and show AzureBars
        } else {
            setShowStackBars(true); // Show StackBars
        }
    };
    const additionalFilters = [
        {
          label: 'Service Category(s)',
          name: 'Select Service Category',
          options: [
            { value: 'Service Category 1', label: 'Service Category 1' },
            { value: 'Service Category 2', label: 'Service Category 2' },
            { value: 'Service Category 3', label: 'Service Category 3' }
          ]
        },
        {
          label: 'Owner(s)',
          name: 'Select Owner',
          options: [
            { value: 'Owner 1', label: 'Owner 1' },
            { value: 'Owner 2', label: 'Owner 2' },
            { value: 'Owner 3', label: 'Owner 3' }
          ]
        },
        {
          label: 'Environment(s)',
          name: 'environments',
          options: [
            { value: 'Production', label: 'Production' },
            { value: 'Staging', label: 'Staging' },
            { value: 'Development', label: 'Development' }
          ]
        },
        {
          label:'Cost Center(s)',
          name:'Select Cost Center',
          options: [
                { value: 'Cost Center1', label: 'Cost Center1' },
                { value: 'Cost Center2', label: 'Cost Center2' },
                { value: 'Cost Center3', label: 'Cost Center3' },
              ]
        },
      ];
    const dataSet1 = [
        {number:"$545.4K",text :"Previous Month Total Bill"},
        {number:"-3.4%",text:"Increase Rate"},
        {number:"2000" ,text:"Total Resources"},
    ];

    return (
        <div >
            <Header onButtonClick={handleButtonClick} /> 
            <Subheader
                title={
                    <div>
                        <span style={{ fontSize: '18px' }}>Cost & Usage/</span>
                        <span style={{ color: '#0070C0', fontSize: '18px' }}>Inventory Cost Split</span>
                    </div>
                }
                additionalFilters={additionalFilters}
            />
            <NavigationBar />
            {/* ContainerBoxForInventory */}
            <div style={{ display: 'flex', justifyContent: 'center', marginRight: "14px" }}>
            <ContainerBox data={dataSet1} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginRight: "14px", marginLeft: "60px", marginBottom: "10px" }}> 
                <CostInventory />
            </div>
            
           
        </div>
    );
};

export default InventoryCostSplit;
