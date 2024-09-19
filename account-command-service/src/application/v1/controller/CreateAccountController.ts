import { RequestHandler } from 'express';
import { CREATED } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateAccountService from '@service/create/ICreateAccountService';
import { ILogger } from '@infrastructure/logger/ILogger';

export default class CreateAccountController {
  constructor(private createAccountService: ICreateAccountService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.body;

      const account = await this.createAccountService.create(CPF);

      this.logger.info(`Account ${CPF} created successfully`);

      return response.status(CREATED).json(account);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to create account`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
