import { Kafka } from 'kafkajs';
import { IEvent } from '@domain/events/IEvent';
import AccountProjectionHandler from '../../application/AccountProjectionHandler';
import AccountStatementProjectionHandler from '../../application/AccountStatementProjectionHandler';
import { ILogger } from '@infrastructure/logger/ILogger';

export default class KafkaConsumer {
  private kafka: Kafka;
  private consumer: any;

  constructor(
    private accountProjectionHandler: AccountProjectionHandler,
    private accountStatementProjectionHandler: AccountStatementProjectionHandler,
    broker: string,
    private topic: string,
    private logger: ILogger,
  ) {
    this.kafka = new Kafka({
      clientId: 'account-service',
      brokers: [broker],
    });
    this.consumer = this.kafka.consumer({ groupId: 'account-group' });
  }

  async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });

    await this.consumer.run({
      //@ts-ignore
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.info(`Processing message: ${message}`);
        const event: IEvent = JSON.parse(message.value!.toString());
        await this.accountProjectionHandler.handleEvent(event);
        await this.accountStatementProjectionHandler.handleEvent(event);
      },
    });
  }
}
