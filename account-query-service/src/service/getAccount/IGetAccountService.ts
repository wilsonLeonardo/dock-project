import { IAccount } from '@domain/models/AccountView';

export default interface IGetAccountService {
  get(CPF: string): Promise<IAccount>;
}
