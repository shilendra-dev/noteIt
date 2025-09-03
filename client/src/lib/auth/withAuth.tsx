import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  const WrappedComponent = (props: T) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to='/signin' replace />;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
