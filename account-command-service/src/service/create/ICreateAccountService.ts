import { IAccount } from '@domain/schemas/Account';

export default interface ICreateAccountService {
  create(CPF: string): Promise<IAccount>;
}
