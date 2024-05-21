import React, { useEffect, useState } from 'react';
import Box from './Box';
import Header from './Header';
import Subheader from './SubHeader';
import BillAllocation from './BillAllocation';
import Ondemand from './Ondemand';
import NavigationBar from './NavigationBar';
import ServiceCategory from './ServiceCategory';

const BusinessCostSplit = () => {
    const [showStackBars, setShowStackBars] = useState(true);
    const handleButtonClick = (value) => {
        if (value === "Azure") {
            setShowStackBars(false); // Hide StackBars and show AzureBars
        } else {
            setShowStackBars(true); // Show StackBars
        }
    };

    return (
        <div > 
            <Header onButtonClick={handleButtonClick} /> 
            <Subheader />
            <NavigationBar />
            {/* Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box number={1} text="Short Text" />
                <Box number={2} text="Medium Length Text" />
                <Box number={3} text="Longer Text That Will Adjust Dynamically" />
                <Box number={4} text="Another Short Text" />
            </div>
            <div style={{ marginBottom: '30px', textAlign: 'left', width: '100%', marginLeft: '-260px', marginTop: '-20px' }}> {/* Align Ondemand component to the left */}
                <Ondemand />
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '90px' }}> {/* Center align InvoiceTableView component */}
                <BillAllocation/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '600px', marginTop: '-715px',marginBottom: '30px' }}>
            <ServiceCategory />
            </div>
        </div>
    );
};

export default BusinessCostSplit;
