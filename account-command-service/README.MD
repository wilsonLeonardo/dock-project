# Account Command Service

## Descrição

O **Account Command Service** é responsável por gerenciar operações de criação, depósito, saque e fechamento de contas digitais no sistema Dock.

## Funcionalidades

### 1. Criar Conta

- **Endpoint**: `POST /account/v1/command/account`
- **Requisição**:
  - **Body**:
    ```json
    {
      "CPF": "string"
    }
    ```
- **Respostas**:
  - `201 Created`: Conta criada com sucesso.
  - `404 Not Found`: Portador não encontrado.
  - `409 Conflict`: CPF inválido ou não encontrado na API de carrier.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

### 2. Depósito

- **Endpoint**: `POST /account/v1/command/account/:CPF/deposit`
- **Requisição**:
  - **Body**:
    ```json
    {
      "amount": number
    }
    ```
- **Respostas**:
  - `204 No Content`: Depósito realizado com sucesso.
  - `404 Not Found`: Conta não encontrada.
  - `409 Conflict`: Conta bloqueada.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

### 3. Saque

- **Endpoint**: `POST /account/v1/command/account/:CPF/withdrawn`
- **Requisição**:
  - **Body**:
    ```json
    {
      "amount": number
    }
    ```
- **Respostas**:
  - `204 No Content`: Saque realizado com sucesso.
  - `403 Forbidden`: Saldo insuficiente.
  - `404 Not Found`: Conta não encontrada.
  - `409 Conflict`: Conta bloqueada ou limite diário excedido.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

### 4. Fechar Conta

- **Endpoint**: `POST /account/v1/command/account/:CPF/close`
- **Requisição**:
  - **Body**: (nenhum)
- **Respostas**:
  - `204 No Content`: Conta fechada com sucesso.
  - `404 Not Found`: Conta não encontrada.
  - `409 Conflict`: Conta já bloqueada.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

## Tecnologias Utilizadas

- **Linguagem de Programação**: Node.js com TypeScript
- **Princípios de Design**: SOLID, Clean Code e Clean Architecture
- **Banco de Dados**: DynamoDB
- **Mensageria**: Kafka

## Estrutura do Projeto

A aplicação foi projetada para otimizar operações de escrita, utilizando uma base de dados NoSQL (DynamoDB) para armazenar informações das contas e transações. A separação entre comandos e consultas (CQRS) garante que o desempenho da leitura não seja afetado por operações de escrita e vice versa. Além disso, aplicação foi desenvolvida com foco em isolamento de componentes, facilitando testes unitários e garantindo alta manutenibilidade.
