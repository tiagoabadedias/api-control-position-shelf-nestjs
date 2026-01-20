# API Control Position Shelf - NestJS

API em NestJS para cálculo e processamento de comandos de controle de posição de prateleira, replicando a funcionalidade lógica da API Python original.

## Funcionalidades

- Cálculo de movimentação de prateleiras baseado em coordenadas
- Configuração personalizável de andares e posições
- Cálculo automático de movimentos necessários
- Suporte a comandos de pegar (P) e largar (L)
- Geração de comandos para motores
- Validação de entrada e tratamento de erros

## Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run build
npm run start:prod
```

## Configuração

A configuração atual está no arquivo `src/app.service.ts`:

- **Andares**: `{0: 0, 1: 100, 2: 496, 3: 838}`
- **Posições**: `{0: 0, 1: 350, 2: 560, 3: 770, 4: 980, 5: 1190, 6: 1200}`

## Endpoints

### POST /executar
Executa uma sequência de movimentos na prateleira.

**Body:**
```json
{
  "passos": [
    {
      "andar": 1,
      "posicao": 2,
      "movimento": "P"
    },
    {
      "andar": 2,
      "posicao": 3,
      "movimento": "L"
    }
  ]
}
```

**Response:**
```json
{
  "status": "ok",
  "execucao": [
    {
      "etapa": 1,
      "comando_enviado": "210X2-100X4/PEGAR"
    },
    {
      "etapa": 2,
      "comando_enviado": "210X2-342X4/LARGAR"
    }
  ],
  "estado_final": {
    "andar": 2,
    "posicao": 3
  }
}
```

### GET /status
Retorna o status atual da prateleira e configurações.

**Response:**
```json
{
  "estado_atual": {
    "andar": 0,
    "posicao": 0
  },
  "config": {
    "andares": {"0": 0, "1": 100, "2": 496, "3": 838},
    "posicoes": {"0": 0, "1": 350, "2": 560, "3": 770, "4": 980, "5": 1190, "6": 1200}
  },
  "arduino_conectado": false
}
```

## Códigos de Movimento

- **P**: Pegar item
- **L**: Largar item

## Códigos dos Motores

- **1**: Movimento X negativo (esquerda)
- **2**: Movimento X positivo (direita)  
- **3**: Movimento Y negativo (baixo)
- **4**: Movimento Y positivo (cima)

## Validações

- Andar deve estar presente na configuração
- Posição deve estar presente na configuração
- Movimento deve ser "P" ou "L" (case-insensitive)

## Diferenças da Versão Python

1. **Validação**: Utiliza class-validator para validação automática dos DTOs
2. **Tipagem**: TypeScript oferece tipagem estática
3. **Estrutura**: Arquitetura NestJS com módulos, controladores e serviços
4. **Comunicação Serial**: Removida a dependência do Arduino/comunicação serial
5. **Tratamento de erros**: Utiliza sistema de exceções do NestJS# api-control-position-shelf-nestjs
