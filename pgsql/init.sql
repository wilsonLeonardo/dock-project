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