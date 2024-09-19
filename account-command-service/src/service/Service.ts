import IEventRepository from '@domain/repositories/event/IEventRepository';
import { EventType, IEvent } from '@domain/schemas/Event';
import IEventDispatcher from '@domain/events/IEventDispatcher';
import { IAccount } from '@domain/schemas/Account';

export default class Service {
  constructor(protected eventRepository: IEventRepository, private eventDispatcher: IEventDispatcher) {}

  protected async handleEvent(eventType: EventType, CPF: string, account: IAccount, amount: number = 0): Promise<void> {
    const event: IEvent = {
      type: eventType,
      aggregateId: CPF,
      data: {
        accountNumber: account.accountNumber,
        agency: account.agency,
        holderCpf: account.holderCpf,
        amount,
      },
      timestamp: new Date().toISOString(),
    };

    await this.eventRepository.saveEvent(event);
    await this.eventDispatcher.dispatchEvent(event);
  }
}
