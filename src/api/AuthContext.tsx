import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    userId: number | null;
}

export const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`Token adicionado aos cabeçalhos: ${token}`);
        }
        return config;
    },
    error => Promise.reject(error)
);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/systemUser/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            setIsAuthenticated(true);
            setUserId(response.data.userId);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        const tokenRemoved = !localStorage.getItem('token');
        if (tokenRemoved) {
            setIsAuthenticated(false);
            setUserId(null);
            console.log('Token removido com sucesso.');
        } else {
            console.warn('Falha ao remover o token.');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
