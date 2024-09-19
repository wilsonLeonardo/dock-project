import { IAccount } from '@domain/models/AccountView';

export default interface IAccountRepository {
  createAccount(account: IAccount): Promise<void>;
  updateAccount(account: IAccount): Promise<void>;
  getAccountByCPF(CPF: string): Promise<IAccount | null>;
}
