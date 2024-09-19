import { IAccount, Account } from '@domain/schemas/Account';
import IAccountRepository from './IAccountRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import ConflictError from '@domain/exceptions/ConflictError';

export default class AccountRepository implements IAccountRepository {
  async createAccount(account: IAccount): Promise<IAccount> {
    const accountAlreadyExists = await Account.get(account.holderCpf);

    if (accountAlreadyExists) {
      throw new ConflictError('Account already exists!');
    }

    const accountCreated = new Account(account);
    const item = await accountCreated.save();

    const itemJSON = item.toJSON() as IAccount;

    itemJSON.createdAt = new Date(itemJSON.createdAt as unknown as number);
    itemJSON.updatedAt = new Date(itemJSON.updatedAt as unknown as number);

    return itemJSON;
  }

  async getAccountByCPF(CPF: string): Promise<IAccount> {
    const account = await Account.get(CPF);

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    return account.toJSON() as IAccount;
  }

  async updateAccount(CPF: string, data: Partial<IAccount>): Promise<void> {
    const account = await Account.get(CPF);

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    account.balance = data.balance || account.balance;
    account.isBlocked = data.isBlocked || account.isBlocked;

    await account.save();
  }
}
