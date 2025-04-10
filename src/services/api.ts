import { balanceResponse, LoginResponse, StandardResponse, transactionsResponse } from '@/types/standardResponse';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);




export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    api.post<LoginResponse>('/auth/login', credentials),
  
  signup: (userData: { email: string; password: string; name: string }) => 
    api.post<StandardResponse>('/auth/register', userData),
  
  getBalance: () => api.get<balanceResponse>('/user/balance'),

  

  getTransactions: (page:number) => api.get<transactionsResponse>(`/transactions/history?page=${page}&limit=5`),
  
  logout: () => api.post<StandardResponse>('/auth/logout'), // Add this new logout endpoint
  
  createTransaction: (data: { type: string; amount: number , recieverId?:number}) => 
    api.post<StandardResponse>('/transactions', data),
};

export default api;

