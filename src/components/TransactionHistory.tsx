import  { useState } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

import { useTransactions } from '@/context/TransactionContext';
import { useEffect } from 'react';
import TableSkeleton from './TableSkeleton';

// Define the transaction data type


const TransactionHistory = () => {

  const { transactions, currentPage, totalPages, isLoading, fetchTransactions } = useTransactions();

 

  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.status === activeFilter.toLowerCase();
  });

  const handlePageChange = (page: number) => {
    fetchTransactions(page);
  };


  
  return (
    <div className=" bg-white dark:bg-gray-800 lg:bg-none border-gray-200 lg:min-w-3xl">
      <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-[#1F384C] mb-2">Transaction History</h2>
            <div className="flex items-center space-x-2 lg:space-x-4 overflow-x-auto">
              <div className="flex">
                {['all', 'approved', 'pending'].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-1.5 text-[12px] ${activeFilter === filter 
                      ? 'bg-gray-100 text-gray-800 font-medium' 
                      : 'text-gray-600'} rounded-md`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
                <button className="px-4 py-1.5 border border-gray-300 rounded-md text-[12px] font-medium">
                  History
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-5">
            <span className="text-sm text-gray-600 mr-2">Filter by</span>
            <select className="border border-gray-300 rounded-md px-2 py-1.5 text-sm">
              <option>Spot</option>
            </select>
          </div>
        </div>
        
        {/* Transaction Table with increased spacing */}

        <div className="overflow-x-auto -mx-4 lg:mx-0">
      <div className="min-w-[800px] lg:w-full">
        
      </div>
    </div>
         
        {isLoading ? (
          <TableSkeleton />
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4">
              <svg className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500 mb-6">There are no transactions to display at the moment.</p>
            <button 
              onClick={() => fetchTransactions(1)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Refresh transactions
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 lg:mx-0">
      <div className="min-w-[800px] lg:w-full">
        {/* Your existing table code */}
   
        <>
        
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              <TableHead className="py-4">Transaction ID</TableHead>
              <TableHead className="py-4">Transaction Type</TableHead>
              <TableHead className="py-4">Amount (₦)</TableHead>
              <TableHead className="py-4">Status</TableHead>
              <TableHead className="py-4">Date</TableHead>
              <TableHead className="py-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction, index) => (
              <TableRow key={index} className="dhover:bg-gray-50">
                <TableCell className="font-medium py-4">{transaction.transactionId}</TableCell>
                <TableCell className="py-4">{transaction.type.toLocaleUpperCase()}</TableCell>
                <TableCell className="py-4">₦{transaction.amount.toLocaleString()!}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      transaction.status === 'approved' ? 'bg-green-500' :
                      transaction.status === 'liquidated' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    {transaction.status}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell className="py-4">
                  <button className="text-blue-600 hover:underline">View</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-end gap-5 mt-4">
         
          
          <div className="flex items-center gap-2">
           
            <div className="flex items-center gap-5">
              <div>
              <span className="text-sm text-gray-600">Page</span>
              <span className="px-3 py-1 text-sm">{currentPage} of {totalPages}</span>
              </div>
         
              <div className={`px-3 py-1  ${currentPage === 1 ? 'border-1 border-[#FFC130]'  : ''}`}>
<span                   >{currentPage}</span>
              </div>
              <div className=" border border-gray-200 rounded flex gap-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300'  : 'text-gray-600'}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 border-l border-gray-200 hover:bg-gray-50 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
        </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default TransactionHistory;