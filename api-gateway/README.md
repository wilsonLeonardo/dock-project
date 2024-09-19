# API Gateway

## Descrição

O **API Gateway** atua como a porta de entrada para serviços da conta digital da Dock, fornecendo uma interface unificada para interagir com os serviços de comando e consulta das contas digitais. Ele encapsula a complexidade dos serviços internos e facilita a comunicação entre o cliente e as APIs subjacentes.

## Funcionalidades

O API Gateway roteia as requisições para os serviços correspondentes com base nos endpoints definidos:

- **Roteamento de Comandos**:

  - **Endpoint**: `/account/v1/command`
    - Encaminha para o **Account Command Service**.

- **Roteamento de Consultas**:
  - **Endpoint**: `/account/v1/query`
    - Encaminha para o **Account Query Service**.
