import { RequestHandler } from 'express';
import { OK } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import IGetAccountService from '@service/getAccount/IGetAccountService';

export default class GetAccountController {
  constructor(private getAccountService: IGetAccountService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;

      const account = await this.getAccountService.get(CPF as string);

      return response.status(OK).json(account);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to get`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
