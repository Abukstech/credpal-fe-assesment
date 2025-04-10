import DashboardHeader from '@/components/DashBoardHeader';
import DashboardSidebar from '@/components/DashBoardSideBar';
import TransactionHistory from '@/components/TransactionHistory';
import WalletOverview from '@/components/WalletOverview';
import React from 'react';


const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-3">Wallet</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 px-4  pb-5 border-y-1 pt-4  border-[#C8CBD9] ">
            {/* WalletOverview section */}
            <div className="lg:col-span-2 border-r border-[#C8CBD9] pr-6">
              <WalletOverview />
            </div>
            
            {/* Transaction History section */}
            <div className="lg:col-span-4 ">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;