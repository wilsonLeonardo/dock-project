import { RequestHandler } from 'express';
import { OK } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import IGetAccountStatementService from '@service/getAccountStatement/IGetAccountStatementService';

export default class GetAccountStatementController {
  constructor(private getAccountStatementService: IGetAccountStatementService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;
      const { startDate, endDate } = request.query;

      const statements = await this.getAccountStatementService.get(
        CPF as string,
        startDate as unknown as Date,
        endDate as unknown as Date,
      );

      return response.status(OK).json({ statements });
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to get`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
