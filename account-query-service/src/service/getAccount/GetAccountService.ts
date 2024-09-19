import IGetAccountService from './IGetAccountService';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import { IAccount } from '@domain/models/AccountView';

export default class GetAccountService implements IGetAccountService {
  constructor(private accountRepository: IAccountRepository) {}

  async get(CPF: string): Promise<IAccount> {
    const account = await this.accountRepository.getAccountByCPF(CPF);

    if (!account) {
      throw new NotFoundError(`Account not found`);
    }

    if (account.isBlocked) {
      throw new UnprocessableEntityError('Account is already blocked');
    }

    return account;
  }
}
