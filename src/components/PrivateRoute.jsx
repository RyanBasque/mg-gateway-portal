import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('PrivateRoute - isLoading:', isLoading);
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - user:', user);

  if (isLoading) {
    console.log('PrivateRoute - Mostrando loading...');
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('PrivateRoute - Usuário autenticado, renderizando children');
    return children;
  } else {
    console.log('PrivateRoute - Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
