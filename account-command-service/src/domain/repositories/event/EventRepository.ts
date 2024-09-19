import { IEvent, Event } from '@domain/schemas/Event';
import IEventRepository from './IEventRepository';

export default class EventRepository implements IEventRepository {
  async saveEvent(event: IEvent): Promise<void> {
    const eventCreated = new Event(event);
    await eventCreated.save();
  }

  async getEventsToday(aggregateId: string): Promise<Array<IEvent>> {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const events = await Event.query('aggregateId')
      .eq(aggregateId)
      .filter('timestamp')
      .between(todayStart.toISOString(), todayEnd.toISOString())
      .exec();

    const eventsToBeReturned = events.map((event) => event.toJSON() as IEvent);

    return eventsToBeReturned;
  }
}
