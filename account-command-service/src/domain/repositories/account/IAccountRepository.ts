import { IAccount } from '@domain/schemas/Account';

export default interface IAccountRepository {
  createAccount(account: IAccount): Promise<IAccount>;
  getAccountByCPF(CPF: string): Promise<IAccount>;
  updateAccount(CPF: string, data: Partial<IAccount>): Promise<void>;
}
