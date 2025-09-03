import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { me } from '../api/me';

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  emailVerified?: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  clearUser: () => void;
  validateSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      validateSession: async () => {
        try {
          const { data } = await me();

          if (data?.session && data?.user) {
            set({
              user: data.user,
              isAuthenticated: true,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error('Session validation error:', error);
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
