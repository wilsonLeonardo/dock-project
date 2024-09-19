import { IAccountStatement } from '@domain/models/AccountStatements';
import IAccountStatementRepository from './IAccountStatementRepository';
import AccountStatement from '@domain/models/AccountStatements';

export default class AccountStatementRepository implements IAccountStatementRepository {
  async createAccountStatement(statement: IAccountStatement): Promise<void> {
    await AccountStatement.create(statement);
  }
}
