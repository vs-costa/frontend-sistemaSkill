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
        console.log('Usuário não autenticado, redirecionando para a página inicial.');
        return <Navigate to="/" state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
