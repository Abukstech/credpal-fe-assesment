import React, { createContext, useContext, useState } from 'react';

import { authAPI } from '@/services/api';
import { Transaction } from '@/types/transaction';

interface TransactionContextType {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  fetchTransactions: (page: number) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await authAPI.getTransactions(page);
      setTransactions(response.data.data?.data!);
      setTotalPages(response.data.data?.meta?.totalPages!);
      setCurrentPage(response.data.data?.meta?.currentPage!);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      currentPage,
      totalPages,
      isLoading,
      fetchTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};