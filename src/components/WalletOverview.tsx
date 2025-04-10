import { useEffect } from 'react';
import { CreditCard, Clock, Copy, Landmark } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AddFundsModal from './AddFundsModal';
import { useTransactions } from '@/context/TransactionContext';
import WithdrawalModal from './WithdrawalModal';

const WalletOverview = () => {
  const {  balance, fetchBalance } = useAuth();
  const { fetchTransactions, currentPage } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleDepositSuccess = () => {
    fetchBalance();
    fetchTransactions(currentPage); // Pass the current page to maintain pagination state
  };

  return (
    <div className=" bg-[#F9F9F7] rounded-lg p-6 space-y-6 shadow-lg">
      {/* Actual Balance Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 font-medium">Actual Balance</div>
          <CreditCard className="text-gray-500 h-5 w-5" />
        </div>
        
      <div className="text-3xl font-bold">₦{balance.toLocaleString()!}<span className="text-gray-500 text-xl">.00</span></div>
        
        <div className="flex items-center text-sm">
          <Landmark className="h-4 w-4 text-gray-500 mr-2" />
          <div className="text-gray-600">Wema Bank 010 210 2020</div>
          <button className="ml-auto">
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="border-t border-dashed border-gray-300 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 font-medium">Pending Amount</div>
          <Clock className="text-gray-500 h-5 w-5" />
        </div>
        
        <div className="text-3xl font-bold">₦0<span className="text-gray-500 text-xl">.00</span></div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className=" bg-gray-100 hover:bg-[#FFDE02] text-[11px] border text-black px-4 py-2 rounded-lg "
        >
          Add Funds
        </button>

        <button 
          onClick={() => setIsWithdrawalModalOpen(true)}
          className="w-full py-3 px-4 text-[11px] bg-gray-100 border hover:bg-[#FFDE02] text-black font-medium rounded-md"
        >
          Withdrawal
        </button>

        <AddFundsModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleDepositSuccess}
        />

        <WithdrawalModal
          isOpen={isWithdrawalModalOpen}
          onClose={() => setIsWithdrawalModalOpen(false)}
          onSuccess={handleDepositSuccess}
        />
      </div>
      
      {/* Extra Options */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button className="py-2 text-center px-2 text-[11px] border text-gray-600 hover:bg-[#FFDE02] rounded-md">
          Transfer to Beam User
        </button>
        <button className="py-2 text-center px-2 text-[11px] border text-gray-600 hover:bg-[#FFDE02] rounded-md">
          Place Lien
        </button>
        <button className="py-2 text-center px-2 text-[11px] border text-gray-600 hover:bg-[#FFDE02] rounded-md">
          Freeze Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletOverview;