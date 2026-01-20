# Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

## Configuração

O arquivo `vercel.json` está configurado para:
- Detectar a aplicação como Node.js
- Usar o diretório `dist` como output
- Rotear todas as requisições para `dist/main.js`

## Scripts

- `npm run build` - Compila a aplicação para produção
- `npm run start` - Inicia a aplicação compilada
- `npm run vercel-build` - Script específico para o build no Vercel

## Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis no Vercel (se necessário):
- `NODE_ENV=production`

## Deploy

1. Conecte seu repositório ao Vercel
2. O Vercel detectará automaticamente as configurações
3. O deploy será feito automaticamente a cada push

## Endpoints da API

Após o deploy, os endpoints estarão disponíveis em:
- `POST https://your-app.vercel.app/executar`
- `GET https://your-app.vercel.app/status`