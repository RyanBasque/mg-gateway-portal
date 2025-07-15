import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      const result = await api.login(email, password);
      console.log('API result:', result);
      
      if (result.success) {
        console.log('Result data:', result.data);
        
        // Verificar se a resposta tem a estrutura esperada
        if (result.data && (result.data.token || result.data.user)) {
          const token = result.data.token || 'fake-token';
          const userData = result.data.user || result.data;
          
          console.log('Setting token:', token);
          console.log('Setting user:', userData);
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
          
          setUser(userData);
          return { success: true };
        } else {
          // Se a API não retorna a estrutura esperada, usar os dados diretamente
          console.log('Using data directly:', result.data);
          
          localStorage.setItem('token', 'temp-token');
          localStorage.setItem('user', JSON.stringify(result.data));
          
          setUser(result.data);
          return { success: true };
        }
      } else {
        throw new Error(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, username) => {
    try {
      setIsLoading(true);
      
      const result = await api.register(email, password, username);
      
      if (result.success) {
        const { token, user: userData } = result.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      } else {
        throw new Error(result.error || 'Erro ao criar conta');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  console.log('AuthContext value:', {
    user,
    isLoading,
    isAuthenticated: !!user
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
