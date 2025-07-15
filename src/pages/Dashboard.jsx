import React from 'react';

import { useAuth } from '../contexts/AuthContext';

import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <svg viewBox="0 0 100 40" className="logo-svg">
              <path d="M10 20 L30 10 L50 20 L30 30 Z" fill="#4A90E2" />
              <path d="M30 10 L50 5 L70 15 L50 20 Z" fill="#4A90E2" />
              <text x="75" y="25" fontSize="18" fill="#4A90E2" fontWeight="bold">Liber</text>
            </svg>
          </div>
          
          <div className="user-menu">
            <div className="user-info">
              <span className="user-name">{user?.username}</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Bem-vindo ao Portal, {user?.username}!
          </h1>
          <p className="welcome-subtitle">
            Acesse todas as funcionalidades do seu portal de forma rápida e segura.
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M3 9L12 15L21 9" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="card-title">Mensagens</h3>
            <p className="card-description">
              Visualize suas mensagens e notificações importantes
            </p>
            <button className="card-button">Acessar</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M14 2V8H20" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M16 13H8" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M16 17H8" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M10 9H8" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="card-title">Documentos</h3>
            <p className="card-description">
              Gerencie seus documentos e contratos
            </p>
            <button className="card-button">Acessar</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4A90E2" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="card-title">Histórico</h3>
            <p className="card-description">
              Consulte seu histórico de transações e atividades
            </p>
            <button className="card-button">Acessar</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4A90E2" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="card-title">Perfil</h3>
            <p className="card-description">
              Gerencie suas informações pessoais e configurações
            </p>
            <button className="card-button">Acessar</button>
          </div>
        </div>

        <div className="quick-stats">
          <h2 className="stats-title">Resumo da Conta</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">R$ 0,00</div>
              <div className="stat-label">Saldo Disponível</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Transações Hoje</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Mensagens Não Lidas</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
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

export default Dashboard;
