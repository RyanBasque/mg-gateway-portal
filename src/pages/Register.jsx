import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmarPassword) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.password !== formData.confirmarPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const result = await register(formData.email, formData.password, formData.username);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 100 40" className="logo-svg">
              <path d="M10 20 L30 10 L50 20 L30 30 Z" fill="#4A90E2" />
              <path d="M30 10 L50 5 L70 15 L50 20 Z" fill="#4A90E2" />
              <text x="75" y="25" fontSize="18" fill="#4A90E2" fontWeight="bold">Liber</text>
            </svg>
          </div>
        </div>

        <h1 className="register-title">Criar conta</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Nome de usuário <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarPassword" className="form-label">
              Confirmar senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleInputChange}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
          </button>
        </form>

        <div className="login-link">
          <span>Já tem uma conta? </span>
          <Link to="/login">Faça login</Link>
        </div>
      </div>

      <footer className="register-footer">
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

export default Register;
