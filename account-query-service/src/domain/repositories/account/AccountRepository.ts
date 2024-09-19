import IAccountRepository from './AccountRepository';
import Account, { IAccount } from '@domain/models/AccountView';

export default class AccountRepository implements IAccountRepository {
  async getAccountByCPF(CPF: string): Promise<IAccount | null> {
    const account = await Account.findOne({ where: { holderCpf: CPF } });
    return account ? (account.get() as IAccount) : null;
  }
}
