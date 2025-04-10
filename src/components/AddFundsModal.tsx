import { useState } from 'react';
import { X } from 'lucide-react';
import { authAPI } from '@/services/api';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddFundsModal = ({ isOpen, onClose, onSuccess }: AddFundsModalProps) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || !selectedMethod) return;
    
    setIsLoading(true);
    try {
      await authAPI.createTransaction({
        type: 'deposit',
        amount: Number(amount)
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0303034D] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Payment Option</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter amount"
            />
          </div>

          <button 
            className={`w-full p-4 border rounded-lg flex items-center justify-between ${
              selectedMethod === 'bank' ? 'border-[#FFDE02]' : ''
            } hover:bg-gray-50`}
            onClick={() => setSelectedMethod('bank')}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M1 10h22" />
                </svg>
              </div>
              <span>Bank Transfer</span>
            </div>
            <input 
              type="radio" 
              name="payment" 
              checked={selectedMethod === 'bank'}
              className="w-4 h-4" 
            />
          </button>

          <button className="w-full p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h10" />
                </svg>
              </div>
              <span>Add Debit/Credit Card</span>
            </div>
            <input type="radio" name="payment" className="w-4 h-4" />
          </button>

          <button className="w-full p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span>Add Payment Method</span>
            </div>
          </button>

          <button 
            className="w-full py-3 bg-[#FFDE02] text-black font-medium rounded-lg mt-6 disabled:opacity-50"
            onClick={handleDeposit}
            disabled={!amount || !selectedMethod || isLoading}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;