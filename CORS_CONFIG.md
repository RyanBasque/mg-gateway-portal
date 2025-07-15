# Configuração CORS para o Backend

## Problema Identificado

O erro de CORS acontece porque:
1. O frontend está enviando `credentials: 'include'` 
2. O backend está respondendo com `Access-Control-Allow-Origin: *`
3. Essa combinação não é permitida por segurança

## Soluções

### Solução 1: Backend com origem específica (RECOMENDADO)

Configure seu backend para aceitar origens específicas:

```javascript
// Para Express.js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',           // Desenvolvimento local (Vite)
    'http://localhost:3000',           // Desenvolvimento local (Create React App)
    'https://seu-app.vercel.app',      // Produção no Vercel
    'https://mg-gateway-portal.vercel.app' // Substitua pelo seu domínio real
  ],
  credentials: true,  // Permite cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Solução 2: Backend sem wildcard (ALTERNATIVA)

Se você não pode modificar o backend agora, configure assim:

```javascript
// Para Express.js - versão mais permissiva mas segura
const cors = require('cors');

app.use(cors({
  origin: true,  // Permite qualquer origem que envie credentials
  credentials: true
}));

// OU configuração manual
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

### Solução 3: Frontend sem credentials (IMPLEMENTADA)

✅ **JÁ IMPLEMENTADA** - Removemos o `credentials: 'include'` do frontend.

Isso resolve o problema imediato, mas você pode não conseguir:
- Enviar cookies de autenticação
- Usar sessões HTTP
- Acessar headers de autorização em algumas situações

## Para Produção no Vercel

Quando fizer deploy no Vercel, adicione o domínio correto no backend:

1. Vá no painel do Vercel e copie a URL do seu projeto
2. Adicione essa URL na configuração CORS do backend

Exemplo:
```javascript
origin: [
  'http://localhost:5173',
  'https://mg-gateway-portal-abc123.vercel.app'  // Sua URL real do Vercel
]
```

## Testando

Para testar se o CORS está funcionando:

1. Abra o console do navegador
2. Tente fazer login
3. Verifique se não há mais erros de CORS
4. Confirme que a requisição está sendo feita com sucesso

## Comandos para testar localmente

```bash
# Rodar o frontend
npm run dev

# Em outro terminal, testar a API diretamente
curl -X POST http://18.216.76.83:3001/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"email":"test@test.com","password":"123456"}' \
  -v
```

## Status Atual

✅ **Frontend**: Configuração CORS ajustada (sem credentials)
⏳ **Backend**: Precisa ser ajustado conforme as soluções acima
⏳ **Vercel**: Adicionar domínio na configuração CORS quando fizer deploy
