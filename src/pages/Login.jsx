import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import './Login.css';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Debug: mostrar informações do ambiente
    console.log('Environment:', {
      NODE_ENV: import.meta.env.MODE,
      API_URL: import.meta.env.VITE_API_URL,
      BASE_URL: window.location.origin
    });

    console.log('Tentando fazer login com:', { email, password });
    const result = await login(email, password);
    
    console.log('Login result:', result);
    console.log('Result success:', result.success);
    console.log('Tipo do result.success:', typeof result.success);
    
    if (result.success === true) {
      console.log('Login bem-sucedido, aguardando estado atualizar...');
      
      // Pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        console.log('Navegando para dashboard...');
        navigate('/dashboard');
      }, 100);
    } else {
      console.log('Login falhou:', result.error);
      setError(result.error || 'Erro desconhecido no login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 100 40" className="logo-svg">
              <path d="M10 20 L30 10 L50 20 L30 30 Z" fill="#4A90E2" />
              <path d="M30 10 L50 5 L70 15 L50 20 Z" fill="#4A90E2" />
              <text x="75" y="25" fontSize="18" fill="#4A90E2" fontWeight="bold">Liber</text>
            </svg>
          </div>
        </div>

        <h1 className="login-title">Entrar no portal</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              <strong>Erro:</strong> {error}
              <br />
              <small>
                Verifique sua conexão e tente novamente. 
                {import.meta.env.MODE === 'development' && (
                  <>
                    <br />
                    <strong>Debug:</strong> API URL = {import.meta.env.VITE_API_URL}
                  </>
                )}
              </small>
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'ENTRANDO...' : 'ENTRAR NO PORTAL'}
          </button>
        </form>

        <div className="register-link">
          <span>Não tem uma conta? </span>
          <Link to="/register">Cadastre-se aqui</Link>
        </div>
      </div>

      <footer className="login-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg viewBox="0 0 100 40" className="footer-logo-svg">
              <path d="M10 20 L30 10 L50 20 L30 30 Z" fill="#666" />
              <path d="M30 10 L50 5 L70 15 L50 20 Z" fill="#666" />
              <text x="75" y="25" fontSize="18" fill="#666" fontWeight="bold">Liber</text>
            </svg>
          </div>
          <div className="footer-info">
            <div className="contact-title">CONTATO</div>
            <div className="contact-email">contato@libercapital.com.br</div>
            <div className="contact-whatsapp">Fale conosco no WhatsApp</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
