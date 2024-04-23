import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';


interface ProtectedRouteProps {
 children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
 const { isAuthenticated } = useAuth();
 const location = useLocation();

 if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} />;
 }

 return <>{children}</>;
};

export default ProtectedRoute;
