import { IAccountStatement } from '@domain/models/AccountStatements';

export default interface IAccountStatementRepository {
  getAccountStatementByCPF(CPF: string, startDate: Date, endDate: Date): Promise<Array<IAccountStatement>>;
}
