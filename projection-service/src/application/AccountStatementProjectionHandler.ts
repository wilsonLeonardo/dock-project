import { IEvent, EventType } from '@domain/events/IEvent';
import IAccountStatementRepository from '@domain/repositories/accountStatement/IAccountStatementRepository';

export default class AccountStatementProjectionHandler {
  constructor(private accountStatementRepository: IAccountStatementRepository) {}

  async handleEvent(event: IEvent): Promise<void> {
    switch (event.type) {
      case EventType.Deposited:
        await this.recordTransaction(event, 'DEPOSIT');
        break;
      case EventType.Withdrawn:
        await this.recordTransaction(event, 'WITHDRAWAL');
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  }

  private async recordTransaction(
    event: IEvent,
    transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER',
  ): Promise<void> {
    const statementData = {
      holderCpf: event.data.holderCpf,
      transactionDate: new Date(event.timestamp),
      transactionType,
      amount: event.data.amount!,
    };

    await this.accountStatementRepository.createAccountStatement(statementData);
  }
}
