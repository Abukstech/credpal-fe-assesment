import { balanceResponse, LoginResponse, StandardResponse, transactionsResponse } from '@/types/standardResponse';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response;
  },
  
  signup: (userData: { email: string; password: string; name: string }) => 
    api.post<StandardResponse>('/auth/register', userData),
  
  getBalance: () => api.get<balanceResponse>('/user/balance'),

  getTransactions: (page: number) => api.get<transactionsResponse>(`/transactions/history?page=${page}&limit=5`),
  
  logout: () => {
    localStorage.removeItem('token');
    return api.post<StandardResponse>('/auth/logout');
  },
  
  createTransaction: (data: { type: string; amount: number, recieverId?: number }) => 
    api.post<StandardResponse>('/transactions', data),
};

export default api;

