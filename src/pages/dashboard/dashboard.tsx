import DashboardHeader from '@/components/DashBoardHeader';
import DashboardSidebar from '@/components/DashBoardSideBar';
import TransactionHistory from '@/components/TransactionHistory';
import WalletOverview from '@/components/WalletOverview';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";



const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/signin');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <DashboardHeader />
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
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

        {/* Mobile Logout Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;