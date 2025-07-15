# Portal Liber - Aplicação React

Uma aplicação React moderna com autenticação, roteamento e design responsivo baseado no design da Liber Capital.

## 🚀 Funcionalidades

- ✅ **Autenticação completa** com login e registro
- ✅ **Context API** para gerenciamento de estado (`useAuth`)
- ✅ **Rotas protegidas** com React Router
- ✅ **Design responsivo** fiel ao mockup original
- ✅ **Integração com API** para login e registro
- ✅ **Persistência de sessão** com localStorage

## 🛠️ Tecnologias

- React 19.1.0
- React Router DOM 7.6.3
- Vite (build tool)
- CSS modular

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn
- API rodando em `http://localhost:3001`

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```

4. Acesse `http://localhost:5173`

## 🔌 API Endpoints

A aplicação faz requisições para os seguintes endpoints:

### Login
- **Rota:** `POST http://localhost:3001/login`
- **Payload:**
  ```json
  {
    "email": "liber@liber.com",
    "password": "liber123"
  }
  ```

### Registro
- **Rota:** `POST http://localhost:3001/register`
- **Payload:**
  ```json
  {
    "email": "liber@liber.com",
    "password": "liber123",
    "username": "liber"
  }
  ```

## 🔐 Credenciais de Teste

Para testar a aplicação:

- **Email:** `liber@liber.com`
- **Senha:** `liber123`
- **Username:** `liber`+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
