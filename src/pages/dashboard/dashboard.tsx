import DashboardHeader from '@/components/DashBoardHeader';
import DashboardSidebar from '@/components/DashBoardSideBar';
import TransactionHistory from '@/components/TransactionHistory';
import WalletOverview from '@/components/WalletOverview';
import React from 'react';


const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="lg:hidden">
        <DashboardHeader />
      </div>
      <div  className="hidden lg:block" >
      <DashboardSidebar/>
      </div>
   
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Only show on desktop */}
        <div className="hidden lg:block">
          <DashboardHeader />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6">
          <h1 className="text-xl lg:text-2xl font-semibold mb-3">Wallet</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6 pb-5 border-y-1 pt-4 border-[#C8CBD9]">
            <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[#C8CBD9] pb-4 lg:pb-0 lg:pr-6">
              <WalletOverview />
            </div>
            
            <div className="lg:col-span-4 lg:pl-6 overflow-x-auto">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;