import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};



export default AdminRoute;
