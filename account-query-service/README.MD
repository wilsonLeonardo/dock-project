# Account Query Service

## Descrição

O **Account Query Service** é responsável por gerenciar consultas relacionadas às contas digitais da Dock. Este serviço permite buscar detalhes da conta e acessar extratos, proporcionando uma interface de leitura otimizada e eficiente.

## Funcionalidades

### 1. Buscar Conta

- **Endpoint**: `GET /account/v1/query/account/:CPF/details`
- **Parâmetros**:
  - `CPF`: CPF do portador da conta.
- **Respostas**:
  - `200 OK`: Conta encontrada com sucesso.
    - **Exemplo de Retorno**:
    ```json
    {
      "holderCpf": "27767254003",
      "balance": 110,
      "accountNumber": "779438",
      "agency": "678863",
      "isBlocked": false,
      "createdAt": "2024-09-20T02:22:13.120Z",
      "updatedAt": "2024-09-20T02:22:13.121Z"
    }
    ```
  - `409 Conflict`: CPF inválido.
  - `404 Not Found`: Conta não encontrada.

### 2. Buscar Extrato da Conta

- **Endpoint**: `GET /account/v1/query/account/:CPF/statements`
- **Parâmetros**:
  - `CPF`: CPF do portador da conta.
- **Respostas**:
  - `200 OK`: Extrato encontrado com sucesso.
    - **Exemplo de Retorno**:
    ```json
    {
      "statements": [
        {
          "transactionDate": "2024-09-19T20:34:09.858Z",
          "transactionType": "DEPOSIT",
          "amount": 30
        },
        {
          "transactionDate": "2024-09-19T20:47:45.367Z",
          "transactionType": "DEPOSIT",
          "amount": 80
        },
        {
          "transactionDate": "2024-09-19T20:48:18.292Z",
          "transactionType": "WITHDRAWAL",
          "amount": 20
        }
      ]
    }
    ```
  - `409 Conflict`: CPF inválido.
  - `404 Not Found`: Conta não encontrada.

## Estrutura do Banco de Dados

As seguintes tabelas são utilizadas para armazenar os dados das contas e extratos:

```sql
CREATE TABLE IF NOT EXISTS accounts (
    holder_cpf VARCHAR(11) PRIMARY KEY,
    balance FLOAT NOT NULL,
    account_number VARCHAR(20) NOT NULL,
    agency VARCHAR(20) NOT NULL,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS account_statements (
    id SERIAL PRIMARY KEY,
    holder_cpf VARCHAR(11) NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    amount FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (holder_cpf) REFERENCES accounts(holder_cpf) ON DELETE CASCADE
);
```

## Tecnologias Utilizadas

- **Linguagem de Programação**: Node.js com TypeScript
- **Princípios de Design**: SOLID, Clean Code e Clean Architecture
- **Banco de Dados**: PostgreSQL

## Estrutura do Projeto

A aplicação foi projetada para otimizar operações de leitura, utilizando uma base de dados relacional (PostgreSQL) para armazenar informações das contas e extratos. A separação entre comandos e consultas (CQRS) garante que o desempenho da leitura não seja afetado por operações de escrita e vice versa. Além disso, aplicação foi desenvolvida com foco em isolamento de componentes, facilitando testes unitários e garantindo alta manutenibilidade.
