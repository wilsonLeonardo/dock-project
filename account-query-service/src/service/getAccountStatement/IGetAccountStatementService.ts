import { IAccountStatement } from '@domain/models/AccountStatements';

export default interface IGetAccountStatementService {
  get(CPF: string, startDate: Date, endDate: Date): Promise<Array<Partial<IAccountStatement>>>;
}
