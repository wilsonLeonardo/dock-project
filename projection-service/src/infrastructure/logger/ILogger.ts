export enum LogLevel {
  'info' = 'info',
}

export interface ILogger {
  log(level: LogLevel, message: string, meta?: Partial<any>): void;

  info(message: string, meta?: Partial<any>): void;

  error(message: string, meta?: Partial<any>): void;

  critical(message: string, meta?: Partial<any>): void;
}
