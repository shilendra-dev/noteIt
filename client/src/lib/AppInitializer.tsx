import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Call store methods directly to avoid dependency issues
    useAuthStore.getState().validateSession();
  }, []); // Empty dependency array - only runs once

  return <>{children}</>;
}
