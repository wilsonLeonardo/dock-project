import { EventType, IEvent } from '@domain/events/IEvent';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';

export default class AccountProjectionHandler {
  constructor(private accountRepository: IAccountRepository) {}

  async handleEvent(event: IEvent): Promise<void> {
    switch (event.type) {
      case EventType.Created:
        await this.accountRepository.createAccount({
          holderCpf: event.data.holderCpf,
          accountNumber: event.data.accountNumber,
          agency: event.data.agency,
          balance: 0,
          isBlocked: false,
        });
        break;
      case EventType.Withdrawn:
      case EventType.Deposited:
        const account = await this.accountRepository.getAccountByCPF(event.data.holderCpf);
        if (account) {
          const newBalance =
            event.type === EventType.Deposited
              ? account.balance + (event.data.amount || 0)
              : account.balance - (event.data.amount || 0);

          await this.accountRepository.updateAccount({
            ...account,
            balance: newBalance,
          });
        }
        break;
    }
  }
}
