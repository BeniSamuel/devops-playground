import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'customer' | 'banker';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

// Mock users database (in real app, this would be an API)
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@nziza.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'customer@nziza.com',
    password: 'customer123',
    name: 'John Doe',
    role: 'customer',
  },
  {
    id: '3',
    email: 'banker@nziza.com',
    password: 'banker123',
    name: 'Jane Banker',
    role: 'banker',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      signup: async (email: string, password: string, name: string, role: UserRole) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Check if user already exists
        if (mockUsers.find((u) => u.email === email)) {
          return false;
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role,
        };

        mockUsers.push({ ...newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

