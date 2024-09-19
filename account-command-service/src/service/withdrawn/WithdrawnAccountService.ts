import IWithdrawnAccountService from './IWithdrawnAccountService';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';
import IEventRepository from '@domain/repositories/event/IEventRepository';
import { EventType } from '@domain/schemas/Event';
import IEventDispatcher from '@domain/events/IEventDispatcher';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import Service from '@service/Service';
import ForbiddenError from '@domain/exceptions/ForbiddenError';

export default class WithdrawnAccountService extends Service implements IWithdrawnAccountService {
  constructor(
    private accountRepository: IAccountRepository,
    eventRepository: IEventRepository,
    eventDispatcher: IEventDispatcher,
    private withdrawnDayLimit: number,
  ) {
    super(eventRepository, eventDispatcher);
  }

  async withdrawn(CPF: string, amount: number): Promise<void> {
    const account = await this.accountRepository.getAccountByCPF(CPF);

    if (account.isBlocked) {
      throw new UnprocessableEntityError('Account is blocked');
    }

    if (amount > account.balance) {
      throw new ForbiddenError('Insufficient balance');
    }

    const eventsToday = await this.eventRepository.getEventsToday(CPF);

    if (eventsToday.length > 0) {
      const withdrawnToday = eventsToday
        .filter((event) => event.type === EventType.Withdrawn)
        .reduce((withdrawnToday, currentEvent) => {
          return withdrawnToday + currentEvent.data.amount!;
        }, 0);

      if (withdrawnToday > this.withdrawnDayLimit) {
        throw new ForbiddenError('Daily withdrawal limit exceeded.');
      }
    }

    const newBalance = account.balance - amount;

    await this.accountRepository.updateAccount(CPF, { balance: newBalance });

    await super.handleEvent(EventType.Withdrawn, CPF, account, amount);
  }
}
