import ICloseAccountService from './ICloseAccountService';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import IEventRepository from '@domain/repositories/event/IEventRepository';
import { EventType } from '@domain/schemas/Event';
import IEventDispatcher from '@domain/events/IEventDispatcher';
import Service from '@service/Service';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';

export default class CloseAccountService extends Service implements ICloseAccountService {
  constructor(
    private accountRepository: IAccountRepository,
    eventRepository: IEventRepository,
    eventDispatcher: IEventDispatcher,
  ) {
    super(eventRepository, eventDispatcher);
  }

  async close(CPF: string): Promise<void> {
    const accountExists = await this.accountRepository.getAccountByCPF(CPF);

    if (!accountExists) {
      throw new NotFoundError(`Account not found`);
    }

    if (accountExists.isBlocked) {
      throw new UnprocessableEntityError('Account is already blocked');
    }

    await this.accountRepository.updateAccount(CPF, { isBlocked: true });
    await super.handleEvent(EventType.Closed, CPF, accountExists);
  }
}
