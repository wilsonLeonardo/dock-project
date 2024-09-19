export enum EventType {
  Created = 'AccountCreated',
  Closed = 'AccountClosed',
  Withdrawn = 'AccountWithdrawn',
  Deposited = 'AccountDeposited',
}

export interface IEventData {
  holderCpf: string;
  accountNumber: string;
  agency: string;
  amount?: number;
}

export interface IEvent {
  aggregateId: string;
  timestamp: string;
  type: EventType;
  data: IEventData;
}
