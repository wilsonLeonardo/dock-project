import { IAccountStatement } from '@domain/models/AccountStatements';
import IAccountStatementRepository from './IAccountStatementRepository';
import AccountStatement from '@domain/models/AccountStatements';
import { Op } from 'sequelize';
import Account from '@domain/models/AccountView';

export default class AccountStatementRepository implements IAccountStatementRepository {
  async getAccountStatementByCPF(CPF: string, startDate: Date, endDate: Date): Promise<Array<IAccountStatement>> {
    const statements = await AccountStatement.findAll({
      where: { holderCpf: CPF, transactionDate: { [Op.between]: [startDate, endDate] } },
      include: [
        {
          model: Account,
          required: true,
        },
      ],
    });

    return statements;
  }
}
