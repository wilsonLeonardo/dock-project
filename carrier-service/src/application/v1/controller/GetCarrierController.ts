import { RequestHandler } from 'express';
import { CREATED } from 'http-status';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';
import isValidCPF from '@utils/cpfValidator';
import IGetCarrierService from '@service/retrieve/IGetCarrierService';

export default class GetCarrierControlle {
  constructor(private getCarrierService: IGetCarrierService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;

      if (!isValidCPF(CPF as string)) {
        throw new UnprocessableEntityError('Invalid CPF format!');
      }

      const carrier = await this.getCarrierService.getByCPF(CPF as string);

      this.logger.info(`Carrier ${CPF} retrieved successfully`);

      return response.status(CREATED).json(carrier);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to retrieve carrier`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
