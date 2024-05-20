import React, { useEffect, useState } from 'react';
import Box from './Box';
import Header from './Header';
import Subheader from './SubHeader';
import InvoiceTableView from './InvoiceTableView';


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
        <div>
            <Header onButtonClick={handleButtonClick} />
            <Subheader />
            {/* <NavigationBar /> */}
            {/* Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box number={1} text="Short Text" />
                <Box number={2} text="Medium Length Text" />
                <Box number={3} text="Longer Text That Will Adjust Dynamically" />
                <Box number={4} text="Another Short Text" />
            </div>
            <InvoiceTableView/>
        </div>
    );
};

export default BusinessCostSplit;