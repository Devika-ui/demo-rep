import React, { useEffect, useState } from 'react';
import Box from './Box';
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import InvoiceTableView from './InvoiceTableView';
import Header from './Header';
import Subheader from './SubHeader';
// import NavigationBar from './NavigationBar';

const BillOverview = () => {
    const [showStackBars, setShowStackBars] = useState(true);


    // Callback function to receive value from HeaderButton
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
                <Box number={5} text="A Bit Longer Text" />
                <Box number={6} text="Very Long Text That Will Fit in One Line in the Box" />
                <Box number={7} text="Short Text" />
            </div>

            {/* Chart and Table Containers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Chart and Table Container */}
                <div style={{ display: 'flex', marginBottom: 20 }}>
                    <BarChartContainer />
                    <div style={{ marginLeft: 20 }}>
                        <div style={{ border: '1px solid #ccc' }}>
                            <InvoiceTableView />
                        </div>
                    </div>
                </div>

                {/* Pie Chart Container */}
                <div style={{ display: 'flex', marginBottom: 20 }}>
                    <PieChartContainer />
                    <div style={{ marginLeft: 20 }}>
                        <div style={{ border: '1px solid #ccc' }}>
                            <InvoiceTableView />
                        </div>
                    </div>
                </div>

                {/* <div style={{ width: '100%', maxWidth: 656 }}>
                    <PieChartContainer />
                </div> */}
            </div>
        </div>
    );
};

export default BillOverview;
