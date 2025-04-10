
import { Link } from 'react-router-dom';
import { LayoutGrid, Users, ShoppingCart, BarChart3, ArrowRightLeft, Wallet, Bell, Settings, LogOut, HelpCircle } from 'lucide-react';
import logo from "../assets/Logo.svg"

const DashboardSidebar = () => {
  // Define menu items for the sidebar
  const mainMenuItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Customers', path: '/dashboard' },
    { icon: ShoppingCart, label: 'Spot Orders', path: '/dashboard' },
    { icon: BarChart3, label: 'Margin Orders', path: '/dashboard' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/dashboard' },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet', active: true },
  ];

  const otherMenuItems = [
    { icon: Bell, label: 'Notification', path: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: LogOut, label: 'Logout', path: '/logout' },
    { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
  ];

  return (
    <div className="w-60 bg-black text-white flex flex-col min-h-screen">
      {/* Brand logo */}
      <div className="p-5 flex items-center">
        <div className="bg-beam-gold rounded-full w-8 h-8 flex justify-center items-center text-beam-dark font-bold">
      <img src={logo}/>
        </div>
        <span className="ml-2 font-semibold text-lg">BEAM</span>
      </div>
      
      {/* Divider */}
      <div className="border-t px-4 border-gray-800"></div>
      
      {/* Main menu section */}
      <div className="p-5">
        <div className="text-xs font-medium text-gray-400 mb-4">MAIN</div>
        <nav>
          <ul className="space-y-2">
            {mainMenuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 py-2 px-3 rounded-md ${item.active ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                >
                  <item.icon size={18} className={`${item.active ? 'text-[#FFDE02]' : 'text-gray-400'}`} />
                  <span className={`${item.active ? 'text-[#FFDE02] font-medium' : 'text-gray-400'}`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-800 my-2 mx-5"></div>
      
      {/* Others section */}
      <div className="p-5">
        <div className="text-xs font-medium text-gray-400 mb-4">OTHERS</div>
        <nav>
          <ul className="space-y-2">
            {otherMenuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-800"
                >
                  <item.icon size={18} className="text-gray-400" />
                  <span className="text-gray-400">{item.label}</span>
                </Link>
              </li>
            ))}
            <div className="mt-8">
        <div className="flex items-center justify-between bg-white p-3 rounded-md">
          <span className="text-sm text-gray-400">Switch to dark mode</span>
          <div className="w-10 h-5 bg-gray-700 rounded-full p-1 flex items-center">
            <div className="bg-white w-3 h-3 rounded-full"></div>
          </div>
        </div>
      </div>
          </ul>
          
        </nav>
        
      </div>
      
      {/* Theme toggle at the bottom */}
      
    </div>
  );
};

export default DashboardSidebar;