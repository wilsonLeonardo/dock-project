# Dock Digital Account Project  

## Problem Description  

Dock aims to revolutionize the financial market with a new digital account that allows its customers to perform transactions securely and efficiently. The challenge is to manage digital account holders and their transactions while ensuring data integrity and consistency, all while providing a seamless user experience.  

## Proposed Solution  

The solution was built using **CQRS (Command Query Responsibility Segregation)** and **Event Sourcing** patterns. These concepts enable the separation of write operations (commands) from read operations (queries), resulting in a more scalable and responsive system.  

### Advantages of CQRS and Event Sourcing:  

1. **Scalability**: CQRS allows the system to scale independently for read and write operations, which is crucial in high-demand environments.  
2. **Auditability**: Event Sourcing stores all state changes as events, enabling full auditability and traceability.  
3. **Performance**: The separation of queries and commands allows for specific optimizations for each type of operation, improving overall performance.  
4. **Flexibility**: New features can be added to the system without requiring major restructuring.  

## Architecture Diagram  

![Architecture Diagram](./dock-case-architecture.png)  

## System Architecture  

The system architecture consists of the following services:  

### 1. Carrier Service  

- **Description**: Manages account holders (owners of digital accounts).  
- **Endpoints**:  
  - `POST /carrier/v1/carrier`: Create an account holder.  
  - `DELETE /carrier/v1/carrier/:CPF`: Remove an account holder.  
  - `GET /carrier/v1/carrier/:CPF`: Retrieve an account holder.  

### 2. Account Command Service  

- **Description**: Handles account-related commands such as creation, deposit, withdrawal, and closure.  
- **Endpoints**:  
  - `POST /account/v1/command/account`: Create an account.  
  - `POST /account/v1/command/account/:CPF/deposit`: Deposit into an account.  
  - `POST /account/v1/command/account/:CPF/withdrawn`: Withdraw from an account.  
  - `POST /account/v1/command/account/:CPF/close`: Close an account.  

### 3. Account Query Service  

- **Description**: Provides query data about accounts and statements.  
- **Endpoints**:  
  - `GET /account/v1/query/account/:CPF/details`: Retrieve account details.  
  - `GET /account/v1/query/account/:CPF/statements`: Retrieve account statements.  

### 4. Projection Service  

- **Description**: Consumes events from Kafka and creates projections of accounts and statements in a relational database.  

### 5. API Gateway  

- **Description**: Routes client requests to the appropriate services, acting as a unified entry point.  
- **Endpoints**:  
  - `/account/v1/command`: Routes to the Account Command Service.  
  - `/account/v1/query`: Routes to the Account Query Service.  

## How to Run the Application  

1. **Clone the repository**:  

   ```bash
   git clone <REPOSITORY_URL>
   ```  

2. **Navigate to the project directory**:  

   ```bash
   cd <DIRECTORY_NAME>
   ```  

3. **Start the services using Docker Compose**:  
   ```bash
   docker-compose up --build
   ```  

### API Ports and URLs  

- **API Gateway**: [http://localhost:3000](http://localhost:3000)  
  - Routes to the account command and query services.  
- **Carrier Service**: [http://localhost:3001](http://localhost:3001)  
- **DynamoDB**: [http://localhost:8000](http://localhost:8000) (for testing purposes)  
- **PostgreSQL**: [http://localhost:5432](http://localhost:5432) (for testing purposes)  
- **Kafka**: [http://localhost:9092](http://localhost:9092) (for testing purposes)  

### API Documentation  

Detailed API contract information can be found in the README files of each subproject:  

- [Carrier Service](./carrier-service/README.md)  
- [Account Command Service](./account-command-service/README.md)  
- [Account Query Service](./account-query-service/README.md)  
- [Projection Service](./projection-service/README.md)  

## Conclusion  

The implementation of this digital account system using CQRS and Event Sourcing not only meets the requirements for managing accounts and account holders but also provides a solid foundation for future expansions and improvements. The modular approach and design principles ensure system maintainability and scalability.  

An improvement to consider would be adding a caching layer (Elasticache / Redis) to enhance query performance, as data volume will increase over time (e.g., statement queries). However, this would add more complexity to the project, as the projection service would also need to manage the cache.  
