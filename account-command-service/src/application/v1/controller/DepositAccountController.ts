import { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import IDepositAccountService from '@service/deposit/IDepositAccountService';

export default class DepositAccountController {
  constructor(private depositAccountService: IDepositAccountService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;
      const { amount } = request.body;

      await this.depositAccountService.deposit(CPF as string, amount);

      this.logger.info(`Deposited successfully`);

      return response.status(NO_CONTENT).json();
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to deposit`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
