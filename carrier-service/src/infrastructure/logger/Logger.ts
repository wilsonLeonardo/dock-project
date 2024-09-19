import { Logger as WinstonLogger, createLogger, format, transports } from 'winston';
import { ILogger, LogLevel } from './ILogger';
import { ErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { Request } from 'express';

export default class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json(), format.errors({ stack: true })),
      transports: [new transports.Console()],
    });
  }

  formatedData(meta: Partial<any>): any {
    return {
      ...meta,
      transaction_id: meta.transaction_id ? meta.transaction_id : '',
      x_origin: meta.x_origin ? meta.x_origin : 'unknown',
      x_load_test: meta.x_load_test ? meta.x_load_test : false,
      duration: meta.duration ? meta.duration : 0,
      retry: meta.retry ? meta.retry : 0,
    };
  }

  log(level: LogLevel, message: string, meta?: Partial<any>): void {
    this.logger.log(level, message, this.formatedData(meta || {}));
  }

  info(message: string, meta?: Partial<any>): void {
    this.logger.info(message, this.formatedData(meta || {}));
  }

  error(message: string, meta?: Partial<any>): void {
    this.logger.error(message, this.formatedData(meta || {}));
  }

  critical(message: string, meta?: Partial<any>): void {
    this.logger.error(`CRITICAL: ${message}`, this.formatedData(meta || {}));
  }

  controllerError(message: string, errorInfo: ErrorInfo, request: Request, responseData: object): void {
    this.logger.error(message, {
      error: errorInfo.errorMessage,
      stacktrace: errorInfo.stackTrace,
      http: {
        request: {
          host: request.hostname,
          version: request.httpVersion,
          method: request.method,
          path: request.path,
          user_agent: request.header('user-agent') || '',
          length: 0,
          x_forwarded_for: request.header('x-forwarded-for') || '',
          body: request.body,
        },
        response: {
          status_code: errorInfo.code,
          length: 0,
          body: JSON.stringify(responseData),
        },
      },
    });
  }
}
