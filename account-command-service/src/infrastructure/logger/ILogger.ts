import { ErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { Request } from 'express';

export enum LogLevel {
  'info' = 'info',
}

export interface ILogger {
  log(level: LogLevel, message: string, meta?: Partial<any>): void;

  info(message: string, meta?: Partial<any>): void;

  error(message: string, meta?: Partial<any>): void;

  critical(message: string, meta?: Partial<any>): void;

  controllerError(message: string, errorInfo: ErrorInfo, request: Request, responseData: object): void;
}
