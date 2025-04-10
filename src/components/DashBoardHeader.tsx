
import { useAuth } from '@/context/AuthContext';
import { Search, Bell } from 'lucide-react';

const DashboardHeader = () => {

  const {user} = useAuth();
  return (
    <header className="border-b border-gray-200 py-4 px-6 bg-white">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-100 border border-transparent rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:bg-white focus:border-gray-300"
            placeholder="Search"
          />
        </div>
        
        {/* Right side items */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User info */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium">
              M
            </div>
            <div className="text-sm text-gray-700 font-medium">{user?.name}</div>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;