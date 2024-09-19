// /* eslint-disable max-len */
import { Router } from 'express';
import PingController from './controller/PingController';
import Logger from '@infrastructure/logger/Logger';
import AccountRepository from '@domain/repositories/account/AccountRepository';
import AccountStatementRepository from '@domain/repositories/accountStatement/AccountStatementRepository';
import GetAccountService from '@service/getAccount/GetAccountService';
import GetAccountStatementService from '@service/getAccountStatement/GetAccountStatementService';
import { validateSchema } from './middlewares/ValidateSchema';
import { validateCPF } from './middlewares/ValidateCPF';
import GetAccountController from './controller/GetAccountController';
import GetAccountStatementController from './controller/GetAccountStatementController';

const routerV1 = Router();

const logger = new Logger();

// Repositories
const accountRepository = new AccountRepository();
const accountStatementRepository = new AccountStatementRepository();

// Services
const getAccountService = new GetAccountService(accountRepository);
const accountStatementService = new GetAccountStatementService(accountStatementRepository);

(async () => {
  routerV1.get('/ping', new PingController().execute);
  routerV1.get(
    '/account/:CPF/details',
    validateSchema('cpf', 'params'),
    validateCPF(),
    new GetAccountController(getAccountService, logger).execute,
  );
  routerV1.get(
    '/account/:CPF/statements',
    validateSchema('cpf', 'params'),
    validateCPF(),
    validateSchema('accountStatement', 'query'),
    new GetAccountStatementController(accountStatementService, logger).execute,
  );
})();

export default routerV1;
