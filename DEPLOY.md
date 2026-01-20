# Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel como serverless function.

## Estrutura para Vercel

A aplicação foi estruturada especificamente para o Vercel:
- `api/index.ts` - Entry point para serverless function
- `vercel.json` - Configuração do Vercel
- `src/` - Código fonte da aplicação NestJS

## Como funciona

O Vercel irá:
1. Detectar o arquivo `api/index.ts` como serverless function
2. Instalar as dependências automaticamente
3. Compilar o TypeScript
4. Rotear todas as requisições para a function

## Deploy

1. Faça commit das mudanças
2. Push para o repositório
3. O Vercel fará deploy automaticamente

## Testando após deploy

Os endpoints estarão disponíveis em:
- `POST https://your-app.vercel.app/executar`
- `GET https://your-app.vercel.app/status`

## Troubleshooting

Se receber erro 404:
1. Verifique se o `vercel.json` está configurado corretamente
2. Certifique-se que o `api/index.ts` existe
3. Verifique os logs no dashboard do Vercel