#!/bin/bash

# Script para deploy no Vercel com configuração de ambiente

echo "🚀 Preparando deploy para o Vercel..."

# Verificar se as variáveis de ambiente estão configuradas
if [ -z "$VITE_API_URL" ]; then
  echo "⚠️  VITE_API_URL não está configurada no ambiente local"
  echo "📝 Certifique-se de configurar no Vercel Dashboard:"
  echo "   https://vercel.com/dashboard → seu-projeto → Settings → Environment Variables"
  echo "   Nome: VITE_API_URL"
  echo "   Valor: http://18.216.76.83:3001"
else
  echo "✅ VITE_API_URL configurada: $VITE_API_URL"
fi

# Build local para verificar se está tudo ok
echo "🔨 Fazendo build local para verificar..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build local bem-sucedido!"
  
  # Se tem vercel CLI instalado, fazer deploy
  if command -v vercel &> /dev/null; then
    echo "🚀 Fazendo deploy no Vercel..."
    vercel --prod
  else
    echo "📦 Vercel CLI não encontrado."
    echo "💡 Você pode:"
    echo "   1. Instalar: npm i -g vercel"
    echo "   2. Ou fazer push no GitHub (se conectado ao Vercel)"
  fi
else
  echo "❌ Build falhou. Corrija os erros antes do deploy."
  exit 1
fi
