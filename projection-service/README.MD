# Projection Service

## Descrição

O **Projection Service** é responsável por consumir mensagens do Kafka e criar as projeções necessárias para que os dados das contas e extratos estejam disponíveis para consultas. Este serviço aplica o conceito de Event Sourcing, permitindo que os dados sejam derivados diretamente dos eventos que ocorreram no sistema.

## Funcionalidades

O serviço realiza as seguintes funções:

- **Consumo de Eventos**: Escuta eventos do Kafka, como `AccountCreated`, `AccountDeposited`, `AccountWithdrawn` e `AccountClosed`.
- **Persistência das Projeções**: Armazena os dados em uma base de dados relacional (PostgreSQL) para consultas rápidas.

### Estrutura do Banco de Dados

O Projection Service utiliza as seguintes tabelas:

1. **Tabela de Contas**:
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
   ```
2. **Tabela de Extratos**:

   ```sql
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
- **Mensageria**: Kafka
- **Banco de Dados**: PostgreSQL

## Estrutura do Projeto

O Projection Service foi projetado para ser modular e desacoplado, facilitando a adição de novas funcionalidades no futuro. Ao utilizar Event Sourcing, o serviço garante que todos os estados das contas possam ser reconstruídos a partir dos eventos, proporcionando auditabilidade e rastreabilidade.
