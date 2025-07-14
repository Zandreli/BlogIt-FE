import { create } from 'zustand';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface UserStoreType {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  initialize: () => void;
}

const useUser = create<UserStoreType>((set: (partial: Partial<UserStoreType>) => void) => ({
  user: null,
  token: null,

  setUser: (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  clearUser: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  initialize: () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  },
}));

export default useUser;
