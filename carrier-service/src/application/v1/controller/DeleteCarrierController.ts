import { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import isValidCPF from '@utils/cpfValidator';
import IDeleteCarrierService from '@service/delete/IDeleteCarrierService';

export default class DeleteCarrierController {
  constructor(private deleteCarrierService: IDeleteCarrierService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;

      if (!isValidCPF(CPF as string)) {
        throw new UnprocessableEntityError('Invalid CPF format!');
      }

      await this.deleteCarrierService.deleteByCPF(CPF as string);

      this.logger.info(`Carrier ${CPF} deleted successfully`);

      return response.status(NO_CONTENT).json();
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to delete carrier`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
