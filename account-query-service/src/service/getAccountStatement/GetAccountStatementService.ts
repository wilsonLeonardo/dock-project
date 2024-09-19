import IGetAccountStatementService from './IGetAccountStatementService';
import IAccountStatementRepository from '@domain/repositories/accountStatement/IAccountStatementRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import { IAccountStatement } from '@domain/models/AccountStatements';

export default class GetAccountStatementService implements IGetAccountStatementService {
  constructor(private accountStatementRepository: IAccountStatementRepository) {}

  async get(CPF: string, startDate: Date, endDate: Date): Promise<Array<Partial<IAccountStatement>>> {
    const accountStatement = await this.accountStatementRepository.getAccountStatementByCPF(CPF, startDate, endDate);

    if (accountStatement.length === 0) {
      throw new NotFoundError(`Statements not found for this account`);
    }

    if (accountStatement[0].Account!.isBlocked) {
      throw new UnprocessableEntityError('Account is blocked');
    }

    return accountStatement.map((stmt) => ({
      transactionDate: stmt.transactionDate,
      transactionType: stmt.transactionType,
      amount: stmt.amount,
    }));
  }
}
