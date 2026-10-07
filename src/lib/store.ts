import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  status: 'ACTIVE' | 'SUSPENDED';
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get('token') || null,
  setUser: (user, token) => {
    if (token) {
      Cookies.set('token', token, { expires: 7 });
    }
    set({ user, token: token || Cookies.get('token') || null });
  },
  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null });
  },
}));
