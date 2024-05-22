import React, { useEffect, useState } from 'react';
import Box from './Box';
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import InvoiceTableView from './InvoiceTableView';
import Header from './Header';
import Subheader from './SubHeader';
import TotalBillView from './TotalBillView';
import NavigationBar from './NavigationBar';
import BillOverviewBox from './BillOverviewBox';

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
            <Subheader  title ="BillOverview" />
            <NavigationBar /> 
            {/* Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BillOverviewBox/>
            </div>

            {/* Chart and Table Containers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft:'30px'}}>
                {/* Chart and Table Container */}
                <div style={{ display: 'flex', marginBottom: 20, paddingLeft:'42px'}}>
                    <BarChartContainer />
                    <div style={{ marginLeft: 20 }}>
                        <div style={{ border: '1px solid #ccc',marginTop :'15px' }}>
                            <InvoiceTableView />
                        </div>
                    </div>
                </div>

                {/* Pie Chart Container */}
                <div style={{ display: 'flex', marginBottom: 20, marginLeft:'-90px'}}> 
                    <PieChartContainer />
                    <div style={{ flex: 1, marginLeft: 20, marginTop:'16px' }}>
                        <div style={{ border: '1px solid #ccc'}}>
                            <TotalBillView/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillOverview;
