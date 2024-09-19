import IAccountRepository from './AccountRepository';
import Account, { IAccount } from '@domain/models/AccountView';

export default class AccountRepository implements IAccountRepository {
  async createAccount(account: IAccount): Promise<void> {
    await Account.create(account);
  }

  async updateAccount(account: IAccount): Promise<void> {
    await Account.update(account, {
      where: { holderCpf: account.holderCpf },
    });
  }

  async getAccountByCPF(CPF: string): Promise<IAccount | null> {
    const account = await Account.findOne({ where: { holderCpf: CPF } });
    return account ? (account.get() as IAccount) : null;
  }
}
