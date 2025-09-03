import { useAuthStore } from '../../stores/authStore.js';

export function useAuth() {
  const { user, isAuthenticated } = useAuthStore();

  // authentication check
  const isLoggedIn = isAuthenticated && !!user;

  return {
    user,
    isAuthenticated: isLoggedIn,
  };
}
