import { RequestHandler } from 'express';
import { CREATED } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateCarrierService from '@service/create/ICreateCarrierService';
import { ILogger } from '@infrastructure/logger/ILogger';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import isValidCPF from '@utils/cpfValidator';

export default class CreateCarrierController {
  constructor(private createCarrierService: ICreateCarrierService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF, Nome } = request.body;

      if (!isValidCPF(CPF)) {
        throw new UnprocessableEntityError('Invalid CPF format!');
      }

      const account = await this.createCarrierService.create({ CPF, Nome });

      this.logger.info(`Carrier ${CPF} created successfully`);

      return response.status(CREATED).json(account);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to create carrier`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
