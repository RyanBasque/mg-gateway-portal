# Configuração do Vercel - Instruções

## Configurar Variáveis de Ambiente no Vercel

Para que sua aplicação funcione corretamente em produção, você precisa configurar as variáveis de ambiente no Vercel:

### Método 1: Via Dashboard do Vercel

1. Acesse https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em "Settings" → "Environment Variables"
4. Adicione a variável:
   - **Name**: `VITE_API_URL`
   - **Value**: `http://18.216.76.83:3001` (ou a URL da sua API em produção)
   - **Environments**: Production, Preview, Development

### Método 2: Via CLI do Vercel

Se você tem o Vercel CLI instalado, pode executar:

```bash
vercel env add VITE_API_URL
# Digite: http://18.216.76.83:3001
# Selecione: Production, Preview, Development
```

### Método 3: Arquivo vercel.json (Recomendado)

Você pode adicionar no vercel.json, mas isso não é recomendado para URLs de produção por segurança.

## Depois de configurar

1. Faça um novo deploy:
   ```bash
   vercel --prod
   ```

2. Ou se preferir, faça um git push (se conectado ao GitHub):
   ```bash
   git add .
   git commit -m "Fix production API configuration"
   git push
   ```

## Verificação

Após o deploy, abra o console do navegador e verifique se:
- A URL da API está correta nos logs
- Não há mais erros de CORS ou "Failed to fetch"

## Notas Importantes

- Certifique-se de que sua API em `http://18.216.76.83:3001` está:
  - Rodando e acessível
  - Configurada para aceitar requisições CORS do domínio do Vercel
  - Com HTTPS habilitado (recomendado para produção)

### Configuração CORS na API (Backend)

Se sua API estiver dando erro de CORS, adicione estas configurações no backend:

```javascript
// Para Express.js
const cors = require('cors');
app.use(cors({
  origin: ['https://seu-dominio.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```
