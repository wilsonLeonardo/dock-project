import { Request, Response, NextFunction } from 'express';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import InternalServerError from '@domain/exceptions/InternalServerError';
import Logger from '@infrastructure/logger/Logger';
import isValidCPF from '@utils/cpfValidator';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';

export const validateCPF = (where: 'body' | 'params') => {
  const logger = new Logger();

  return function (request: Request, response: Response, next: NextFunction) {
    try {
      const { CPF } = request[where];

      if (!isValidCPF(CPF as string)) {
        throw new UnprocessableEntityError('Invalid CPF format!');
      }
      return next();
    } catch (error) {
      let errorDetails = new InternalServerError('Fail to validate request');
      if (error instanceof UnprocessableEntityError) {
        errorDetails = error;
      }
      const errorInfo = buildErrorInfo(errorDetails);

      logger.error(`validation failed`, {
        error: JSON.stringify(errorInfo),
      });

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
};
