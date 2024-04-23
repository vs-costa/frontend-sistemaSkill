import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    userId: number | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null); // Armazena o ID do usuário

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/systemUser/login', { email, password });
            const token = response.data.token;
            const userId = response.data.userId; // Certifique-se de que o backend está retornando o userId
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            setUserId(userId); // Atualiza o estado com o ID do usuário
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
