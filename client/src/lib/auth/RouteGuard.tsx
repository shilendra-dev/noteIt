import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';

interface RouteConfig {
  public?: boolean;
  // Future: permissions support
  // permissions?: string[];
}

interface RouteGuardProps {
  config?: RouteConfig;
  children: React.ReactNode;
}

export function RouteGuard({ config, children }: RouteGuardProps) {
  const { isAuthenticated } = useAuth();

  // Public route - allow access
  if (config?.public) {
    return <>{children}</>;
  }

  // Protected route - require authentication
  if (!isAuthenticated) {
    return <Navigate to='/auth/signin' replace />;
  }

  // Future: Permission checking
  // if (config?.permissions && !hasAnyPermission(config.permissions)) {
  //   return <Navigate to="/access-denied" replace />;
  // }

  return <>{children}</>;
}
