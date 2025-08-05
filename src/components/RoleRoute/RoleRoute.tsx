import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  children: JSX.Element;
  allowedRoles: Array<'travailleur' | 'etablissement' | 'admin'>;
}

const RoleRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(role as any)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleRoute;
