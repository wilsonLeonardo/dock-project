import { model, Schema } from 'dynamoose';

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

const carrierSchema = new Schema({
  aggregateId: {
    type: String,
    hashKey: true,
  },
  timestamp: {
    type: String,
    rangeKey: true,
  },
  type: {
    type: String,
  },
  data: {
    type: Object,
  },
});

export const Event = model('Event', carrierSchema);
