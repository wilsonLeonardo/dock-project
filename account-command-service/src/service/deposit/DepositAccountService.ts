import IDepositAccountService from './IDepositAccountService';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';
import IEventRepository from '@domain/repositories/event/IEventRepository';
import { EventType } from '@domain/schemas/Event';
import IEventDispatcher from '@domain/events/IEventDispatcher';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import Service from '@service/Service';

export default class DepositAccountService extends Service implements IDepositAccountService {
  constructor(
    private accountRepository: IAccountRepository,
    eventRepository: IEventRepository,
    eventDispatcher: IEventDispatcher,
  ) {
    super(eventRepository, eventDispatcher);
  }

  async deposit(CPF: string, amount: number): Promise<void> {
    const account = await this.accountRepository.getAccountByCPF(CPF);

    if (account.isBlocked) {
      throw new UnprocessableEntityError('Account is blocked');
    }

    const newBalance = amount + account.balance;

    await this.accountRepository.updateAccount(CPF, { balance: newBalance });

    await super.handleEvent(EventType.Deposited, CPF, account, amount);
  }
}
