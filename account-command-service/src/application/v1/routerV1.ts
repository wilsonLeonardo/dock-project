/* eslint-disable max-len */
import { Router } from 'express';
import PingController from './controller/PingController';
import Logger from '@infrastructure/logger/Logger';
import { validateSchema } from './middlewares/ValidateSchema';
import AccountRepository from '@domain/repositories/account/AccountRepository';
import EventRepository from '@domain/repositories/event/EventRepository';
import KafkaEventDispatcher from '@domain/events/KafkaEventDispatcher';
import { AppConfig } from '@config/AppConfig';
import CarrierRepository from '@domain/repositories/carrier/CarrierRepository';
import CarrierRequester from '@infrastructure/http/CarrierRequester';
import CreateAccountController from './controller/CreateAccountController';
import CreateAccountService from '@service/create/CreateAccountService';
import DepositAccountController from './controller/DepositAccountController';
import DepositAccountService from '@service/deposit/DepositAccountService';
import WithdrawnAccountService from '@service/withdrawn/WithdrawnAccountService';
import WithdrawnAccountController from './controller/WithdrawnAccountController';
import CloseAccountService from '@service/close/CloseAccountService';
import CloseAccountController from './controller/CloseAccountController';
import { validateCPF } from './middlewares/ValidateCPF';

const routerV1 = Router();

const logger = new Logger();

const accountRepository = new AccountRepository();
const eventRepository = new EventRepository();
const kafkaEventDispatcher = new KafkaEventDispatcher(AppConfig.KAFKA_BROKER, AppConfig.KAFKA_TOPIC, logger);
const carrierRequester = new CarrierRequester(AppConfig.CARRIER_API);
const carrierRepository = new CarrierRepository(carrierRequester, logger);

// Services
const createAccountService = new CreateAccountService(
  accountRepository,
  carrierRepository,
  eventRepository,
  kafkaEventDispatcher,
);

const depositAccountService = new DepositAccountService(accountRepository, eventRepository, kafkaEventDispatcher);

const withdrawnAccountService = new WithdrawnAccountService(
  accountRepository,
  eventRepository,
  kafkaEventDispatcher,
  AppConfig.WITHDRAWN_LIMIT,
);

const closeAccountService = new CloseAccountService(accountRepository, eventRepository, kafkaEventDispatcher);

(async () => {
  routerV1.get('/ping', new PingController().execute);
  routerV1.post(
    '/account',
    validateSchema('createAccount', 'body'),
    validateCPF('body'),
    new CreateAccountController(createAccountService, logger).execute,
  );
  routerV1.post(
    '/account/:CPF/deposit',
    validateSchema('cpf', 'params'),
    validateCPF('params'),
    validateSchema('amount', 'body'),
    new DepositAccountController(depositAccountService, logger).execute,
  );
  routerV1.post(
    '/account/:CPF/withdrawn',
    validateSchema('cpf', 'params'),
    validateCPF('params'),
    validateSchema('amount', 'body'),
    new WithdrawnAccountController(withdrawnAccountService, logger).execute,
  );
  routerV1.post(
    '/account/:CPF/close',
    validateSchema('cpf', 'params'),
    validateCPF('params'),
    new CloseAccountController(closeAccountService, logger).execute,
  );
})();

export default routerV1;
