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
            <div style={{marginLeft : '-12px', width :'200%'}}>
            <Subheader
                title={
                    <div>
                        <span style={{ fontSize: '18px' }}>Cost & Usage/</span>
                        <span style={{ color: '#0070C0', fontSize: '18px' }}>Bill Overview</span>
                    </div>
                }
            />
            </div>
           
            <NavigationBar /> 
            {/* Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BillOverviewBox/>
            </div>

            {/* Chart and Table Containers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft:'30px'}}>
                {/* Chart and Table Container */}
                <div style={{ display: 'flex', marginBottom: 20, paddingLeft:'45px', marginRight:'10px'}}>
                    <BarChartContainer />
                    <div style={{ marginTop:'10px'}}>
                        <div style={{ marginTop :'20px',paddingRight:'18px' }}>
                            <InvoiceTableView />
                        </div>
                    </div>
                </div>

                {/* Pie Chart Container */}
                <div style={{ display:'flex', marginBottom: 0, marginLeft:'42px', marginTop:'-40px'}}> 
                    <PieChartContainer />
                    <div style={{ flex: 1, marginLeft: '2px', marginTop:'-5px' }}>
                        <div style={{ paddingLeft:'0px', paddingRight:'10px'}}>
                            <TotalBillView/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillOverview;
