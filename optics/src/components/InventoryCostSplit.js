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
