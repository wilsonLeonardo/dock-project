import { IEvent } from '@domain/schemas/Event';

export default interface IEventDispatcher {
  connect(): Promise<void>;
  dispatchEvent(event: IEvent): Promise<void>;
}
