# Carrier Service

## Descrição

O **Carrier Service** é responsável por gerenciar portadores no sistema de contas digitais da Dock. Esta aplicação permite a criação, remoção e busca de portadores, garantindo que as informações sejam gerenciadas de forma segura e eficiente.

## Funcionalidades

### 1. Criar Portador

- **Endpoint**: `POST /carrier/v1/carrier`
- **Requisição**:
  - **Body**:
    ```json
    {
      "CPF": "string",
      "Name": "string"
    }
    ```
- **Respostas**:
  - `201 Created`: Portador criado com sucesso.
  - `400 Bad Request`: Campos no formato errado ou ausentes.
  - `409 Conflict`: CPF já cadastrado.
  - `422 Unprocessable Entity Error`: CPF mal formatado.
  - `500 Internal Server Error`: Erro no servidor.

### 2. Deletar Portador

- **Endpoint**: `DELETE /carrier/v1/carrier/:CPF`
- **Parâmetros**:
  - `CPF`: CPF do portador a ser removido.
- **Respostas**:
  - `202 Accepted`: Portador removido com sucesso.
  - `400 Bad Request`: CPF em formato inválido.
  - `404 Not Found`: Portador não encontrado.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

### 3. Buscar Portador

- **Endpoint**: `GET /carrier/v1/carrier/:CPF`
- **Parâmetros**:
  - `CPF`: CPF do portador a ser buscado.
- **Respostas**:
  - `200 OK`: Portador encontrado.
  - `400 Bad Request`: CPF em formato inválido.
  - `404 Not Found`: Portador não encontrado.
  - `422 Unprocessable Entity Error`: CPF mal formatado.

## Tecnologias Utilizadas

- **Linguagem de Programação**: Node.js com TypeScript
- **Princípios de Design**: SOLID e Clean Code
- **Banco de Dados**: DynamoDB

## Estrutura do Projeto

A aplicação foi desenvolvida com foco em isolamento de componentes, facilitando testes unitários e garantindo alta manutenibilidade.
