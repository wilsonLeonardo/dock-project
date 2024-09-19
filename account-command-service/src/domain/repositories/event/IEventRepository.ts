import { IEvent } from '@domain/schemas/Event';

export default interface IEventRepository {
  saveEvent(saveEvent: IEvent): Promise<void>;
  getEventsToday(aggregateId: string): Promise<Array<IEvent>>;
}
