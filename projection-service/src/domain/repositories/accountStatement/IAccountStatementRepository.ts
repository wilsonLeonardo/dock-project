import { IAccountStatement } from '@domain/models/AccountStatements';

export default interface IAccountStatementRepository {
  createAccountStatement(statement: IAccountStatement): Promise<void>;
}
