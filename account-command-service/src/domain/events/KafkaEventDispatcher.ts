import { Kafka } from 'kafkajs';
import { IEvent } from '@domain/schemas/Event';
import IEventDispatcher from './IEventDispatcher';
import { ILogger } from '@infrastructure/logger/ILogger';

export default class KafkaEventDispatcher implements IEventDispatcher {
  private kafka: Kafka;
  private producer;
  private isConnected: boolean = false;

  constructor(broker: string, private topic: string, private logger: ILogger) {
    this.kafka = new Kafka({
      clientId: 'account-command-event-dispatcher',
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
    }
  }

  async dispatchEvent(event: IEvent): Promise<void> {
    await this.connect();
    try {
      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            key: event.aggregateId,
            value: JSON.stringify(event),
          },
        ],
      });

      this.logger.info(`Event dispatched: ${JSON.stringify(event)}`);
    } catch (err: any) {
      this.logger.error('Error dispatching event', err);
      throw new Error('Failed to dispatch event');
    }
  }
}
