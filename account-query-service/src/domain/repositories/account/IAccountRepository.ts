import { IAccount } from '@domain/models/AccountView';

export default interface IAccountRepository {
  getAccountByCPF(CPF: string): Promise<IAccount | null>;
}
