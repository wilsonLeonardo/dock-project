/* eslint-disable max-len */
import { Router } from 'express';
import PingController from './controller/PingController';
import CarrierRepository from '@domain/repositories/CarrierRepository';
import CreateCarrierService from '@service/create/CreateCarrierService';
import CreateCarrierController from './controller/CreateCarrierController';
import Logger from '@infrastructure/logger/Logger';
import { validateSchema } from './middlewares/ValidateSchema';
import GetCarrierService from '@service/retrieve/GetCarrierService';
import GetCarrierController from './controller/GetCarrierController';
import DeleteCarrierService from '@service/delete/DeleteCarrierService';
import DeleteCarrierController from './controller/DeleteCarrierController';

const routerV1 = Router();

const logger = new Logger();

const carrierRepository = new CarrierRepository();
const createCarrierService = new CreateCarrierService(carrierRepository);
const retrieveCarrierService = new GetCarrierService(carrierRepository);
const deleteCarrierService = new DeleteCarrierService(carrierRepository);

(async () => {
  routerV1.get('/ping', new PingController().execute);
  routerV1.post(
    '/carrier',
    validateSchema('createCarrier', 'body'),
    new CreateCarrierController(createCarrierService, logger).execute,
  );
  routerV1.get(
    '/carrier/:CPF',
    validateSchema('getCarrier', 'params'),
    new GetCarrierController(retrieveCarrierService, logger).execute,
  );
  routerV1.delete(
    '/carrier/:CPF',
    validateSchema('getCarrier', 'params'),
    new DeleteCarrierController(deleteCarrierService, logger).execute,
  );
})();

export default routerV1;
