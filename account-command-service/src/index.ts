import { AppConfig } from '@config/AppConfig';
import routes from './application/routes';
import dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ILogger } from '@infrastructure/logger/ILogger';
import Logger from '@infrastructure/logger/Logger';
import { json, RequestHandler } from 'express';
import App from './application/App';

const setDatabase = () => {
  dynamoose.aws.ddb.local(AppConfig.DYNAMO_URI);

  const client = new DynamoDB({
    endpoint: AppConfig.DYNAMO_URI,
    region: AppConfig.AWS_REGION,
    credentials: {
      accessKeyId: AppConfig.AWS_ACCESS_KEY_ID,
      secretAccessKey: AppConfig.AWS_SECRET_ACCESS_KEY,
    },
  });
  dynamoose.aws.ddb.set(client);
};

(async () => {
  setDatabase();

  const logger: ILogger = new Logger();
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
