import { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import IWithdrawnAccountService from '@service/withdrawn/IWithdrawnAccountService';

export default class WithdrawnAccountController {
  constructor(private withdrawnAccountService: IWithdrawnAccountService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;
      const { amount } = request.body;

      await this.withdrawnAccountService.withdrawn(CPF as string, amount);

      this.logger.info(`Withdrawn successfully`);

      return response.status(NO_CONTENT).json();
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to withdrawn`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
