import Database from '@infrastructure/database/Database';
import routes from './application/routes';
import { ILogger } from '@infrastructure/logger/ILogger';
import Logger from '@infrastructure/logger/Logger';
import Account from '@domain/models/AccountView';
import AccountStatement from '@domain/models/AccountStatements';
import { AppConfig } from '@config/AppConfig';
import { RequestHandler, json } from 'express';
import App from './application/App';

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
  const middlewares: RequestHandler[] = [];

  middlewares.push(json());

  const app = new App({
    port: AppConfig.PORT,
    routes,
    logger,
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });
  await app.listen();
})();
