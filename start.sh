#!/bin/bash

# Script para inicializar a API NestJS de controle de posição de prateleira

echo "🚀 Iniciando API NestJS Control Position Shelf"
echo "==============================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale o npm primeiro."
    exit 1
fi

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar dependências"
        exit 1
    fi
else
    echo "✅ Dependências já instaladas"
fi

# Verificar se existe build
if [ ! -d "dist" ]; then
    echo "🔨 Compilando aplicação..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao compilar aplicação"
        exit 1
    fi
fi

echo "✅ Tudo pronto!"
echo ""
echo "Para iniciar a aplicação:"
echo "  npm run start:dev  (modo desenvolvimento)"
echo "  npm run start:prod (modo produção)"
echo ""
echo "A API estará disponível em: http://localhost:3000"
echo ""
echo "Endpoints disponíveis:"
echo "  POST /executar - Executar sequência de movimentos"
echo "  GET  /status   - Status atual da prateleira"
echo "  POST /reconectar-arduino - Reconectar com Arduino"