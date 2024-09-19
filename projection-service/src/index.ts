import Database from '@infrastructure/database/Database';
import { ILogger } from '@infrastructure/logger/ILogger';
import Logger from '@infrastructure/logger/Logger';
import Account from '@domain/models/AccountView';
import AccountStatement from '@domain/models/AccountStatements';
import AccountRepository from '@domain/repositories/account/AccountRepository';
import AccountStatementRepository from '@domain/repositories/accountStatement/AccountStatementRepository';
import AccountProjectionHandler from './application/AccountProjectionHandler';
import AccountStatementProjectionHandler from './application/AccountStatementProjectionHandler';
import KafkaConsumer from '@infrastructure/events/EventConsumer';
import { AppConfig } from '@config/AppConfig';

const setDatabase = async (logger: ILogger) => {
  const db = new Database(
    AppConfig.DB_NAME,
    AppConfig.DB_USER,
    AppConfig.DB_PASSWORD,
    AppConfig.DB_HOST,
    AppConfig.DB_TYPE as 'postgres' | 'mysql' | 'sqlite' | 'mssql',
    logger,
  );

  await db.connect();
  await db.syncModels([Account, AccountStatement]);
};

(async () => {
  const logger: ILogger = new Logger();
  setDatabase(logger);

  const accountRepository = new AccountRepository();
  const accountStatementRepository = new AccountStatementRepository();
  const accountProjectionHandler = new AccountProjectionHandler(accountRepository);
  const accountStatementProjectionHandler = new AccountStatementProjectionHandler(accountStatementRepository);

  const kafka = new KafkaConsumer(
    accountProjectionHandler,
    accountStatementProjectionHandler,
    AppConfig.KAFKA_BROKER,
    AppConfig.KAFKA_TOPIC,
    logger,
  );

  await kafka.run();
})();
